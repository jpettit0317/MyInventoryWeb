import LoginController from "../../controllers/LoginController";
import PasswordService from "../../services/PasswordService";
import * as TestHelperFuncs from "../testutils/LoginControllerTestsHelperFunctions";
import * as TestHelperVars from "../testutils/LoginControllerTestsHelperVars";
import { Model, Connection, createConnection } from "mongoose";
import IPasswordInfo from "../../interfaces/modelinterfaces/IPasswordInfo";
import userPasswordSchema from "../../models/dbModels/UserPasswordSchema";
import {dropPasswordCollection, closeConnection} from "../testutils/PasswordServiceTestUtils";
import VerifyUserMessages from "../../enums/VerifyUserMessages_enum";

describe('LoginController tests', () => {
    let testPasswordConnection: Connection;
    let TestPasswords: Model<IPasswordInfo>;
    let passwordService: PasswordService;

    beforeAll(async (done: jest.DoneCallback) => {
        console.log("In before all");

        testPasswordConnection = createConnection(TestHelperVars.integrationLoginControllerTestInfo.connectionString);

        testPasswordConnection.on("error", (error) => {
            done.fail(String(error));
        });

        TestPasswords = testPasswordConnection.model<IPasswordInfo>(
            TestHelperVars.integrationLoginControllerTestInfo.refName,
            userPasswordSchema, 
            TestHelperVars.integrationLoginControllerTestInfo.collectionName);

        passwordService = PasswordService.createPasswordService(TestPasswords);

        await passwordService.createUserPasswordEntry(TestHelperVars.jonLoginInfo).then(() => {
            console.log("Saved user");
        }).catch(() => {
            console.log("Failed to save user");
        });

        done();
    });

    afterAll(async (done: jest.DoneCallback) => {
        const collectionName = TestHelperVars.integrationLoginControllerTestInfo.collectionName;
        await dropPasswordCollection(testPasswordConnection, collectionName).then(async (result) => {
            console.log("Succesfully droped password connection " + result);
            await closeConnection(testPasswordConnection).then(() => {
                console.log("Password connection closed");
                done();
            }).catch(() => {
                done.fail("Failed to close connection");
            });
        }).catch(async (reasonForRejection: string) => {
            console.log("Failed to drop collection");
            await closeConnection(testPasswordConnection).then(() => {
                console.log("Password connection closed");
            }).catch(() => {
                done.fail("Failed to close connection");
            });
            done.fail(reasonForRejection);
        });
    });

    describe('LoginController verify tests', () => {
        it('verifyUserLogin', async (done: jest.DoneCallback) => {
            const sut = TestHelperFuncs.createLoginControllerForTest(
                TestHelperVars.jonLoginInfo,
                passwordService
            );

            await sut.verifyUserLogin().then((result) => {
                expect(result).toBe("");
            }).catch((reason: string) => {
                done.fail("Failed because " + reason);
            });

            done();
        });

        it(`when passing in the wrong password, verifyUserLogin should return ${TestHelperVars.invalidPassword}`, 
            async (done: jest.DoneCallback) => {
                const sut = TestHelperFuncs.createLoginControllerForTest(
                    TestHelperVars.invalidJonLoginInfo,
                    passwordService
                );

                await sut.verifyUserLogin().then( (result) => {
                    expect(result).toBe(VerifyUserMessages.passwordsDontMatch);
                }).catch((reason: string) => {
                    done.fail("Failed because " + reason);
                });

                done();
        });

        it(`when passing in a non-existent user, verifyUserLogin should return "${TestHelperVars.userDoesntExist}"`, 
           async (done: jest.DoneCallback) => {
               const sut = TestHelperFuncs.createLoginControllerForTest(
                   TestHelperVars.janeLoginInfo,
                   passwordService
               );

               await sut.verifyUserLogin().then( (result) => {
                   expect(result).toBe(VerifyUserMessages.userDoesntExist);
               }).catch((reason: string) => {
                   done.fail("Failed because " + reason);
               });

               done();
        });
    });
});