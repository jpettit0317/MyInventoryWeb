import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemService from "../services/ItemService";
import SessionService from "../services/SessionService";

class AddItemController {
    private item: MyInventoryItem;
    private itemService: ItemService;

    constructor(item: MyInventoryItem, newItemService: ItemService) {
        this.item = item;
        this.itemService = newItemService;
    }

    async addItem(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await this.itemService.addItem(this.item).then((addResult: string) => {
                resolve("Succesfully added item.");
            }).catch((reasonForRejection: string) => {
                reject(reasonForRejection);
            });
        });
    }
};

export default AddItemController;