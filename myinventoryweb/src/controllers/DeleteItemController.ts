import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemService from "../services/ItemService"

export default class DeleteItemController {
    private readonly itemService: ItemService;

    constructor(newItemService: ItemService) {
        this.itemService = newItemService;
    }

    async deleteItem(itemToDelete: MyInventoryItem): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await this.itemService.deleteItem(itemToDelete).then((result) => {
                resolve("");
            }).catch((reason: string) => {
                reject(reason);
            });
        });
    }
};