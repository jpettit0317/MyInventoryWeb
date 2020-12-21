export type FullName = {
    firstName: string,
    lastName: string
};

export type Passwords = {
    password: string,
    confirmedPassword: string
};

export type SignUpViewErrors = {
    usernameError: string,
    fullNameErrors: {firstNameError: string, lastNameError: string},
    passwordErrors: {passwordError: string, confirmedPasswordError: string}
    emailError: string,
};

export type SignUpViewModelProps = {
    username: string,
    passwords: Passwords,
    email: string,
    fullName: FullName
};

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

class SignUpPageViewModel extends SignUpViewModel {
    readonly emptyFieldErrors = {
        usernameError: "Username should be filled in.",
        passwordError: "Password should be filled in.",
        firstNameError: "First name should be filled in.",
        lastNameError: "Last name should be filled in.",
        confirmedPasswordError: "Confirm password should be filled in.",
        emailError: "Email should be filled in."
    };

    readonly confirmPasswordNoMatch = "Confirm password doesn't match password.";

    private constructor(props: SignUpViewModelProps = {
        username: "", passwords: { password: "", confirmedPassword: "" },
        email: "", fullName: { firstName: "", lastName: "" }
    }) {
        super(props);
    }

    static createViewModel(signUpProps: SignUpViewModelProps = {
        username: "", passwords: { password: "", confirmedPassword: "" },
        email: "", fullName: { firstName: "", lastName: "" }
    }): SignUpPageViewModel {
        return new SignUpPageViewModel(signUpProps);
    }

    static createEmptyViewModel(): SignUpPageViewModel {
        return new SignUpPageViewModel();
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
}

export default SignUpPageViewModel;