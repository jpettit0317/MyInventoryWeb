import UserPasswordInfo from "../interfaces/modelinterfaces/UserPasswordInfo";
import PasswordService from "../services/PasswordService";

class LoginController {
    private providedUserLogin: UserPasswordInfo;
    private passwordDB: PasswordService;

    private constructor(userLogin: UserPasswordInfo, passwordDB: PasswordService) {
        this.providedUserLogin = userLogin;
        this.passwordDB = passwordDB;
    }

    static createLoginController(userLogin: UserPasswordInfo = {username: "", password: ""}, passwordDB: PasswordService): LoginController {
        return new LoginController(userLogin, passwordDB);
    }

    getUsername(): string { return this.providedUserLogin.username; }
    getPassword(): string { return this.providedUserLogin.password; }

    verifyUserLogin(): Promise<string> {
        return new Promise( async (resolve, reject) => {
            await this.passwordDB.validateUserLogin(this.providedUserLogin).then( result => {
                if (result.result) {
                    resolve("");
                } else {
                    resolve(result.reason);
                }
            }).catch(() => {
                reject("Rejected");
            });
        });
    }
};

export default LoginController;
