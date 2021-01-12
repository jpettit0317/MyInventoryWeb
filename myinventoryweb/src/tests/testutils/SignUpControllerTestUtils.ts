import SignUpControllerProps from "../../props/SignUpControllerProps";
import SignUpController from "../../controllers/SignUpController";
import FullName from "../../typeDefs/FullName";

export function verifyControllerFields(signUpController: SignUpController, expectedProps: SignUpControllerProps) {
    expect(signUpController.username).toBe(expectedProps.username);
    expect(signUpController.email).toBe(expectedProps.email);
    expect(signUpController.password).toBe(expectedProps.password);
    verifyFullName(signUpController.fullName, expectedProps.fullName);
}

export function verifyFullName(actualFullName: FullName, expectedFullName: FullName) {
    expect(actualFullName).toBe(expectedFullName);
}

export function buildEmptySignUpController(): SignUpController {
    return SignUpController.createSignUpController(emptyProps);
}

export function buildSignUpController(props: SignUpControllerProps): SignUpController {
    return SignUpController.createSignUpController(props);
}

export const emptyProps: SignUpControllerProps = {
    username: "",
    email: "",
    password: "",
    fullName: {
        firstName: "", 
        lastName: ""
    }
};

export const allFilledInProps: SignUpControllerProps = {
    username: "Username",
    email: "email",
    password: "password",
    fullName: {
        firstName: "One",
        lastName: "Two"
    } 
};