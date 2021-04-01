import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import ItemService from "../services/ItemService";

class MyInventoryController {
    private itemDB: ItemService;

    constructor(newItemDB: ItemService) {
        this.itemDB = newItemDB;
    }

    getItems(owner: string, pageToLoad: number): Promise<{data: string, totalPages: number}> {
        return new Promise( async (resolve, reject) => {
            await this.itemDB.getItemByOwner(owner, pageToLoad).then((result) => {
                resolve({data: JSON.stringify(result.items), totalPages: result.totalPages});
            }).catch(reasonForRejection => {
                console.log("Return an empty array");
                reject({data: "", totalPages: 0});
            });
        });
    }
}

export default MyInventoryController;