import mongoose from 'mongoose';
import IUserInfo from '../../interfaces/modelinterfaces/UserInfo';
import UserSignUpInfo from '../../interfaces/modelinterfaces/UserSignUpInfo';
import { UserService } from '../../services/UserService';

export const connectionString = "mongodb://localhost:27017/userServiceTests";

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

export async function createConnection(connectionURI: string): Promise<mongoose.Connection> {
    return mongoose.createConnection(connectionURI);
}

export function deleteUsersByUsername(testUserDB: mongoose.Model<IUserInfo>, done: jest.DoneCallback) {
    testUserDB.deleteMany({ username: testInfo.username }, undefined, undefined).then((value) => {
        testUserDB.deleteMany({ username: johnSignUpInfo.username }, undefined, undefined).then((value) => {
            done();
        });
    });
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