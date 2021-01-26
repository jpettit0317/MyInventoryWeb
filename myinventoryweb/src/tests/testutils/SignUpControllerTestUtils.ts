import SignUpControllerProps from "../../props/SignUpControllerProps";
import SignUpController from "../../controllers/SignUpController";
import FullName from "../../typeDefs/FullName";
import { Connection, Model } from "mongoose";
import IUserInfo from "../../interfaces/modelinterfaces/UserInfo";
import userInfoSchema from "../../models/dbModels/UserInfoSchema";
import { UserService } from "../../services/UserService";
import PasswordService from "../../services/PasswordService";
import UserSignUpInfo from "../../interfaces/modelinterfaces/UserSignUpInfo";
import UserPasswordInfo from "../../interfaces/modelinterfaces/UserPasswordInfo";


export const jonUser: UserSignUpInfo = {
    username: "jondoe",
    password: "password",
    email: "email",
    firstName: "Jon",
    lastName: "Doe",
    userId: ""
};

export const jonUserLogin: UserPasswordInfo = {
    username: jonUser.username,
    password: jonUser.password
};

export const emptyProps = {
    username: "",
    email: "",
    password: "",
    fullName: {
        firstName: "",
        lastName: ""
    }
};

export const allFilledInProps = {
    username: "Username",
    email: "email",
    password: "password",
    fullName: {
        firstName: "One",
        lastName: "Two"
    }
};

export function verifyControllerFields(signUpController: SignUpController, expectedProps: SignUpControllerProps) {
    expect(signUpController.userSignUpInfo.username).toBe(expectedProps.username);
    expect(signUpController.userSignUpInfo.email).toBe(expectedProps.email);
    expect(signUpController.userSignUpInfo.password).toBe(expectedProps.password);

    const signUpControllerFullName: FullName = {
        firstName: signUpController.userSignUpInfo.firstName,
        lastName: signUpController.userSignUpInfo.lastName
    };

    verifyFullName(signUpControllerFullName, expectedProps.fullName);
}

export function verifyFullName(actualFullName: FullName, expectedFullName: FullName) {
    expect(actualFullName.firstName).toBe(expectedFullName.firstName);
    expect(actualFullName.lastName).toBe(expectedFullName.lastName);
}

export function buildEmptySignUpController(userService: UserService, passwordService: PasswordService): SignUpController {
    const emptySignUpProps = buildProps(emptyProps);
    return SignUpController.createSignUpController(emptySignUpProps, userService, passwordService);
}

export function buildSignUpController(props: SignUpControllerProps, userService: UserService, passwordService: PasswordService): SignUpController {
    return SignUpController.createSignUpController(props, userService, passwordService);
}

function createUserModel(connection: Connection): Model<IUserInfo> {
    const TestUsers = connection.model<IUserInfo>("TestUsers", userInfoSchema, "userServiceTests");

    return TestUsers;
} 

export function buildProps(props: {username: string, email: string, password: string, fullName: FullName}): SignUpControllerProps {
       const signUpControllerProps: SignUpControllerProps = {
           username: props.username,
           email: props.email,
           password: props.password,
           fullName: props.fullName
       };

       return signUpControllerProps;
}