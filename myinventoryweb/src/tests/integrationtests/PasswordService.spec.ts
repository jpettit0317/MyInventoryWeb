import PasswordService from "../../services/PasswordService";
import { Model, Connection, createConnection } from "mongoose";
import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";
import IPasswordInfo from "../../interfaces/modelinterfaces/IPasswordInfo";
import {
    logins,
    testPasswordDB,
    closeConnection,
    dropPasswordCollection,
    verifyCreateUserPassword,
    verifyValidateUser
} from "../testutils/PasswordServiceTestUtils";
import userPasswordSchema from "../../models/dbModels/UserPasswordSchema";
import VerifyUserMessages from "../../enums/VerifyUserMessages_enum";

describe('PasswordService tests', () => {
    let testPasswordConnection: Connection;
    let TestPasswords: Model<IPasswordInfo>;
    let sut: PasswordService;

    beforeAll( async (done: jest.DoneCallback) => {
        console.log("In before all");

        testPasswordConnection = createConnection(testPasswordDB.connectionString);
        
        testPasswordConnection.on("error", (error) => {
            done.fail(String(error));
        });

        TestPasswords = testPasswordConnection.model<IPasswordInfo>(testPasswordDB.refName, 
            userPasswordSchema, testPasswordDB.collectionName);

        sut = PasswordService.createPasswordService(TestPasswords);

        done();
    });

    afterAll( async (done: jest.DoneCallback) => {
        console.log("After all");
        await dropPasswordCollection(testPasswordConnection, testPasswordDB.collectionName).then( async (result) => {
            console.log(result);
            await closeConnection(testPasswordConnection).then( () => {
                console.log("Password connection closed");
                done();
            }).catch( () => {
                done.fail("Failed to close connection");
            });
        }).catch( async (reasonForRejection: string) => {
            await closeConnection(testPasswordConnection).then(() => {
                console.log("Password connection closed");
            }).catch(() => {
                done.fail("Failed to close connection");
            });
            done.fail(reasonForRejection);
        });
    });

    describe('createUserPasswordEntry tests', () => {
        it("when a user doesn't exist, createUserPasswordEntry should return true and the message should be blank",
            async (done: jest.DoneCallback) => {
              await sut.createUserPasswordEntry(logins.testInfo).then( (result: {result: boolean, message: string}) => {
                  const expectedResult = {result: true, message: ""};
                  verifyCreateUserPassword([result, expectedResult]); 
                  done();
              }).catch( (reasonForRejection: {result: boolean, message: string}) => {
                  done.fail(reasonForRejection.message);
              });
        });

        it("when a user does exist, createUserPasswordEntry should return false and the message should be User exists", async (done: jest.DoneCallback) => {
            await sut.createUserPasswordEntry(logins.testInfo).then( (result: {result: boolean, message: string}) => {
                done.fail(result.message);
            }).catch((reasonForRejection: {result: boolean, message: string}) => {
                const expectedResult = {result: false, message: VerifyUserMessages.userDoesExist};
                verifyCreateUserPassword([reasonForRejection, expectedResult]);
                done();
            });
        });
    });

    describe('validateUserLogin tests', () => {
        it("when a user does exist and provides the correct password, validateUserLogin should return true", async (done: jest.DoneCallback) => {
            const expectedResult = {result: true, reason: ""};

            await sut.validateUserLogin(logins.testInfo).then((actualResult: {result: boolean, reason: string}) => {
                verifyValidateUser([actualResult, expectedResult]);
                done();
            }).catch(() => {
                done.fail("Validation failed.");
            });
        });
        
        it("when a user does exist and provides an incorrect password, validateUserLogin should return false", async (done: jest.DoneCallback) => {
            const expectedResult = {result: false, reason: "Passwords don't match"};

            await sut.validateUserLogin(logins.badTestInfo).then((actualResult: {result: boolean, reason: string}) => {
                verifyValidateUser([actualResult, expectedResult]);
                done();
            }).catch( () => {
                done.fail("Validation failed.");
            });
        });

        it("when a user doesn't exist, validateUserLogin should return false", async(done: jest.DoneCallback) => {
            const expectedResult = {result: false, reason: "User doesn't exist"};

            await sut.validateUserLogin(logins.jonInfo).then((actualResult: {result: boolean, reason: string}) => {
                verifyValidateUser([actualResult, expectedResult]);
                done();
            }).catch((reason: {result: boolean, reason: string}) => {
                done.fail("Validation failed because: " + reason.reason);
            });
        });
    });
});