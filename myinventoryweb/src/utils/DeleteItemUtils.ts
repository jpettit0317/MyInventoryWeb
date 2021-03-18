import axios from "axios";
import FullApiURL from "../enums/FullApiURL_enum";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { removeDoubleQuotesFromString } from "./StringUtil";

export default async function deleteItemFromDB(url: FullApiURL , item: MyInventoryItem, sessionId: string): Promise<string> {
    const itemTuple: {item: MyInventoryItem, sessionId: string} = {item: item, sessionId: sessionId};

    return new Promise( async (resolve, reject) => {
        await axios.post(url, itemTuple).then((resp) => {
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