import UserSignUpInfo from "../interfaces/modelinterfaces/UserSignUpInfo";
import SignUpControllerProps from "../props/SignUpControllerProps";
import { Model } from "mongoose";
import { UserService } from "../services/UserService";
import PasswordService from "../services/PasswordService";
import Session from "../models/usermodels/Session";
import SessionService from "../services/SessionService";
class SignUpController {
    readonly userSignUpInfo: UserSignUpInfo;
    private userService: UserService;
    private passwordService: PasswordService;
    private sessionService: SessionService;

    private constructor(props: SignUpControllerProps, userService: UserService, passwordService: PasswordService, sessionService: SessionService) {
        this.userSignUpInfo = {
            email: props.email,
            username: props.username,
            password: props.password,
            firstName: props.fullName.firstName,
            lastName: props.fullName.lastName,
            userId: ""
        };
        this.userService = userService;
        this.passwordService = passwordService;
        this.sessionService = sessionService;
    }

    static createSignUpController(props: SignUpControllerProps, userService: UserService, passwordService: PasswordService, sessionService: SessionService): SignUpController {
        return new SignUpController(props, userService, passwordService, sessionService);
    }

    async createUser(userSignUpInfo: UserSignUpInfo): Promise<{result: boolean, message: string}> {
        return new Promise( async (resolve, reject) => {
            await this.userService.createUser(userSignUpInfo).then(async (result) => {
                if (result.message === "") {
                    console.log("Created user named " + userSignUpInfo.username);
                    await this.passwordService.createUserPasswordEntry(userSignUpInfo).then(async (result) => {
                        console.log("Succesfully created password entry for user: " + userSignUpInfo.username);
                        await this.createSession(userSignUpInfo).then((sessionId) => {
                            resolve({result: result.result, message: sessionId});
                        }).catch((reasonForRejection: string) => {
                            reject({result: false, message: reasonForRejection});
                        });
                    }).catch((rejectReason: {result: boolean, message: string}) => {
                        console.log("Failed to create password entry for user: " + userSignUpInfo.username);
                        reject({result: false, message: rejectReason.message});
                    });
                } else {
                    console.log("Failed to create user because " + result.message);
                    reject({result: false, message: result.message});
                }
            }).catch((reason: {result: boolean, message: string}) => {
                console.log("Failed to create user named "
                + userSignUpInfo.username);
                reject({result: false, message: reason.message});
            });
        });
    }

    async createSession(userSignUpInfo: UserSignUpInfo): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const expirationDate = this.getExpirationDate(new Date());
            const session = new Session(undefined, userSignUpInfo.username, expirationDate);
            this.sessionService.createSession(session).then((result) => {
                console.log(`Id: ${result.sessionId}, Result: ${result.result}, Expiration Date: ${result.expDate.toISOString()}`);
                resolve(result.sessionId);
            }).catch((reasonForRejection: string) => {
                console.log("Rejecting in createSession");
                reject(reasonForRejection);
            });
        });
    }

    private getExpirationDate(date: Date): Date {
        let newDate = date;
        newDate.setDate(newDate.getDate() + 1);
        
        return newDate;
    }
}

export default SignUpController;