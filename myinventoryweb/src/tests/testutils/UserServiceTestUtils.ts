import mongoose from 'mongoose';
import IUserInfo from '../../interfaces/modelinterfaces/UserInfo';
import UserSignUpInfo from '../../interfaces/modelinterfaces/UserSignUpInfo';
import { UserService } from '../../services/UserService';

export const connectionString = "mongodb://localhost:27017/userServiceTests";
export const userServiceTestCollection = "userServiceTests";
export const collectionSuccessfullyDropped: string = "Collection dropped.";

export const testInfo: UserSignUpInfo = {
    email: "email@email.com",
    username: "test",
    firstName: "One",
    lastName: "Two",
    userId: "00",
    password: "password"
};

export const johnInfo: UserSignUpInfo = {
    email: "email2@email.com",
    username: "jondoe",
    firstName: "Jon",
    lastName: "Doe",
    userId: "01",
    password: "password"
};

export const johnSignUpInfo: UserSignUpInfo = {
    email: "email2@email.com",
    username: "jondoe",
    firstName: "John",
    lastName: "Doe",
    password: "password",
    userId: "00"
};

export const emptySignUpInfo: UserSignUpInfo = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    userId: ""
};

export function getUserNameAndPasswordFromInfo(usersignUpInfo: UserSignUpInfo, message: string = ""): 
   {result: {username: string, password: string}, message: string} {
    return {result: {username: usersignUpInfo.username, password: usersignUpInfo.password}, message: message};
}

export function verifyDoesUserExistResult(expected: {result: boolean, message: string}, actual: {result: boolean, message: string}) {
    expect(actual.result).toBe(expected.result);
    expect(actual.message).toBe(expected.message);
}

export function verifyCreateUser(results: {result: {username: string, password: string}, message: string}[]) {
    const [actualValue, expectedValue] = results;

    expect(actualValue.result.username).toBe(expectedValue.result.username);
    expect(actualValue.result.password).toBe(expectedValue.result.password);
    expect(actualValue.message).toBe(expectedValue.message);
}

export function verifyRetrievedUser(results: UserSignUpInfo[]) {
    const [actualUser, expectedUser] = results;

    expect(actualUser.username).toBe(expectedUser.username);
    expect(actualUser.firstName).toBe(expectedUser.firstName);
    expect(actualUser.lastName).toBe(expectedUser.lastName);
    expect(actualUser.email).toBe(expectedUser.email);
}

export async function closeConnection(connection: mongoose.Connection): Promise<string> {
    let connectionClosedMessage: string = collectionSuccessfullyDropped;

    await connection.close().catch((rejctionReason) => {
        console.log("Couldn't close connection because: " + String(rejctionReason));
        connectionClosedMessage = String(rejctionReason);
    });

    return new Promise((resolve, reject) => {
        if (connectionClosedMessage !== collectionSuccessfullyDropped) {
            resolve(connectionClosedMessage);
        } else {
            reject(connectionClosedMessage);
        }
    });
}

export async function dropUserCollection(connection: mongoose.Connection, collectionName: string = userServiceTestCollection): Promise<string> {
    let closedMessage: string = "";

    await connection.db.dropCollection(collectionName).then(() => {
        closedMessage = collectionSuccessfullyDropped;
    }, (rejectionReason) => {
        closedMessage = String(rejectionReason);
    });

    return new Promise((resolve, reject) => {
        if (closedMessage === collectionSuccessfullyDropped) {
            resolve(closedMessage);
        } else {
            reject(closedMessage);
        }
    });
}