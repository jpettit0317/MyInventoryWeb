import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";

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

    getItemByOwner(owner: string): Promise<MyInventoryItem[]> {
        return new Promise( (resolve, reject) => {
            this.itemDB.find({owner: owner}).then((value) => {
                console.log(`Found ${value.length} items`);
                const items = this.convertIItemToMyInventoryItem(value);
                resolve(items);
            }).catch((rejectReason) => {
                console.log("Couldn't find items " + rejectReason);
                reject([]);
            });
        });
    }

    private convertIItemToMyInventoryItem(iItems: IItem[]): MyInventoryItem[] {
        return iItems.map((iItem) => {
            const itemProp: MyInventoryItemProps = {
                itemId: iItem.itemId,
                title: iItem.title,
                owner: iItem.owner,
                type: iItem.type,
                count: {
                    count: iItem.count, 
                    units: iItem.countUnit
                },
                description: iItem.description
            };
            return MyInventoryItem.createItem(itemProp);
        });
    }

    private isItemInvalid(item: MyInventoryItem): boolean {
        return item.isItemInvalid();
    }
};

export default ItemService;