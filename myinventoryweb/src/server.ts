import ApiURL from "./enums/ApiURL_enum";
import express from "express";
require('dotenv').config();
import { createUserConnection, closeUserConnection } from './models/dbModels/DBUser';
import UserSignUpInfo from './interfaces/modelinterfaces/UserSignUpInfo';
import {
    portNumber,
    createSignUpController,
    createLoginController,
    createAddItemController
} from "./utils/serverHelper";
import SignUpController from "./controllers/SignUpController";
import { Connection } from "mongoose";
import { createPasswordConnection } from "./utils/PasswordServiceUtils";
import UserPasswordInfo from "./interfaces/modelinterfaces/UserPasswordInfo";
import { MyInventoryItemProps } from "./props/MyInventoryItemProps";
import MyInventoryItem from "./models/usermodels/MyInventoryItem";
import AddItemController from "./controllers/AddItemController";
import { createItemConnection } from "./utils/AddItemUtils";

const app = express();

let userConnection: Connection;
let passwordConnection: Connection;
let itemConnection: Connection;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(portNumber, () => {
    console.log("Listening on port " + portNumber);
    userConnection = createUserConnection();
    passwordConnection = createPasswordConnection();
    itemConnection = createItemConnection();
});

app.post(ApiURL.createUser, async (req, res) => {
    console.log(`Hello from ${ApiURL.createUser}`);
    const userSignUpInfo: UserSignUpInfo = {
        username: String(req.body.username),
        password: String(req.body.password),
        email: String(req.body.email),
        firstName: String(req.body.firstName),
        lastName: String(req.body.lastName),
        userId: ""
    };

    const signUpController = createSignUpController(userSignUpInfo, userConnection, passwordConnection);

    signUpController.createUser(userSignUpInfo).then( (result) => {
        console.log(`In then block sending ${result.message}`);
        res.send(result.message);
    }).catch( (reason: {result: boolean, message: string}) => {
        console.log(`In catch block sending ${reason.message}`);
        res.send(reason.message);
    });
});

app.post(ApiURL.verifyLogin, (req, res) => {
    const providedLogin: UserPasswordInfo = {
        username: String(req.body.username),
        password: String(req.body.password)
    };

    const loginController = createLoginController(providedLogin, passwordConnection);

    loginController.verifyUserLogin().then((verifyResult: string) => {
        if (verifyResult === "") {
            console.log("Password is correct");
            res.send("");
        } else {
            console.log("Invalid username or password");
            res.send("Username or password is invalid.");
        }
    }).catch(() => {
        console.log("An error as occured");
        res.send("Error");
    });
});

app.post(ApiURL.addItem, async (req, res) => {
    const itemProps: MyInventoryItemProps = {
        title: req.body.title,
        itemId: req.body.itemId,
        owner: req.body.owner,
        type: req.body.type,
        count: req.body.count,
        description: req.body.description
    };

    const addItemController = createAddItemController(itemProps, itemConnection);

    await addItemController.addItem().then((addResult: string) => {
        console.log("Resolving " + addResult);
        res.send(addResult);
    }).catch((rejectReason: string) => {
        console.log("Rejecting " + rejectReason);
        res.send(rejectReason);
    });
});

app.get(ApiURL.getItems, (req, res) => {
    const owner = req.params.owner;

    res.send(`The owner is ${owner}`);
});

function logUserInfo(userInfo: UserSignUpInfo) {
    console.log(`Uname: ${userInfo.username}`);
    console.log(`Pswd: ${userInfo.password}`);
    console.log(`Email: ${userInfo.email}`);
    console.log(`Firstname: ${userInfo.firstName}`);
    console.log(`Lastname: ${userInfo.lastName}`);
}

function logAddItem(item: MyInventoryItem) {
    console.log(`Item is ${item.asString()}`);
}

function logUserLoginInfo(userInfo: UserPasswordInfo) {
    console.log(`Username: ${userInfo.username} Password: ${userInfo.password}`);
}

export {};
