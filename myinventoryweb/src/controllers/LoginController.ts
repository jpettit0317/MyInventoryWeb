import UserPasswordInfo from "../interfaces/modelinterfaces/UserPasswordInfo";
import PasswordService from "../services/PasswordService";
import SessionService from "../services/SessionService";
import Session from "../models/usermodels/Session";
import { stringify } from "uuid";
class LoginController {
    private providedUserLogin: UserPasswordInfo;
    private passwordDB: PasswordService;
    private sessionDB: SessionService

    private constructor(userLogin: UserPasswordInfo, passwordDB: PasswordService, sessionDB: SessionService) {
        this.providedUserLogin = userLogin;
        this.passwordDB = passwordDB;
        this.sessionDB = sessionDB;
    }

    static createLoginController(userLogin: UserPasswordInfo = {username: "", password: ""}, passwordDB: PasswordService, sessionDB: SessionService): LoginController {
        return new LoginController(userLogin, passwordDB, sessionDB);
    }

    getUsername(): string { return this.providedUserLogin.username; }
    getPassword(): string { return this.providedUserLogin.password; }

    verifyUserLogin(): Promise<{result: boolean, reason: string}> {
        return new Promise( async (resolve, reject) => {
            await this.passwordDB.validateUserLogin(this.providedUserLogin).then( async result => {
                if (result.result) {
                    const nextDay = this.getExpirationDate(new Date());
                    const session = new Session(undefined, this.providedUserLogin.username, nextDay);

                    await this.sessionDB.createSession(session).then((result: {result: Boolean, sessionId: string, expDate: Date}) => {
                        resolve({result: true, reason: result.sessionId});
                    }).catch((reasonForRejection: string) => {
                        reject({result: false, reason: reasonForRejection});
                    });
                } else {
                    resolve(result);
                }
            }).catch(() => {
                reject("Rejected");
            });
        });
    }

    private getExpirationDate(date: Date): Date {
        let newDate = date;
        newDate.setDate(newDate.getDate() + 1);

        return newDate;
    }
};

export default LoginController;
