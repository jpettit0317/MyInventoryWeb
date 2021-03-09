import ApiURL from "./enums/ApiURL_enum";
import express from "express";
require('dotenv').config();
import { createUserConnection, closeUserConnection } from './models/dbModels/DBUser';
import UserSignUpInfo from './interfaces/modelinterfaces/UserSignUpInfo';
import {
    portNumber,
    createSignUpController,
    createLoginController,
    createAddItemController,
    createGetItemController,
    createEditItemController,
    createDeleteItemController
} from "./utils/serverHelper";
import SignUpController from "./controllers/SignUpController";
import { Connection } from "mongoose";
import { createPasswordConnection } from "./utils/PasswordServiceUtils";
import UserPasswordInfo from "./interfaces/modelinterfaces/UserPasswordInfo";
import { MyInventoryItemProps } from "./props/MyInventoryItemProps";
import MyInventoryItem, { logItem } from "./models/usermodels/MyInventoryItem";
import AddItemController from "./controllers/AddItemController";
import { createItemConnection } from "./utils/AddItemUtils";
import { createSessionConnection } from "./utils/SessionServiceUtils";

const app = express();

let userConnection: Connection;
let passwordConnection: Connection;
let itemConnection: Connection;
let sessionConnection: Connection;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(portNumber, () => {
    console.log("Listening on port " + portNumber);
    userConnection = createUserConnection();
    passwordConnection = createPasswordConnection();
    itemConnection = createItemConnection();
    sessionConnection = createSessionConnection();
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

    const signUpController = createSignUpController(userSignUpInfo, userConnection, passwordConnection, sessionConnection);

    signUpController.createUser(userSignUpInfo).then( (result) => {
        console.log(`In then block sending ${result.message}`);
        res.send(result);
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

    const loginController = createLoginController(providedLogin, passwordConnection, sessionConnection);

    loginController.verifyUserLogin().then((result) => {
        if (result.result) {
            console.log("Password is correct");
            console.log(`Sending Result: ${result.result}, Message: ${result.reason}`);
            res.send(result);
        } else {
            console.log("Invalid username or password");
            res.send(result);
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

app.get(ApiURL.getItems, async (req, res) => {
    const owner = req.params.owner;

    const getItemsController = createGetItemController(itemConnection);

    await getItemsController.getItems(owner).then((itemsAsString) => {
        res.send(itemsAsString);
    });
});

app.put(ApiURL.editItem, async (req, res) => {
    const itemProps: MyInventoryItemProps = {
        title: req.body.title,
        itemId: req.body.itemId,
        owner: req.body.owner,
        type: req.body.type,
        count: req.body.count,
        description: req.body.description
    };

    const updatedItem = MyInventoryItem.createItem(itemProps);

    console.log("Updated item on backend is ");
    logItem(updatedItem);

    const editItemController = createEditItemController(itemConnection);

    editItemController.editItem(updatedItem).then((value) => {
        if (value === "") {
            console.log("Nothing went wrong");
            res.send("");
        } else {
            console.log("Error is " + value);
            res.send("Error: " + value);
        }
    }).catch((rejectReason: string) => {
        console.log("Rejecting " + rejectReason);
        res.send(rejectReason);
    });
});

app.post(ApiURL.deleteItem, async (req, res) => {
    const itemProps: MyInventoryItemProps = {
        title: req.body.title,
        itemId: req.body.itemId,
        owner: req.body.owner,
        type: req.body.type,
        count: req.body.count,
        description: req.body.description
    };

    const itemToDelete = MyInventoryItem.createItem(itemProps);
    console.log("In delete item");
    logItem(itemToDelete);

    const deleteItemController = createDeleteItemController(itemConnection);

    deleteItemController.deleteItem(itemToDelete).then((value) => {
        res.send("");
    }).catch((reason: string) => {
        res.send(reason);
    });
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
