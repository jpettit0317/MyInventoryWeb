import { Model } from "mongoose";
import UserSignUpInfo from "../interfaces/modelinterfaces/UserSignUpInfo";
import IUserInfo from "../interfaces/modelinterfaces/UserInfo";
import { v4 as uuidv4 } from 'uuid';
import { rejects } from "assert";
import CreateUserResult from "../enums/CreateUserResult_enum";

export class UserService {
    private userDB: Model<IUserInfo>
    readonly usernameExistsMessage: string = "Username exists";

    protected constructor(newUserDB: Model<IUserInfo>) {
        this.userDB = newUserDB;
    }

    static createUserService(newUserDB: Model<IUserInfo>): UserService {
        return new UserService(newUserDB);
    }

    async doesUserExist(username: string) : Promise<{result: boolean, message: string}> {
        let doesUserNameExist: boolean = false;
        let resultMessage: string = "";

        await this.getUsername(username)
           .then( (result) => {
               if (result === this.usernameExistsMessage) {
                   doesUserNameExist = true;
                   resultMessage = CreateUserResult.usernameExists;
               }            
            })
           .catch( (error) => {
               const errorMessage = String(error).replace(/"/g, "");
               doesUserNameExist = true;
               resultMessage = errorMessage;
        });

        return new Promise((resolve) => {
            resolve({result: doesUserNameExist, message: resultMessage});
        });
    }

    private async getUsername(usernameToFind: string): Promise<string> {
        const userName = await this.userDB.findOne( {username: usernameToFind}, null, null, (error) => {
            if (error) {
                return new Promise((resolve, reject)=> {
                    console.log("In error " + String(error));
                    reject(error);
                });
            }
        });

        return new Promise((resolve, reject) => {
            if (userName) {
                resolve(this.usernameExistsMessage);
            } else {
                resolve("");
            }
        });
    }
    
    async createUser(userInfoProvided: UserSignUpInfo): Promise<{result: {username: string, password: string}
       , message: string}> {
        let userSaveResult = {
            result: {username: "", password: ""},
            message: ""
        };

        await this.saveUserToUserDatabase(userInfoProvided).then( (result) => {
            if (result.userInfo === null) {
                console.log("Username " + userInfoProvided.username + " exists");
                userSaveResult.message = result.message;
            } else {
                userSaveResult.result = {username: result.userInfo.username, password: result.userInfo.password};
            }
        }).catch( (rejectionReason) => {
            const rejectionMessage = String(rejectionReason);
            userSaveResult.message = rejectionMessage;
        });

        return new Promise((resolve) => {
            resolve(userSaveResult);
        });
    }

    private async saveUserToUserDatabase(userInfoToSave: UserSignUpInfo): Promise<{userInfo: UserSignUpInfo | null, message: string}> {
        let userSignUpInfo: UserSignUpInfo | null = null;
        let message: string = "";

        await this.doesUserExist(userInfoToSave.username).then( async (userExistResult) => {
            if (userExistResult.result) {
               userSignUpInfo = null;
               message = userExistResult.message;
            } else {
                await this.saveUser(userInfoToSave).then((userInfoWithId) => {
                    if (userInfoWithId.userInfo !== null) {
                        userSignUpInfo = userInfoWithId.userInfo;
                        message = userInfoWithId.message;
                    } else if (userInfoWithId.message !== "") {
                        message = userInfoWithId.message;
                        userSignUpInfo = null; 
                    }
                }).catch((reason) => {
                    const rejectionReasonMessage: string = String(reason);
                    message = rejectionReasonMessage;
                    userSignUpInfo = null;
                });
            }
        }).catch( (reasonForRejection) => {
            const rejectionMessage = String(reasonForRejection);
            message = rejectionMessage;
            userSignUpInfo = null;
        });

        return new Promise( (resolve) => {
            resolve({userInfo: userSignUpInfo, message: message});
        });
    }

    private async saveUser(userInfo: UserSignUpInfo): Promise<{userInfo: UserSignUpInfo | null, message: string}> {
        const newUserId = uuidv4();

        return new Promise((resolve) => {
            this.userDB.insertMany([
                {
                    email: userInfo.email,
                    username: userInfo.username,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    userId: newUserId
                }
            ]).then(function () {
                let userInfoWithId: UserSignUpInfo = {
                    email: userInfo.email,
                    username: userInfo.username,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    password: userInfo.password,
                    userId: newUserId
                };
                resolve({userInfo: userInfoWithId, message: ""});
            }).catch(function (error) {
                const message = String(error).replace(/"/g, "");
                resolve({userInfo: null, message: message});
            });
        });
    }
}

