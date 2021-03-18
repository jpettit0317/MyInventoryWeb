import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";
import { isItemInvalid } from "../models/usermodels/MyInventoryItem";

class ItemService {
    private itemDB: Model<IItem>;
    readonly emptyItemErrorMessage = "Item has an empty required field";

    constructor(newItemDB: Model<IItem>) {
        this.itemDB = newItemDB;
    }

    async addItem(item: MyInventoryItem): Promise<string> {
        return new Promise( (resolve, reject) => {
            if (isItemInvalid(item)) { resolve(this.emptyItemErrorMessage) };
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

    async deleteItem(item: MyInventoryItem): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (isItemInvalid(item)) {
                resolve("Invalid item");
            }

            await this.itemDB.findOneAndDelete(
                { itemId: item.itemId }).then((result) => {
                    console.log("Result is " + JSON.stringify(result));
                    resolve("");
                }).catch((reasonForRejection: string) => {
                    reject(reasonForRejection);
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
                type: iItem.type,
                count: {
                    count: iItem.count, 
                    units: iItem.countUnit
                },
                description: iItem.description,
                owner: ""
            };
            return MyInventoryItem.createItem(itemProp);
        });
    }

    async editItem(updatedItem: MyInventoryItem): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (isItemInvalid(updatedItem)) {
                resolve("Invalid item");
            }

            await this.itemDB.findOneAndReplace(
                {itemId: updatedItem.itemId}, 
                {
                    title: updatedItem.title,
                    type: updatedItem.type,
                    count: updatedItem.count.count,
                    countUnit: updatedItem.count.units,
                    description: updatedItem.description,
                    owner: updatedItem.owner,
                    itemId: updatedItem.itemId
                }).then((result) => {
                console.log("Result is " + JSON.stringify(result));
                resolve("");
            }).catch((reasonForRejection: string) => {
                reject(reasonForRejection);
            });
        });
    }
};

export default ItemService;