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

    async validateUserLogin(): Promise<string> {
        console.log("Validting user");
        const providedLogin = this.getUserLoginInfo();
        console.log(`Changed login uname: ${providedLogin.username}, p: ${providedLogin.password}`);
        return new Promise(async (resolve, reject) => {
            console.log("Calling sendVerify");
            await this.loginNetworkCallManager.sendVerifyUserRequest(providedLogin).then(() => {
                console.log("Resolving");
                resolve("");
            }).catch((reason: string) => {
                console.log("Rejecting");
                reject(reason);
            });
        });
    }
}

export default LoginPageViewModel;