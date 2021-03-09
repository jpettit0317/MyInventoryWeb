import { v4 as uuidv4 } from 'uuid';

class Session {
    readonly sessionId: string;
    readonly user: string;
    readonly expirationDate: Date;

    constructor(sessionId: string = uuidv4(), user: string = "", expirationDate = new Date()) {
        this.sessionId = sessionId;
        this.user = user;
        this.expirationDate = expirationDate;
    }
}

export default Session;