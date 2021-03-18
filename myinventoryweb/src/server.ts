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
    createDeleteItemController,
    createSessionExpiredController,
    createDeleteSessionController
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
import SessionExpiredController from "./controllers/SessionExpiredController";
import { createNewItemProps, getUsername } from "./utils/UserSessionUtils";
import AddItemResult from "./enums/AddItemResult_enum";

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

    await createNewItemProps(itemProps, sessionConnection).then(async (result) => {
        console.log("The props are " + JSON.stringify(result.props));
        const addItemController = createAddItemController(result.props, itemConnection);

        await addItemController.addItem().then((addResult: string) => {
            console.log("Resolving " + addResult);
            res.send(addResult);
        }).catch((rejectReason: string) => {
            console.log("Rejecting " + rejectReason);
            res.send(rejectReason);
        });
    }).catch(() => {
        res.send(AddItemResult.failedToFetchUser);
    });
});

app.get(ApiURL.getItems, async (req, res) => {
    const owner = req.params.owner;

    await getUsername(owner, sessionConnection).then(async (result) => {
        const getItemsController = createGetItemController(itemConnection);

        await getItemsController.getItems(result.user).then((itemsAsString) => {
            res.send(itemsAsString);
        });
    }).catch(() => {
        res.send("");
    });
    
});

app.get(ApiURL.getSessionExpDate, async (req, res) => {
    const sessionId = req.params.sessionId;
    const expired = "Session Expired";
    const sessionIsValidMessage = "Session is valid";

    console.log("Sent session id is " + sessionId);

    const sessionExpiredController = createSessionExpiredController(sessionConnection);

    sessionExpiredController.hasSessionExpired(sessionId).then((result) => {
        if (result) {
            res.send(expired);
        } else {
            res.send(sessionIsValidMessage);
        }
    }).catch(() => {
        res.send(expired);
    });
});

app.post(ApiURL.deleteSession, async (req, res) => {
    const sessionId = req.body.sessionId;

    console.log("request body: " + String(req.body));
    console.log("Deleting session with id " + sessionId);

    const deleteSessionController = createDeleteSessionController(sessionConnection);

    deleteSessionController.deleteSessionWithId(sessionId).then((result) => {
        if (result.result) {
            console.log("Deleting id " + sessionId);
            res.send(result.reason);
        }
    }).catch((reasonForRejection: {result: boolean, reason: string}) => {
        console.log("Failed to delete " + sessionId);
        res.send(reasonForRejection.reason);
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

    await createNewItemProps(itemProps, sessionConnection).then(async (result) => {
        console.log("The props are " + JSON.stringify(result.props));

        const updatedItem = MyInventoryItem.createItem(result.props);

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
    }).catch(() => {
        res.send("Failed to get user from session");
    });
});

app.post(ApiURL.deleteItem, async (req, res) => {
    console.log("In deleteItem");
    const itemProps: MyInventoryItemProps = {
        title: req.body.item.title,
        itemId: req.body.item.itemId,
        owner: req.body.sessionId,
        type: req.body.item.type,
        count: req.body.item.count,
        description: req.body.item.description
    };

    await createNewItemProps(itemProps, sessionConnection).then((result) => {
        const itemToDelete = MyInventoryItem.createItem(result.props);
        console.log("In delete item");
        logItem(itemToDelete);

        const deleteItemController = createDeleteItemController(itemConnection);

        deleteItemController.deleteItem(itemToDelete).then((value) => {
            res.send("");
        }).catch((reason: string) => {
            res.send(reason);
        });
    }).catch(() => {
        res.send("Couldn't get username from session");
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
