abstract class LoginViewModel {
    private password: string;
    private username: string;
    protected constructor(username: string, password: string) {
        this.password = password;
        this.username = username;
    }
    getPassword(): string { return this.password; };
    setPassword(password: string): void { this.password = password; };
    setUsername(username: string): void { this.username = username; };
    getUsername(): string { return this.username; };
    public abstract reportError(): {usernameError: string, passwordError: string};
};

class LoginPageViewModel extends LoginViewModel {
    readonly emptyUsernameError = "Username should be filled in.";
    readonly emptyPasswordError = "Password should be filled in.";

    constructor(password: string = "", username: string = "") {
        super(username, password);
    }

    static createLoginPageViewModel(username: string =
        "", password: string = ""): LoginPageViewModel {
        return new LoginPageViewModel(password, username);
    }

    public reportError(): {usernameError: string, passwordError: string} {
        let userNameError: string = "";
        let passwordError: string = "";
        console.log("In report error the password is " + this.getPassword());
        if (this.getUsername() === "") {
            userNameError = this.emptyUsernameError;
        } 
        if (this.getPassword() === "") {
            console.log("Changing password error.");
            passwordError = this.emptyPasswordError
        }
        console.log("From view model: username: " + userNameError);
        console.log("Password error: " + passwordError);
        return {usernameError: userNameError, passwordError: passwordError};
    }
}

export default LoginPageViewModel;