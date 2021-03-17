import Session from "../models/usermodels/Session";
import SessionService from "../services/SessionService";

class SessionExpiredController {
    private sessionDB: SessionService;

    constructor(sessionDB: SessionService) {
        this.sessionDB = sessionDB;
    }

    async hasSessionExpired(sessionId: string): Promise<boolean> {
        const accessDate = new Date();
        return new Promise(async (resolve, reject) => {
            await this.sessionDB.getSession(sessionId).then((result) => {
                if (result === null) {
                    reject(true);
                } else {
                    console.log("Access date is " + accessDate.toISOString());
                    const hasSessionExpired = result.hasExpired(accessDate);
                    console.log("The result of hasSessionExpired is " + hasSessionExpired);
                    resolve(hasSessionExpired);
                }
            }).catch(() => {
                reject(true);
            });
        });
    }
};

export default SessionExpiredController;