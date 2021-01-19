import { connect } from 'http2';
import mongoose from 'mongoose';
import IPasswordInfo from '../../interfaces/modelinterfaces/IPasswordInfo';
import UserPasswordInfo from '../../interfaces/modelinterfaces/UserPasswordInfo';
import PasswordService from '../../services/PasswordService';

export const collectionSuccessfullyDropped: string = "Collection dropped.";

export const testPasswordDB = {
    connectionString: "mongodb://localhost:27017/userPasswordTests",
    collectionName: "userPasswordServiceTests",
    refName: "TestPasswords"
};

export const logins: {testInfo: UserPasswordInfo, 
    jonInfo: UserPasswordInfo, badTestInfo: UserPasswordInfo} = {
    testInfo: {username: "test", password: "password"},
    jonInfo: {username: "jondoe", password: "password"},
    badTestInfo: {username: "test", password: "password2"}
};

export function verifyUserPasswordInfo(passwordInfos: UserPasswordInfo[]) {
    const [actualInfo, expectedInfo] = passwordInfos;

    expect(actualInfo.username).toBe(expectedInfo.username);
    expect(actualInfo.password).toBe(expectedInfo.password);
}

export function verifyCreateUserPassword(results: {result: boolean, message: string}[]) {
    const [actualInfo, expectedInfo] = results;

    expect(actualInfo.message).toBe(expectedInfo.message);
    expect(actualInfo.result).toBe(expectedInfo.result);
}

export function verifyValidateUser(results: {result: boolean, reason: string}[]) {
    const [actualInfo, expectedInfo] = results;

    expect(actualInfo.result).toBe(expectedInfo.result);
    expect(actualInfo.reason).toBe(expectedInfo.reason);
}

export async function closeConnection(connection: mongoose.Connection): Promise<boolean> {
    let wasConnectionClosedSuccessfully: boolean = true;
    await connection.close().catch( (rejctionReason) => {
        console.log("Couldn't close connection because: " + String(rejctionReason));
        wasConnectionClosedSuccessfully = false;
    });

    return new Promise( (resolve, reject) => {
        if (wasConnectionClosedSuccessfully) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

export async function dropPasswordCollection(connection: mongoose.Connection, collectionName: string = testPasswordDB.collectionName): Promise<string> {
    let closedMessage: string = "";

    await connection.db.dropCollection(collectionName).then( () => {
        closedMessage = collectionSuccessfullyDropped;
    }, (rejectionReason) => {
        closedMessage = String(rejectionReason);
    });

    return new Promise( (resolve, reject) => {
        if (closedMessage === collectionSuccessfullyDropped) {
            resolve(closedMessage);
        } else {
            reject(closedMessage);
        }
    });
}