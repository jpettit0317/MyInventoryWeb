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
        const res = await axios.post(this.urlString, user);
        const resultMessage = removeDoubleQuotesFromString(JSON.stringify(res.data));
        return new Promise((resolve, reject) => {
            if (resultMessage === "") {
                resolve("");
            } else {
                reject(resultMessage);
            }
        });
    }
}

export default SignUpNetworkCallManager;