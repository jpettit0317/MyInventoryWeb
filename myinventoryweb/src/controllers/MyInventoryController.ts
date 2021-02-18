import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import ItemService from "../services/ItemService";

class MyInventoryController {
    private itemDB: ItemService;

    constructor(newItemDB: ItemService) {
        this.itemDB = newItemDB;
    }

    getItems(owner: string): Promise<string> {
        return new Promise( async (resolve, reject) => {
            await this.itemDB.getItemByOwner(owner).then((result) => {
                resolve(JSON.stringify(result));
            }).catch(reasonForRejection => {
                console.log("Return an empty array");
                reject("");
            });
        });
    }
}

export default MyInventoryController;