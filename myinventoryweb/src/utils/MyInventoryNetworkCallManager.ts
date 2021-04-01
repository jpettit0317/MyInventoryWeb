import axios from "axios";
import ApiURL from "../enums/ApiURL_enum";
import DeleteSessionControllerResult from "../enums/DeleteSessionControllerResult_enum";
import FullApiURL from "../enums/FullApiURL_enum";
import { removeDoubleQuotesFromString } from "./StringUtil";

class MyInventoryNetworkCallManager {

    static getItemsForUser(user: string, pageNumberToLoad: number = 1): Promise<{items: string, totalPages: number}> {
        return new Promise ( async (resolve, reject) => {
            const url = MyInventoryNetworkCallManager.getItemUrl(user, pageNumberToLoad);
            await axios.get(url).then((data) => {
                const result: { data: string, totalPages: number } = JSON.parse(JSON.stringify(data.data));
                console.log(`Items: ${result.data}, Total pages: ${result.totalPages}`);
                resolve({items: result.data, totalPages: result.totalPages});
            }).catch((rejectionReason) => {
                console.log("Failed to get data " + rejectionReason);
                reject({items: "", totalPages: 0});
            });
        });
    }

    static checkForValidCookie(sessionId: string): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            const sessionUrl = this.getSessionUrl(sessionId);

            await axios.get(sessionUrl).then((data) => {
                const dataAsJson = removeDoubleQuotesFromString(JSON.stringify(data.data));

                if (dataAsJson === "Session Expired") {
                    reject({result: false, reason: "Session Expired"});
                } else {
                    resolve({result: true, reason: ""});
                }
            }).catch((reasonForRejection: string) => {
                reject({result: false, reason: reasonForRejection});
            });
        });
    }

    static deleteSession(sessionId: string): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            const sessionIdTuple: {sessionId: string} = {sessionId: sessionId};

            console.log("Deleting sessionId: " + sessionIdTuple.sessionId);
            await axios.post(FullApiURL.deleteSession, sessionIdTuple).then((data) => {
                const dataAsJson = removeDoubleQuotesFromString(JSON.stringify(data.data));

                if (dataAsJson === DeleteSessionControllerResult.deletedSession) {
                    resolve({result: true, reason: ""});
                } else {
                    reject({result: false, reason: dataAsJson});
                }
            }).catch((reasonForRejection: string) => {
                reject({result: false, reason: reasonForRejection});
            });
        });
    }

    private static getItemUrl(user: string, pageNumberToLoad: number): string {
        return `http://localhost:4000/api/getItems/${user}/${pageNumberToLoad}`;
    }

    private static getSessionUrl(sessionId: string): string {
        return `http://localhost:4000/api/getExpirationDate/${sessionId}`;
    }
}

export default MyInventoryNetworkCallManager;