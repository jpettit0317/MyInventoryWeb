import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemService from "../services/ItemService"

export default class EditItemController {
    private readonly itemService: ItemService;

    constructor(newItemService: ItemService) {
        this.itemService = newItemService;
    }

    async editItem(updatedItem: MyInventoryItem): Promise<string> {
        return new Promise( async (resolve, reject) => {
            await this.itemService.editItem(updatedItem).then((result) => {
                resolve("");
            }).catch((reason: string) => {
                reject(reason);
            });
        });
    }
};