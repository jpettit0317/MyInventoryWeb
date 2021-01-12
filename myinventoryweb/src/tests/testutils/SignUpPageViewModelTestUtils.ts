import SignUpPageViewModel from "../../viewmodels/SignUpPageViewModel";
import SignUpNetworkCallManager from "../../utils/SignUpNetworkCallManager";
import SignUpViewErrors from "../../typeDefs/SignUpViewErrors";
import FullName from "../../typeDefs/FullName";
import SignUpViewModelProps from "../../typeDefs/SignUpViewModelProps";
import Passwords from "../../typeDefs/Passwords";

const validEmail = "email@email.com";
const validUsername = "username";
const validPassword = "Valid";
const nonMatchingPasswords = ["Password", "Password2"];
const validFullName: FullName = {firstName: "First", lastName: "Name"};

export const validProps: SignUpViewModelProps = {
    username: validUsername,
    passwords: {password: validPassword, confirmedPassword: validPassword},
    email: validEmail,
    fullName: validFullName
};

export const emptyProps: SignUpViewModelProps  = {
    username: "",
    passwords: {password: "", confirmedPassword: ""},
    email: "",
    fullName: {firstName: "", lastName: ""}
};

export const emptyUsername: SignUpViewModelProps = {
    username: "",
    passwords: {password: validPassword, confirmedPassword: validPassword},
    email: validEmail,
    fullName: validFullName 
};

export const emptyPassword: SignUpViewModelProps = {
    username: validUsername,
    passwords: {password: "", confirmedPassword: validPassword},
    email: validEmail,
    fullName: validFullName
};

export const emptyConfirmedPassword: SignUpViewModelProps = {
    username: validUsername,
    passwords: {password: validPassword, confirmedPassword: ""},
    email: validEmail,
    fullName: validFullName
};

export const nonMatchingPasswordProps: SignUpViewModelProps = {
    username: validUsername,
    passwords: {password: nonMatchingPasswords[0], confirmedPassword: nonMatchingPasswords[1]},
    email: validEmail,
    fullName: validFullName
};

export const emptyEmail: SignUpViewModelProps = {
    username: validUsername,
    passwords: { password: validPassword, confirmedPassword: validPassword },
    email: "",
    fullName: validFullName
}

export const emptyFirstName: SignUpViewModelProps = {
    username: validUsername,
    passwords: { password: validPassword, confirmedPassword: validPassword },
    email: validEmail,
    fullName: { firstName: "", lastName: validFullName.lastName}
};

export const emptyLastName: SignUpViewModelProps = {
    username: validUsername,
    passwords: { password: validPassword, confirmedPassword: validPassword },
    email: validEmail,
    fullName: {firstName: validFullName.firstName, lastName: "" }
};

/*
SignUpViewModelErrors
*/

export const noErrors: SignUpViewErrors = {
    usernameError: "",
    passwordErrors: {passwordError: "", confirmedPasswordError: ""},
    emailError: "",
    fullNameErrors: {firstNameError: "", lastNameError: ""}
};

export const emptyFieldError: SignUpViewErrors = {
    usernameError: "Username should be filled in.",
    passwordErrors: {
        passwordError: "Password should be filled in.", 
        confirmedPasswordError: "Confirm password should be filled in."
    },
    fullNameErrors: { 
        firstNameError: "First name should be filled in.", 
        lastNameError: "Last name should be filled in."
    },
    emailError: "Email should be filled in."
};

export const nonMatchingPasswordsError = "Confirm password doesn't match password."; 

export function createSignUpPageViewModel(props: SignUpViewModelProps,
    networkCallManager: SignUpNetworkCallManager = SignUpNetworkCallManager.createNetworkManager("")): SignUpPageViewModel {
    return SignUpPageViewModel.createViewModel(props, networkCallManager);
}

export function createEmptySignUpPageViewModel(networkCallManager: SignUpNetworkCallManager = SignUpNetworkCallManager.createNetworkManager("")): SignUpPageViewModel {
    return SignUpPageViewModel.createEmptyViewModel(networkCallManager);
}

export function verifyViewModelIsEqualToProps(viewModel: SignUpPageViewModel, props: SignUpViewModelProps) {
    expect(viewModel.getUsername()).toBe(props.username);
    expect(viewModel.getEmailAddress()).toBe(props.email);
    verifyFullName(viewModel.getFullName(), props.fullName);
    verifyPasswords(viewModel.getPasswords(), props.passwords);
}

export function verifyPasswords(viewModelPasswords: Passwords, propPasswords: Passwords) {
    expect(viewModelPasswords.password).toBe(propPasswords.password);
    expect(viewModelPasswords.confirmedPassword).toBe(propPasswords.confirmedPassword);
}

export function verifyFullName(viewModelFullname: FullName, propFullName: FullName) {
    expect(viewModelFullname.firstName).toBe(propFullName.firstName);
    expect(viewModelFullname.lastName).toBe(propFullName.lastName);
}

export function createError(error: SignUpViewErrors = {usernameError: "", passwordErrors: {passwordError: "", confirmedPasswordError: ""}, 
   emailError: "", fullNameErrors: {firstNameError: "", lastNameError: ""}}): SignUpViewErrors {
       return {
           usernameError: error.usernameError,
           passwordErrors: error.passwordErrors,
           fullNameErrors: error.fullNameErrors,
           emailError: error.emailError
       };
}

export function verifyError(actualSignUpErrors: SignUpViewErrors, expectedSignUpErrors: SignUpViewErrors) {
    expect(actualSignUpErrors.usernameError).toBe(expectedSignUpErrors.usernameError);
    expect(actualSignUpErrors.emailError).toBe(expectedSignUpErrors.emailError);
    verifyFullNameError([actualSignUpErrors.fullNameErrors, expectedSignUpErrors.fullNameErrors]);
    verifyPasswordError([actualSignUpErrors.passwordErrors, expectedSignUpErrors.passwordErrors]);
}

export function verifyFullNameError(fullNameErrors: {firstNameError: string, lastNameError: string}[]) {
    const [actualError, expectedError] = fullNameErrors;

    expect(actualError.firstNameError).toBe(expectedError.firstNameError);
    expect(actualError.lastNameError).toBe(expectedError.lastNameError);
}

export function verifyPasswordError(passwordErrors: {passwordError: string, confirmedPasswordError: string}[]) {
    const [actualError, expectedError] = passwordErrors;

    expect(actualError.passwordError).toBe(expectedError.passwordError);
    expect(actualError.confirmedPasswordError).toBe(expectedError.confirmedPasswordError);
}

export function verifyAreThereErrors(results: boolean[]) {
    const [actualResult, expectedResult] = results;

    expect(actualResult).toBe(expectedResult);
}

export function printProps(props: SignUpViewModelProps) {
    console.log(`Username: ${props.username}`);
    console.log(`FirstName: ${props.fullName.firstName}, Lastname: ${props.fullName.lastName}`);
    console.log(`Email: ${props.email}`);
    console.log(`Password: ${props.passwords.password}, Confirmed Password: ${props.passwords.confirmedPassword}`);
}

export function printError(error: SignUpViewErrors) {
    console.log(`Username error: ${error.usernameError}`);
    console.log(`FirstName error: ${error.fullNameErrors.firstNameError}`); 
    console.log(`Lastname error: ${error.fullNameErrors.lastNameError}`);
    console.log(`Email error: ${error.emailError}`);
    console.log(`Password error: ${error.passwordErrors.passwordError}`);
    console.log(`Confirmed Password Error : ${error.passwordErrors.confirmedPasswordError}`);
}

export function verifyNetworkError(actualError: string, expectedError: string) {
    const expected = "{ " + expectedError + " }";
    expect(actualError).toBe(expected);
}

export const userNameTakenError = "Username taken";
export class MockSignUpNetworkCallManager extends SignUpNetworkCallManager {
    readonly error: string;

    private constructor(newError: string = "", newUrl: string = "") {
        super(newUrl);
        this.error = newError;
    }

    static createMock(newError: string = "", newUrl: string = ""): MockSignUpNetworkCallManager {
        return new MockSignUpNetworkCallManager(newError, newUrl);
    }

    async sendCreateUserRequest(user: {
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    }): Promise<string> {
        if (this.error === "") {
            return "";
        } else if(this.error === userNameTakenError) {
            return userNameTakenError;
        }  else {
            return "";
        }
    }
}