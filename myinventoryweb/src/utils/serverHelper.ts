import SignUpController from '../controllers/SignUpController';
import UserSignUpInfo from '../interfaces/modelinterfaces/UserSignUpInfo';
import {createUserModel, createUserConnection, closeUserConnection} from '../models/dbModels/DBUser';
import SignUpControllerProps from '../props/SignUpControllerProps';
import { Model, Connection } from "mongoose";
import IUserInfo from '../interfaces/modelinterfaces/UserInfo';
import IPasswordInfo from '../interfaces/modelinterfaces/IPasswordInfo';
import { UserService } from '../services/UserService';
import PasswordService from '../services/PasswordService';
import { createPasswordModel } from './PasswordServiceUtils';
import UserPasswordInfo from '../interfaces/modelinterfaces/UserPasswordInfo';
import LoginController from '../controllers/LoginController';

export const portNumber: number = 4000;

function createModelsForSignUp(userConnection: Connection, passwordConnection: Connection): {userModel: Model<IUserInfo>, passwordModel: Model<IPasswordInfo>} {
    return {
        userModel: createUserModel(userConnection),
        passwordModel: createPasswordModel(passwordConnection)
    };
}

export function createSignUpController(userInfo: UserSignUpInfo, userConnection: Connection, passwordConnection: Connection): SignUpController {
    const models = createModelsForSignUp(userConnection, passwordConnection);
    return initSignUpController(userInfo, models.userModel, models.passwordModel);
}

export function createLoginController(providedLogin: UserPasswordInfo, passwordConnection: Connection): LoginController {
    const passwordModel = createPasswordModel(passwordConnection);
    const passwordService = PasswordService.createPasswordService(passwordModel);

    return LoginController.createLoginController(providedLogin, passwordService);
}

function initSignUpController(userInfo: UserSignUpInfo,
    userDB: Model<IUserInfo>, passwordDB: Model<IPasswordInfo>): SignUpController {
    const props = createSignUpControllerProps(userInfo);
    const newUserService = UserService.createUserService(userDB);
    const newPasswordService = PasswordService.createPasswordService(passwordDB, 10);

    return SignUpController.createSignUpController(props, newUserService, newPasswordService);
}

function createSignUpControllerProps(info: UserSignUpInfo): SignUpControllerProps {
    const props: SignUpControllerProps = {
        username: info.username,
        email: info.email,
        password: info.password,
        fullName: {
            firstName: info.firstName, 
            lastName: info.lastName
        }
    };

    return props;
}

