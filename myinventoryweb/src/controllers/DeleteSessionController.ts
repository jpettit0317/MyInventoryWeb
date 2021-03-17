import SessionService from "../services/SessionService";

class DeleteSessionController {
    private sessionDB: SessionService;

    constructor(sessionDB: SessionService) {
        this.sessionDB = sessionDB;
    }

    deleteSessionWithId(sessionId: string): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            this.sessionDB.deleteSessionWithId(sessionId).then((result) => {
                if (result.result) {
                    resolve(result);
                } else {
                    reject(result);
                }
            }).catch((reasonForRejection: {result: boolean, reason: string}) => {
                reject(reasonForRejection);
            });
        });
    }
};

export default DeleteSessionController;