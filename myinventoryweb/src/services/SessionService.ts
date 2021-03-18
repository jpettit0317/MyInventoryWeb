import { Model } from "mongoose";
import { resolve } from "path";
import DeleteSessionControllerResult from "../enums/DeleteSessionControllerResult_enum";
import ISession from "../interfaces/modelinterfaces/ISession";
import Session from "../models/usermodels/Session";

class SessionService {
    private sessionDB: Model<ISession>;

    constructor(sessionDB: Model<ISession>) {
        this.sessionDB = sessionDB;
    }

    createSession(session: Session): Promise<{result: boolean, sessionId: string, expDate: Date}> {
        return new Promise(async (resolve, reject) => {
            await this.deleteAllSessionsForUser(session.user).then(async () => {
                await this.sessionDB.insertMany({
                    sessionId: session.sessionId,
                    user: session.user,
                    expirationDate: session.expirationDate.toISOString()
                }).then((result) => {
                    resolve({ result: true, sessionId: session.sessionId, expDate: session.expirationDate });
                }).catch((result: string) => {
                    console.log("Failed to save session " + result);
                    reject({ result: false, sessionId: "", expDate: new Date() });
                });
            }).catch((result: {result: boolean, reason: string}) => {
                console.log("Rejecting delete many because " + result.reason);
                reject({result: result.result, sessionId: "", expDate: new Date()});
            });
        });
    }

    deleteAllSessionsForUser(username: string): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            await this.sessionDB.deleteMany({user: username}).then(() => {
                resolve({result: true, reason: ""});
            }).catch((reasonForRejection: string) => {
                reject({result: false, reason: reasonForRejection});
            });
        });

    }

    getSession(sessionId: string): Promise<Session | null> {
        console.log("Getting session with " + sessionId);
        return new Promise(async (resolve, reject) => {
            await this.sessionDB.findOne({sessionId: sessionId}).then((iSession) => {
                if (iSession) {
                    console.log("Got session");
                    const session = this.createUserSession(iSession);
                    this.logSession(session);
                    resolve(session);
                } else {
                    console.log("Couldn't find sessionId: " + sessionId);
                    resolve(null);
                }
            }).catch((reasonForRejection: string) => {
                console.log("The reason for rejection is " + reasonForRejection);
                reject(null);
            })
        });
    }

    hasSessionExpired(sessionId: string, currentDate: Date): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.getSession(sessionId).then((session) => {
                if (session) {
                    resolve(session.hasExpired(currentDate));
                } else {
                    resolve(true);
                }
            }).catch((reasonForRejection) => {
                console.log("In has session expired " + reasonForRejection);
                reject(true);
            });
        });
    }

    deleteSessionWithId(id: string): Promise<{ result: boolean, reason: string }> {
        return new Promise(async (resolve, reject) => {
            await this.sessionDB.findOneAndDelete({sessionId: id }).then(() => {
                resolve({ result: true, reason: DeleteSessionControllerResult.deletedSession});
            }).catch((reasonForRejection: string) => {
                reject({ result: false, reason: reasonForRejection });
            });
        });
    }

    getUserWithId(id: string): Promise<{result: boolean, user: string}> {
        return new Promise(async (resolve, reject) => {
            await this.sessionDB.findOne({sessionId: id}).then((session) => {
                if (session) {
                    resolve({ result: true, user: session.user })
                } else {
                    resolve({result: false, user: ""});
                }
            }).catch((reason: string) => {
                reject({result: false, user: ""});
            });
        });
    }

    createUserSession(iSession: ISession): Session {
        return Session.createSessionFromISession(iSession);
    }

    logSession(session: Session) {
        console.log(`Id: ${session.sessionId}, User: ${session.user}, Exp Date: ${session.expirationDate}`);
    }
}

export default SessionService;