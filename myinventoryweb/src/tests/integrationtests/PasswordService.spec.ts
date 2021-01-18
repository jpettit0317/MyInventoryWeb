import PasswordService from "../../services/PasswordService";
import { Model, Connection, createConnection } from "mongoose";
import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";
import IPasswordInfo from "../../interfaces/modelinterfaces/IPasswordInfo";
import {
    testDataPasswordInfo,
    testPasswordDB,
    closeConnection,
    dropPasswordCollection,
    verifyCreateUserPassword
} from "../testutils/PasswordServiceTestUtils";
import userPasswordSchema from "../../models/dbModels/UserPasswordSchema";

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
              await sut.createUserPasswordEntry(testDataPasswordInfo.testInfo).then( (result: {result: boolean, message: string}) => {
                  const expectedResult = {result: true, message: ""};
                  verifyCreateUserPassword([result, expectedResult]); 
                  done();
              }).catch( (reasonForRejection: {result: boolean, message: string}) => {
                  done.fail(reasonForRejection.message);
              });
        });

        it("when a user does exist, createUserPasswordEntry should return false and the message should be User exists", async (done: jest.DoneCallback) => {
            await sut.createUserPasswordEntry(testDataPasswordInfo.testInfo).then( (result: {result: boolean, message: string}) => {
                done.fail(result.message);
            }).catch((reasonForRejection: {result: boolean, message: string}) => {
                const expectedResult = {result: false, message: "User exists"};
                verifyCreateUserPassword([reasonForRejection, expectedResult]);
                done();
            });
        });
    });
});