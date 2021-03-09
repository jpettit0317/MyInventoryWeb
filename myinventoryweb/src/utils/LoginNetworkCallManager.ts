import axios from "axios";
import NetworkCallManager from "../interfaces/modelinterfaces/NetworkCallManager";
import UserPasswordInfo from "../interfaces/modelinterfaces/UserPasswordInfo";

class LoginNetworkCallManager extends NetworkCallManager {
    protected constructor(newUrl: string = "") {
        super(newUrl);
    }

    static createLoginNetworkCallManager(newUrl: string = ""): LoginNetworkCallManager {
        return new LoginNetworkCallManager(newUrl);
    }

    async sendVerifyUserRequest(loginInfo: UserPasswordInfo): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            await axios.post(this.urlString, loginInfo).then( (value) => {
                const result: {result: boolean, reason: string} = JSON.parse(JSON.stringify(value.data));
                console.log(`In loginnetworkcallmanager ${result.result}, ${result.reason}`);
                resolve(result);
            }).catch((reason) => {
                console.log("The reason for failure is " + String(reason));
                reject({result: false, reason: String(reason)});
            });
        });
    }
};

export default LoginNetworkCallManager;