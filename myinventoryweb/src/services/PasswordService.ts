import UserPasswordInfo from "../interfaces/modelinterfaces/UserPasswordInfo";
import IPasswordInfo from "../interfaces/modelinterfaces/IPasswordInfo";
import { Model } from "mongoose";
import UserPasswordDBInfo from "../interfaces/modelinterfaces/UserPasswordDBInfo";
import bcrypt from "bcrypt";

class PasswordService {
    private passwordDB: Model<IPasswordInfo>;
    readonly saltRounds: number;

    private constructor(newPasswordDB: Model<IPasswordInfo>, numberOfSaltRounds: number = 10) {
        this.passwordDB = newPasswordDB;
        this.saltRounds = numberOfSaltRounds;
    }

    static createPasswordService(newPasswordDB: Model<IPasswordInfo>, numberOfSaltRounds: number = 10): PasswordService {
        return new PasswordService(newPasswordDB, numberOfSaltRounds);
    }

    async createUserPasswordEntry(userPasswordInfo: UserPasswordInfo): Promise<{result: boolean, message: string}> {
        return new Promise( (resolve, reject) => {
            this.getUserPasswordInfo(userPasswordInfo.username).then( async (value) => {
                if (value.info !== null) {
                    reject({result: false, message: value.reason});
                } else {
                    await this.createHashedPassword(userPasswordInfo.password).then( async (result) => {
                        const hashedPasswordWithSalt = {
                            hashedPassword: result.hashedPasswordWithSalt.hashedPassword,
                            salt: result.hashedPasswordWithSalt.salt
                        };
                        await this.passwordDB.insertMany({
                            username: userPasswordInfo.username, 
                            salt: hashedPasswordWithSalt.salt, 
                            password: hashedPasswordWithSalt.hashedPassword}).then((value: IPasswordInfo) => {
                                resolve({ result: true, message: ""});
                            }).catch((reason: string) => {
                                reject({result: false, message: reason});
                            })
                    }).catch((reason: string) => {
                        reject({result: false, message: reason});
                    });
                }
            });
        });
    }

    async getUserPasswordInfo(usernameToFind: string): Promise<{info: UserPasswordDBInfo | null, reason: string}> {
       return new Promise( async (resolve) => {
           await this.passwordDB.findOne({username: usernameToFind}).then((passwordInfo) => {
               if (passwordInfo !== null) {
                   const dbPasswordInfo: UserPasswordDBInfo = {
                       username: passwordInfo.username,
                       password: passwordInfo.password,
                       salt: passwordInfo.salt
                   };
                   resolve({info: dbPasswordInfo, reason: "User exists"});
               } else {
                   console.log(`Username: ${usernameToFind} doesn't exist`);
                   resolve({info: null, reason: "User doesn't exist"});
               }
           }).catch((reasonForRejection: string) => {
               resolve({info: null, reason: reasonForRejection});
           });
       });
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await bcrypt.hash(password, this.saltRounds, (error: Error, encryptedResult: string) => {
                if (error) {
                    console.log("Failed to hash password"); 
                    reject(""); 
                }
                resolve(encryptedResult);
            })
        });
    }

    private async createHashedPassword(password: string): Promise<{hashedPasswordWithSalt: {hashedPassword: string, salt: string},
     reasonForRejection: string}> {
        const emptyHashedPasswordWithSalt = {hashedPassword: "", salt: ""};
        return new Promise( async (resolve, reject) => {
            await bcrypt.genSalt(this.saltRounds, async (error: Error, salt: string) => {
                if (error) {
                    reject({hashedPasswordWithSalt: emptyHashedPasswordWithSalt, reasonForRejection: String(error)});
                }
                await bcrypt.hash(password, salt, (error: Error, encrypted: string) => {
                    if (error) { reject({hashedPasswordWithSalt: emptyHashedPasswordWithSalt, reasonForRejection: String(error)}) }
                    resolve({hashedPasswordWithSalt: {hashedPassword: encrypted, salt: ""}, reasonForRejection: ""});
                });
            })
        });
    }

    private async doPasswordsMatch(providedPassword: string, passwordStored: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await bcrypt.compare(providedPassword, passwordStored, (error: Error, same: boolean) => {
                if (error) {
                    console.log("Failed to compare password");
                    reject(false); 
                }
                if (same) {
                    resolve(same);
                } else {
                    resolve(same);
                }
            })
        });
    }

    async validateUserLogin(userPassedIn: UserPasswordInfo): Promise<{result: boolean, reason: string}> {
        return new Promise( async (resolve, reject) => {
            await this.getUserPasswordInfo(userPassedIn.username).then( async (result) => {
                if (result.info !== null) {
                    const storedPassword = result.info.password;
                    await this.doPasswordsMatch(userPassedIn.password, storedPassword).then((passwordMatchResult) => {
                        if (passwordMatchResult) {
                            resolve({result: true, reason: ""});
                        } else {
                            resolve({result: false, reason: "Passwords don't match"});
                        }
                    })
                } else {
                    resolve({result: false, reason: "User doesn't exist"});
                }
            })
        });
    }
};

export default PasswordService;