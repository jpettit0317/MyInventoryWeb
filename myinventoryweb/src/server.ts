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

const app = express();

let userConnection: Connection;
let passwordConnection: Connection;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

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

function logUserInfo(userInfo: UserSignUpInfo) {
    console.log(`Uname: ${userInfo.username}`);
    console.log(`Pswd: ${userInfo.password}`);
    console.log(`Email: ${userInfo.email}`);
    console.log(`Firstname: ${userInfo.firstName}`);
    console.log(`Lastname: ${userInfo.lastName}`);
}

