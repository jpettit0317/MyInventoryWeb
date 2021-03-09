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
            await this.sessionDB.insertMany({
                sessionId: session.sessionId,
                user: session.user,
                expirationDate: session.expirationDate.toISOString()
            }).then((result) => {
                resolve({result: true, sessionId: session.sessionId, expDate: session.expirationDate});
            }).catch((result: string) => {
                console.log("Failed to save session " + result);
                reject({result: false, sessionId: "", expDate: new Date()});
            });
        });
    }
}

export default SessionService;