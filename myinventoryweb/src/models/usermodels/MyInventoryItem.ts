import ItemCount from "../../typeDefs/ItemCount";
import { MyInventoryItemProps } from "../../props/MyInventoryItemProps";

class MyInventoryItem {
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

    asString(): string {
        const titleString = `Title: ${this.title}`;
        const itemIdString = `Id: ${this.itemId}`;
        const itemOwnerString = `Owner: ${this.owner}`;
        const itemTypeString = `Type: ${this.type}`;
        const itemCountString = `Item count: ${this.count.count} ${this.count.units}`;

        return `${titleString} ${itemIdString} ${itemOwnerString} ${itemTypeString} ${itemCountString}`;
    }

    isItemInvalid(): boolean {
        if (this.title === "") { return true; }
        if (this.owner === "") { return true; }
        if (this.type === "") { return true; }
        if (!this.isCountValid()) { return true; }

        return false;
    }

    private isCountValid(): boolean {
        return this.count.count >= 0 && this.count.units !== "";
    }
}

export default MyInventoryItem;