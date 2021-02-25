import axios from "axios";
import FullApiURL from "../enums/FullApiURL_enum";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { removeDoubleQuotesFromString } from "./StringUtil";

export default function editItem(url: FullApiURL, updatedItem: MyInventoryItem): Promise<string> {
    return new Promise(async (resolve, reject) => {
        await axios.put(url, updatedItem).then(value => {
            const result = removeDoubleQuotesFromString(JSON.stringify(value.data));

            console.log("The result from backend is " + result);

            if (result === "") {
                resolve("");
            } else {
                reject(result);
            }
        }).catch((reasonForRejection: string) => {
            reject(reasonForRejection);
        });
    });
}