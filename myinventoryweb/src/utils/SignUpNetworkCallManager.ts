import NetworkCallManager from "../interfaces/modelinterfaces/NetworkCallManager";
import axios from "axios";
import FullName from "../viewmodels/SignUpPageViewModel";
import { removeDoubleQuotesFromString } from "./StringUtil";

class SignUpNetworkCallManager extends NetworkCallManager {
    protected constructor(newUrlString: string = "") {
        super(newUrlString);
    }
    
    static createNetworkManager(newUrlString: string = ""): SignUpNetworkCallManager {
        return new SignUpNetworkCallManager(newUrlString);
    }

    async sendCreateUserRequest(user: {username: string, password: string, 
        email: string, firstName: string, lastName: string}): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await axios.post(this.urlString, user).then(response => {
                const result: {result: boolean, message: string} = JSON.parse(JSON.stringify(response.data));

                if (result.result) {
                    resolve(result.message);
                } else {
                    reject(result.message);
                }
            });
        });
    }
}

export default SignUpNetworkCallManager;