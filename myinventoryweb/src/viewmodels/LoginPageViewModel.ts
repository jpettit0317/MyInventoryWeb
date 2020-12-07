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

    private constructor(password: string = "", username: string = "") {
        super(username, password);
    }

    static createLoginPageViewModel(username: string =
        "", password: string = ""): LoginPageViewModel {
        return new LoginPageViewModel(password, username);
    }

    public reportError(): {usernameError: string, passwordError: string} {
        if (this.getUsername() === "") {
            return {usernameError: this.emptyUsernameError, passwordError: ""};
        } else if (this.getPassword() === "") {
            return {usernameError: "", passwordError: this.emptyPasswordError};
        }
        return {usernameError: "", passwordError: ""};
    }
}

export default LoginPageViewModel;