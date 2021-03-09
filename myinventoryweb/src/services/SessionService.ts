import { Model } from "mongoose";
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
}

export default SessionService;