import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import axios from "axios";
import FullApiURL from "../enums/FullApiURL_enum";
import { removeDoubleQuotesFromString } from "./StringUtil";
import AddItemResult from "../enums/AddItemResult_enum";

class AddItemNetworkCallManager {
    private addItemUrl: string;

    private constructor(addItemUrl: string = "") {
        this.addItemUrl = addItemUrl;
    }

    static createNetworkCallManager(url: string = ""): AddItemNetworkCallManager {
        return new AddItemNetworkCallManager(url);
    }

    async addItem(item: MyInventoryItem) : Promise<string> {
        return new Promise( async (resolve, reject) => {
            const res = await axios.post(this.addItemUrl, item);
            const stringified = JSON.stringify(res.data);
            const resultMessage = removeDoubleQuotesFromString(stringified);

            if (resultMessage === AddItemResult.success) {
                resolve("");
            } else {
                reject(resultMessage);
            }
        });
    }
};

export default AddItemNetworkCallManager;