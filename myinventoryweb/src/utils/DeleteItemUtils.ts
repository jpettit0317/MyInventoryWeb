import axios from "axios";
import FullApiURL from "../enums/FullApiURL_enum";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { removeDoubleQuotesFromString } from "./StringUtil";

export default async function deleteItemFromDB(url: FullApiURL , item: MyInventoryItem): Promise<string> {
    return new Promise( async (resolve, reject) => {
        await axios.post(url, item).then((resp) => {
            const val = removeDoubleQuotesFromString(resp.data);

            if (val === "") {
                resolve("");
            } else {
                reject(val);
            }
        }).catch((reason: string) => {
            reject(reason);
        });
    });
}