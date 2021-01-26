import ApiURL from "./enums/ApiURL_enum";
import express from "express";
require('dotenv').config();
import { createUserConnection, closeUserConnection } from './models/dbModels/DBUser';
import UserSignUpInfo from './interfaces/modelinterfaces/UserSignUpInfo';
import {
    portNumber,
    createSignUpController
} from "./utils/serverHelper";
import SignUpController from "./controllers/SignUpController";
import { Connection } from "mongoose";
import { createPasswordConnection } from "./utils/PasswordServiceUtils";
import UserPasswordInfo from "./interfaces/modelinterfaces/UserPasswordInfo";
import bodyParser from "body-parser";

const app = express();

let userConnection: Connection;
let passwordConnection: Connection;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(portNumber, () => {
    console.log("Listening on port " + portNumber);
    userConnection = createUserConnection();
    passwordConnection = createPasswordConnection();
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
    console.log("Verifying user.");

    console.log("Body as string " + req.body.username);
    const providedLogin: UserPasswordInfo = {
        username: String(req.body.username),
        password: String(req.body.password)
    };

    logUserLoginInfo(providedLogin);
    res.send("");
});

function logUserInfo(userInfo: UserSignUpInfo) {
    console.log(`Uname: ${userInfo.username}`);
    console.log(`Pswd: ${userInfo.password}`);
    console.log(`Email: ${userInfo.email}`);
    console.log(`Firstname: ${userInfo.firstName}`);
    console.log(`Lastname: ${userInfo.lastName}`);
}

function logUserLoginInfo(userInfo: UserPasswordInfo) {
    console.log(`Username: ${userInfo.username} Password: ${userInfo.password}`);
}

