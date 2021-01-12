import SignUpNetworkCallManager from "../utils/SignUpNetworkCallManager";
import FullName from '../typeDefs/FullName';
import Passwords from '../typeDefs/Passwords';
import SignUpViewErrors from '../typeDefs/SignUpViewErrors';
import SignUpViewModelProps from '../typeDefs/SignUpViewModelProps';
export abstract class SignUpViewModel {
    private username: string;
    private fullname: FullName;
    private emailAddress: string;
    private passwords: Passwords;

    protected constructor(props: SignUpViewModelProps = {username: "", passwords: {password: "", confirmedPassword: ""},
          email: "", fullName: {firstName: "", lastName: ""}}) {
        this.username = props.username;
        this.fullname = props.fullName;
        this.emailAddress = props.email;
        this.passwords = props.passwords;
    }

    getUsername(): string { return this.username; }
    getPassword(): string { return this.passwords.password; }
    getConfirmedPassword(): string { return this.passwords.confirmedPassword; }
    getEmailAddress(): string { return this.emailAddress; }
    getFullName(): FullName { return this.fullname; }
    getFirstName(): string { return this.fullname.firstName; }
    getLastName(): string { return this.fullname.lastName; }
    getPasswords(): Passwords { return this.passwords; }

    setUsername(username: string = "") { this.username = username; }
    setPassword(password: string = "") { this.passwords.password = password; }
    setConfirmedPassword(confirmedPassword: string = "") { this.passwords.confirmedPassword = confirmedPassword; }
    setEmailAddress(emailAddress: string = "") { this.emailAddress = emailAddress; }
    setFirstName(firstName: string = "") { this.fullname.firstName = firstName; }
    setLastName(lastName: string = "") { this.fullname.lastName = lastName; }

    reportError(): SignUpViewErrors {
        return {
            usernameError: "",
            passwordErrors: {passwordError: "", confirmedPasswordError: ""},
            fullNameErrors: {firstNameError: "", lastNameError: ""},
            emailError: ""
        };
    }
}

export default class SignUpPageViewModel extends SignUpViewModel {
    readonly emptyFieldErrors = {
        usernameError: "Username should be filled in.",
        passwordError: "Password should be filled in.",
        firstNameError: "First name should be filled in.",
        lastNameError: "Last name should be filled in.",
        confirmedPasswordError: "Confirm password should be filled in.",
        emailError: "Email should be filled in."
    };

    readonly confirmPasswordNoMatch = "Confirm password doesn't match password.";

    readonly signUpNetworkCallManager: SignUpNetworkCallManager;

    private constructor(props: SignUpViewModelProps = {
        username: "", passwords: { password: "", confirmedPassword: "" },
        email: "", fullName: { firstName: "", lastName: "" }
    }, newNetworkCallManager: SignUpNetworkCallManager) {
        super(props);
        this.signUpNetworkCallManager = newNetworkCallManager;
    }

    static createViewModel(signUpProps: SignUpViewModelProps = {
        username: "", passwords: { password: "", confirmedPassword: "" },
        email: "", fullName: { firstName: "", lastName: "" }
    }, newNetworkCallManager: SignUpNetworkCallManager): SignUpPageViewModel {
        return new SignUpPageViewModel(signUpProps, newNetworkCallManager);
    }

    static createEmptyViewModel(newNetworkCallManager: SignUpNetworkCallManager): SignUpPageViewModel {
        const emptyProps = {
            username: "",
            passwords: {password: "", confirmedPassword: ""},
            email: "",
            fullName: {firstName: "", lastName: ""}
        };
        return new SignUpPageViewModel(emptyProps, newNetworkCallManager);
    }

    reportError(): SignUpViewErrors {
        var errors: SignUpViewErrors = {
            usernameError: "",
            passwordErrors: {passwordError: "", confirmedPasswordError: "" },
            fullNameErrors: {firstNameError: "", lastNameError: ""},
            emailError: ""
        };

        errors.usernameError = this.reportUsernameError();
        errors.passwordErrors.passwordError = this.reportPasswordError();
        errors.fullNameErrors.firstNameError = this.reportFirstNameError();
        errors.fullNameErrors.lastNameError = this.reportLastNameError();
        errors.passwordErrors.confirmedPasswordError = this.reportConfirmPasswordError();
        errors.emailError = this.reportEmailError();

        return errors;
    }

    private reportUsernameError(): string {
        return this.getUsername() === "" ? this.emptyFieldErrors.usernameError : "";
    }

    private reportPasswordError(): string {
        return this.getPassword() === "" ? this.emptyFieldErrors.passwordError : "";
    }

    private reportFirstNameError(): string {
        return this.getFirstName() === "" ? this.emptyFieldErrors.firstNameError : "";
    }

    private reportLastNameError(): string {
        return this.getLastName() === "" ? this.emptyFieldErrors.lastNameError : "";
    }

    private reportConfirmPasswordError(): string {
        if (this.getPassword() !== this.getConfirmedPassword() 
           && this.getPassword() !== "" && this.getConfirmedPassword() !== "") {
            return this.confirmPasswordNoMatch;
        } else if (this.getConfirmedPassword() === "") {
            return this.emptyFieldErrors.confirmedPasswordError;
        } else {
            return "";
        }
    }

    private reportEmailError(): string {
        return this.getEmailAddress() === "" ? this.emptyFieldErrors.emailError : "";
    }

    sendCreateUserInfo(): Promise<string> {
        const user = {
            username: this.getUsername(),
            password: this.getPassword(),
            email: this.getEmailAddress(),
            firstName: this.getFirstName(),
            lastName: this.getLastName()
        };
        
        return this.signUpNetworkCallManager.sendCreateUserRequest(user);
    }

    getUserInfo() : {username: string, password: string, email: string, firstName: string, lastName: string} {
        return {
            username: this.getUsername(),
            password: this.getPassword(),
            email: this.getEmailAddress(),
            firstName: this.getFirstName(),
            lastName: this.getLastName()
        };
    }

    areThereErrors(errors: SignUpViewErrors) : boolean {
        return errors.emailError !== "" 
           && errors.usernameError !== "" 
           && errors.fullNameErrors.firstNameError !== "" 
           && errors.fullNameErrors.lastNameError !== "" 
           && errors.passwordErrors.confirmedPasswordError !== "" 
           && errors.passwordErrors.passwordError !== "";
    }
}