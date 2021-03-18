import ItemCount from "../../typeDefs/ItemCount";
import { createMyInventoryItemProps, MyInventoryItemProps } from "../../props/MyInventoryItemProps";

export default class MyInventoryItem {
    readonly title: string;
    readonly itemId: string;
    readonly owner: string;
    readonly type: string;
    readonly count: ItemCount;
    readonly description: string;

    private constructor(props: MyInventoryItemProps) {
        this.title = props.title;
        this.itemId = props.itemId;
        this.owner = props.owner;
        this.type = props.type;
        this.count = props.count;
        this.description = props.description;
    }

    static createItem(props: MyInventoryItemProps): MyInventoryItem {
        return new MyInventoryItem(props);
    }

    static createEmptyItem(): MyInventoryItem {
        const props = createMyInventoryItemProps();

        return new MyInventoryItem(props);
    }

    public asString(): string {
        const titleString = `Title: ${this.title}`;
        const itemIdString = `Id: ${this.itemId}`;
        const itemOwnerString = `Owner: ${this.owner}`;
        const itemTypeString = `Type: ${this.type}`;
        const itemCountString = `Item count: ${this.count.count} ${this.count.units}`;

        return `${titleString} ${itemIdString} ${itemOwnerString} ${itemTypeString} ${itemCountString}`;
    }
}

export function logItem(item: MyInventoryItem | undefined) {
    if (item !== undefined) {
        console.log(`Title: ${item.title}`);
        console.log(`Owner: ${item.owner}`);
        console.log(`Type: ${item.type}`);
        console.log(`Count: ${item.count.count} ${item.count.units}`);
        console.log(`Description: ${item.description}`);
        console.log(`Item id: ${item.itemId}`);
    } else {
        console.log("Item is undefined");
    }
};

export function isCountValid(itemCount: ItemCount): boolean {
    return itemCount.count >= 0 && itemCount.units !== "";
}

export function isItemInvalid(item: MyInventoryItem): boolean {
    if (item.title === "") { return true; }
    if (item.type === "") { return true; }
    if (!isCountValid(item.count)) { return true; }

    return false;
}