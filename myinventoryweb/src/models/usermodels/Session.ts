import { v4 as uuidv4 } from 'uuid';
import ISession from '../../interfaces/modelinterfaces/ISession';

class Session {
    readonly sessionId: string;
    readonly user: string;
    readonly expirationDate: Date;

    constructor(sessionId: string = uuidv4(), user: string = "", expirationDate = new Date()) {
        this.sessionId = sessionId;
        this.user = user;
        this.expirationDate = expirationDate;
    }

    static createSessionFromISession(iSession: ISession): Session {
        const date = new Date(iSession.expirationDate);

        return new Session(iSession.sessionId, iSession.user, date);
    }

    hasExpired(accessDate: Date): boolean {
        console.log("Expiration date " + this.expirationDate.toUTCString());
        console.log("Access date is " + accessDate.toUTCString());
        return this.expirationDate < accessDate;
    }
}

export default Session;