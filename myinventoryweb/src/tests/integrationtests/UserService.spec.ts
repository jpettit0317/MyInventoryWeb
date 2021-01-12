import { UserService } from "../../services/UserService";
import { 
    deleteUsersByUsername, 
    testInfo, 
    connectionString,
    johnInfo,
    verifyDoesUserExistResult,
    johnSignUpInfo,
    verifyCreateUser,
    getUserNameAndPasswordFromInfo,
    emptySignUpInfo
} from "../testutils/UserServiceTestUtils";
import mongoose from "mongoose";
import IUserInfo from "../../interfaces/modelinterfaces/UserInfo";
import userInfoSchema from "../../models/dbModels/UserInfoSchema";
import UserSignUpInfo from "../../interfaces/modelinterfaces/UserSignUpInfo";

describe("UserService tests", () => {
    let testUserConnection: Promise<mongoose.Connection>;
    let TestUsers: mongoose.Model<IUserInfo>;
    let sut: UserService;

    beforeAll( async (done: jest.DoneCallback) => {
        testUserConnection = mongoose.createConnection(connectionString);

        (await testUserConnection).on('error', (err) => {
            done.fail(err);
        });

        TestUsers = (await testUserConnection).model<IUserInfo>("TestUsers", userInfoSchema, "userServiceTests");
        await TestUsers.insertMany([
            {
                email: testInfo.email,
                username: testInfo.username,
                firstName: testInfo.firstName,
                lastName: testInfo.lastName,
                userId: testInfo.userId
            }
        ]).catch(function (error) {
            done.fail(error);
        }); 
        
        sut = UserService.createUserService(TestUsers);

        done();
    });

    afterAll( async (done: jest.DoneCallback) => {
        deleteUsersByUsername(TestUsers, done);
    });

    describe("doesUserExist tests", function () {
        it("when user exists, doesUserExist should return true", async () => {
            const actualValue: {result: boolean, message: string} = await sut.doesUserExist(testInfo.username);
            const expectedValue: {result: boolean, message: string} = {result: true, message: sut.usernameExistsMessage};

            verifyDoesUserExistResult(expectedValue, actualValue)
        });

        it("when user doesn't exist, doesUserExist should return false", async () => {
            const actualValue: {result: boolean, message: string} = await sut.doesUserExist(johnInfo.username);
            const expectedValue: {result: boolean, message: string} = {result: false, message: ""};

            verifyDoesUserExistResult(expectedValue, actualValue);
        });
    });

    describe("createUser tests", () => {
        async function findUser(userInfo: UserSignUpInfo): Promise<{result: boolean, message: string}> {
            let resultOfFind = false;
            let errorMessage = "";

            await TestUsers.exists(
                {username: userInfo.username, email: userInfo.email, 
                    firstName: userInfo.firstName, lastName: userInfo.lastName}).then( (value) => {
                if (value) {
                    resultOfFind = true;
                    errorMessage = "";
                } else if (value === null) {
                    errorMessage = "Doc doesn't exist";
                }
            });

            return new Promise((resolve) => {
                if (!resultOfFind) {
                    resolve({result: resultOfFind, message: errorMessage});
                } else {
                    resolve({result: resultOfFind, message: ""});
                }
            });
        }

        it("when createUser is called with a new user, that user should be saved.", async () => {
            const actualValue: {result: {username: string, password: string}, message: string} = await sut.createUser(johnSignUpInfo);
            const expectedValue = getUserNameAndPasswordFromInfo(johnSignUpInfo, "");

            verifyCreateUser([actualValue, expectedValue]); 
        });

        it('when createUser is called with an already saved user, that user should not be saved', async () => {
            const actualValue: {result: {username: string, password: string}, message: string} = await sut.createUser(testInfo);
            const expectedValue = getUserNameAndPasswordFromInfo(emptySignUpInfo, sut.usernameExistsMessage);

            verifyCreateUser([actualValue, expectedValue]);
        });

        it('when a user named jon is saved, does the retrieved user match what was inserted', async (done) => {
            await findUser(johnSignUpInfo).then( (result) => {
                if (result.message !== "") {
                    done.fail(result.message);
                }
                expect(result.result).toBe(true);
                done();
            });
        });

        it('when a user named test is saved, does the retrieved user match what was inserted', async (done) => {
            await findUser(testInfo).then((result) => {
                if (result.message !== "") {
                    done.fail(result.message);
                }
                expect(result.result).toBe(true);
                done();
            });
        });
    });
});