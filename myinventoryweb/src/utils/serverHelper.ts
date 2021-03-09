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
import AddItemController from '../controllers/AddItemController';
import { createItemModel } from '../utils/AddItemUtils';
import { MyInventoryItemProps } from '../props/MyInventoryItemProps';
import MyInventoryItem from '../models/usermodels/MyInventoryItem';
import ItemService from '../services/ItemService';
import MyInventoryController from '../controllers/MyInventoryController';
import EditItemController from '../controllers/EditItemController';
import DeleteItemController from '../controllers/DeleteItemController';
import SessionService from '../services/SessionService';
import ISession from '../interfaces/modelinterfaces/ISession';
import { createSessionModel } from "../utils/SessionServiceUtils";

export const portNumber: number = 4000;

function createModelsForSignUp(userConnection: Connection, passwordConnection: Connection, sessionConnection: Connection): {userModel: Model<IUserInfo>, passwordModel: Model<IPasswordInfo>, sessionModel: Model<ISession>} {
    return {
        userModel: createUserModel(userConnection),
        passwordModel: createPasswordModel(passwordConnection),
        sessionModel: createSessionModel(sessionConnection)
    };
}

export function createSignUpController(userInfo: UserSignUpInfo, userConnection: Connection, passwordConnection: Connection, sessionConnection: Connection): SignUpController {
    const models = createModelsForSignUp(userConnection, passwordConnection, sessionConnection);
    return initSignUpController(userInfo, models.userModel, models.passwordModel, models.sessionModel);
}

export function createLoginController(providedLogin: UserPasswordInfo, passwordConnection: Connection, sessionConnection: Connection): LoginController {
    const passwordModel = createPasswordModel(passwordConnection);
    const sessionModel = createSessionModel(sessionConnection);

    const sessionService = new SessionService(sessionModel);
    const passwordService = PasswordService.createPasswordService(passwordModel);

    return LoginController.createLoginController(providedLogin, passwordService, sessionService);
}

function initSignUpController(userInfo: UserSignUpInfo,
    userDB: Model<IUserInfo>, passwordDB: Model<IPasswordInfo>, sessionDB: Model<ISession>): SignUpController {
    const props = createSignUpControllerProps(userInfo);
    const newUserService = UserService.createUserService(userDB);
    const newPasswordService = PasswordService.createPasswordService(passwordDB, 10);
    const newSessionService = new SessionService(sessionDB);

    return SignUpController.createSignUpController(props, newUserService, newPasswordService, newSessionService);
}

export function createAddItemController(newItemProps: MyInventoryItemProps, connection: Connection): AddItemController {
    const itemModel = createItemModel(connection);
    const newItem = MyInventoryItem.createItem(newItemProps);
    const itemService = new ItemService(itemModel);

    return new AddItemController(newItem, itemService);
}

export function createEditItemController(itemConnection: Connection): EditItemController {
    const itemModel = createItemModel(itemConnection);
    const itemService = new ItemService(itemModel);

    return new EditItemController(itemService);
}

export function createDeleteItemController(itemConnection: Connection): DeleteItemController {
    const itemModel = createItemModel(itemConnection);
    const itemService = new ItemService(itemModel);

    return new DeleteItemController(itemService);
}

export function createGetItemController(connection: Connection): MyInventoryController {
    const itemModel = createItemModel(connection);
    const itemService = new ItemService(itemModel);
    
    return new MyInventoryController(itemService);
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

