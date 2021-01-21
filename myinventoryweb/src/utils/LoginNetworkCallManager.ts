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

    async sendVerifyUserRequest(loginInfo: UserPasswordInfo): Promise<{result: boolean, message: string}> {
        return new Promise(async (resolve, reject) => {
            const res = await axios.post(this.urlString, loginInfo);
            const resultMessage: {result: boolean, message: string} = JSON.parse(String(res.data));

            if (resultMessage.result) {
                resolve({result: true, message: ""});
            } else {
                reject({result: resultMessage.result, message: resultMessage.message});
            }
        });
    }
};

export default LoginNetworkCallManager;