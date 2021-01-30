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

    async sendVerifyUserRequest(loginInfo: UserPasswordInfo): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await axios.post(this.urlString, loginInfo).then( (value) => {
                const resultMessage = JSON.stringify(value.data).replace(/"/g, "");
                if (resultMessage !== "") {
                    reject(resultMessage);
                } else {
                    resolve("");
                }
            }).catch((reason) => {
                console.log("The reason for failure is " + String(reason));
            });
        });
    }
};

export default LoginNetworkCallManager;