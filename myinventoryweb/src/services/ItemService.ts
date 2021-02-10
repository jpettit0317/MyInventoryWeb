import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";

class ItemService {
    private itemDB: Model<IItem>;
    readonly emptyItemErrorMessage = "Item has an empty required field";

    constructor(newItemDB: Model<IItem>) {
        this.itemDB = newItemDB;
    }

    async addItem(item: MyInventoryItem): Promise<string> {
        return new Promise( (resolve, reject) => {
            if (this.isItemInvalid(item)) { resolve(this.emptyItemErrorMessage) };
            this.itemDB.insertMany([
                {
                    itemId: item.itemId,
                    title: item.title,
                    owner: item.owner,
                    type: item.type,
                    count: item.count.count,
                    countUnit: item.count.units,
                    description: item.description
                }
            ]).then( () => {
                resolve("");
            }).catch((reason: string) => {
                reject(reason);
            });
        });
    }

    private isItemInvalid(item: MyInventoryItem): boolean {
        return item.isItemInvalid();
    }
};

export default ItemService;