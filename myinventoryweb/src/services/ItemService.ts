import { Model } from "mongoose";
import IItem from "../interfaces/modelinterfaces/IItem";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";
import { isItemInvalid } from "../models/usermodels/MyInventoryItem";

class ItemService {
    private itemDB: Model<IItem>;
    readonly emptyItemErrorMessage = "Item has an empty required field";
    private totalItemsPerPage: number;

    constructor(newItemDB: Model<IItem>, newItemsPerPage: number = 9) {
        this.itemDB = newItemDB;
        this.totalItemsPerPage = newItemsPerPage;
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

    getItemByOwner(owner: string, pageToLoad: number): Promise<{items: MyInventoryItem[], totalPages: number}> {
        return new Promise( (resolve, reject) => {
            this.getItemsForPage(owner, pageToLoad).then((value) => {
                this.getTotalNumberOfItems(owner).then((totalNumberOfItems) => {
                    const totalPages = this.getNumberOfPages(totalNumberOfItems);
                    resolve({items: value.items, totalPages: totalPages});
                }).catch(() => {
                    reject({items: [], totalItems: 0});
                });
            }).catch((rejectReason) => {
                console.log("Couldn't find items " + rejectReason);
                reject({items: [], moreItems: false});
            });
        });
    }

    getTotalNumberOfItems(owner: string): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.itemDB.countDocuments({owner: owner}, (error, count) => {
                resolve(count);
            }).catch((error: string) => {
                console.log("Couldn't get number of items because " + error);
                reject(-1);
            });
        });
    }

    getItemsForPage(owner: string, pageNumber: number): Promise<{result: boolean, items: MyInventoryItem[]}> {
        return new Promise(async (resolve, reject) => {
            const numberOfItemsToSkip = this.skipNumberOfItems(pageNumber);

            this.itemDB.find({owner: owner}).sort({title: "asc"}).skip(numberOfItemsToSkip)
            .limit(this.totalItemsPerPage).then((iItems) => {
                const inventoryItems = this.convertIItemToMyInventoryItem(iItems);
                resolve({result: true, items: inventoryItems});
            }).catch(() => {
                reject({result: false, items: []});
            });
        });
    }

    private getNumberOfPages(totalItems: number) : number {
        if (totalItems === 0) {
            return 0;
        } else if (totalItems > 0 && totalItems <= 9) {
            return 1;
        } else {
            return Math.ceil((totalItems / this.totalItemsPerPage));
        }
    }

    private skipNumberOfItems(pageNumber: number): number {
        return (pageNumber - 1) * 9;
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