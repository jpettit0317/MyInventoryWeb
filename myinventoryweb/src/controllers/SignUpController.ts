import UserSignUpInfo from "../interfaces/modelinterfaces/UserSignUpInfo";
import SignUpControllerProps from "../props/SignUpControllerProps";
import { Model } from "mongoose";
import { UserService } from "../services/UserService";
import PasswordService from "../services/PasswordService";
class SignUpController {
    readonly userSignUpInfo: UserSignUpInfo;
    private userService: UserService;
    private passwordService: PasswordService;

    private constructor(props: SignUpControllerProps, userService: UserService, passwordService: PasswordService) {
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
    }

    static createSignUpController(props: SignUpControllerProps, userService: UserService, passwordService: PasswordService): SignUpController {
        return new SignUpController(props, userService, passwordService);
    }

    async createUser(userSignUpInfo: UserSignUpInfo): Promise<{result: boolean, message: string}> {
        return new Promise( async (resolve, reject) => {
            await this.userService.createUser(userSignUpInfo).then(async (result) => {
                if (result.message === "") {
                    console.log("Created user named " + userSignUpInfo.username);
                    await this.passwordService.createUserPasswordEntry(userSignUpInfo).then((result) => {
                        console.log("Succesfully created password entry for user: " + userSignUpInfo.username);
                        resolve({result: result.result, message: result.message});
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
}

export default SignUpController;