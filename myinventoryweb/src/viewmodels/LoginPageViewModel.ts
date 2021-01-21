import UserPasswordInfo from "../interfaces/modelinterfaces/UserPasswordInfo";
import LoginNetworkCallManager from "../utils/LoginNetworkCallManager";

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
    private loginNetworkCallManager: LoginNetworkCallManager;

    constructor(password: string = "", username: string = "", loginNetworkCallManager: LoginNetworkCallManager) {
        super(username, password);
        this.loginNetworkCallManager = loginNetworkCallManager;
    }

    static createLoginPageViewModel(username: string =
        "", password: string = "", loginNetworkCallManager: LoginNetworkCallManager): LoginPageViewModel {
        return new LoginPageViewModel(password, username, loginNetworkCallManager);
    }

    public reportError(): {usernameError: string, passwordError: string} {
        let userNameError: string = "";
        let passwordError: string = "";
        if (this.getUsername() === "") {
            userNameError = this.emptyUsernameError;
        } 
        if (this.getPassword() === "") {
            passwordError = this.emptyPasswordError
        }
        return {usernameError: userNameError, passwordError: passwordError};
    }

    private getUserLoginInfo(): UserPasswordInfo {
        const info: UserPasswordInfo = {
            username: this.getUsername(),
            password: this.getPassword()
        };

        return info;
    }
}

export default LoginPageViewModel;