import ApiURL from "./enums/ApiURL_enum";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import session from 'express-session';
import MongoStore from 'connect-mongo';
require('dotenv').config();
import { DBUser } from './models/dbModels/DBUser';
import userInfoSchema from './models/dbModels/UserInfoSchema';

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const passwordSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String
});

const sessionSchema = new mongoose.Schema({
    expirationDate: Date,
    sessionId: String,
    username: String
});

const portNumber = 4000;

app.listen(portNumber, () => {
    console.log("Listening on port " + portNumber);
});

app.post(ApiURL.createUser, (req, res) => {
    console.log(`Hello from ${ApiURL.createUser}`);
    const userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    };

    findUser();
    
    logUserInfo(userInfo);
    res.send("Username already exists");
});

function logUserInfo(userInfo: {username: string, password: string, email: string, fullName: {firstName: string, lastName: string}}) {
    console.log(`Uname: ${userInfo.username}`);
    console.log(`Pswd: ${userInfo.password}`);
    console.log(`Email: ${userInfo.email}`);
    console.log(`Firstname: ${userInfo.fullName.firstName}`);
    console.log(`Lastname: ${userInfo.fullName.lastName}`);
}

async function findUser() {
    const user = await DBUser.find();

    if (user.length == 0) {
        console.log("User doesn't exist");
    } else {
        console.log("User " + user[0]);
    }
}
