import SignUpController from "../../../controllers/SignUpController";
import * as TestUtils from "../../testutils/SignUpControllerTestUtils";
import { Model, Connection, createConnection } from "mongoose";
import IUserInfo from "../../../interfaces/modelinterfaces/UserInfo";
import {
    testInfo,
    connectionString,
    johnInfo,
    verifyDoesUserExistResult,
    johnSignUpInfo,
    verifyCreateUser,
    getUserNameAndPasswordFromInfo,
    emptySignUpInfo,
    userServiceTestCollection,
} from "../../testutils/UserServiceTestUtils";
import userInfoSchema from "../../../models/dbModels/UserInfoSchema";
import userPasswordSchema from "../../../models/dbModels/UserPasswordSchema";
import { UserService } from "../../../services/UserService";
import IPasswordInfo from "../../../interfaces/modelinterfaces/IPasswordInfo";
import PasswordService from "../../../services/PasswordService";
import * as PasswordServiceTestUtils from "../../testutils/PasswordServiceTestUtils";

describe('SignUpController tests', () => {
    let testUserConnection: Promise<Connection>;
    let testPasswordConnection: Promise<Connection>;
    let TestUsers: Model<IUserInfo>;
    let TestPasswords: Model<IPasswordInfo>;
    let userService: UserService;
    let passwordService: PasswordService;

    beforeAll( async (done: jest.DoneCallback) => {
        testUserConnection = createConnection(connectionString);
        testPasswordConnection = createConnection(PasswordServiceTestUtils.testPasswordDB.connectionString);

        (await testUserConnection).on('error', (error) => {
            done.fail(String(error));
        });

        (await testPasswordConnection).on('error', (error) => {
            done.fail(String(error));
        });

        TestUsers = (await testUserConnection).model<IUserInfo>(
            "TestUsers",
            userInfoSchema,
            userServiceTestCollection
        );

        TestPasswords = (await testPasswordConnection).model<IPasswordInfo>(
            PasswordServiceTestUtils.testPasswordDB.refName,
            userPasswordSchema,
            PasswordServiceTestUtils.testPasswordDB.collectionName
        );

        userService = UserService.createUserService(TestUsers);
        passwordService = PasswordService.createPasswordService(TestPasswords, 10);

        done();
    });

    afterAll( async (done: jest.DoneCallback) => {
        (await testUserConnection).db.dropCollection(userServiceTestCollection).then((result) => {
            if (!result) {
                done.fail(`Couldn't drop collection named ${userServiceTestCollection}`);
            }
        }, (rejectionReason) => {
            done.fail(`Couldn't drop collection named ${userServiceTestCollection} because: ${String(rejectionReason)}`);
        });

        (await testPasswordConnection).db.dropCollection(PasswordServiceTestUtils.testPasswordDB.collectionName).then((result) => {
            if (!result) {
                done.fail(`Couldn't drop collection named ${PasswordServiceTestUtils.testPasswordDB.collectionName}`);
            }
        }, (rejectionReason) => {
            done.fail(`Couldn't drop collection named ${PasswordServiceTestUtils.testPasswordDB.collectionName} because ${String(rejectionReason)}`);
        });

        (await testUserConnection).close().catch((reason) => {
            done.fail(String(reason));
        });
        (await testPasswordConnection).close().catch((reason) => {
            done.fail(String(reason));
        });

        done();
    });

    describe('Constructor tests', () => {
        it('When initalized with empty props, properties should return empty', () => {
            const emptyProps = TestUtils.buildProps(TestUtils.emptyProps); 

            const sut = TestUtils.buildEmptySignUpController(userService, passwordService);

            TestUtils.verifyControllerFields(sut, emptyProps);
        });

        it('When intialized with all fields filled in, properties should return expected values', () => {
            const allFieldsFilledIn = TestUtils.buildProps(TestUtils.allFilledInProps);

            const sut = TestUtils.buildSignUpController(allFieldsFilledIn, userService, passwordService);

            TestUtils.verifyControllerFields(sut, allFieldsFilledIn);
        });
    });
});