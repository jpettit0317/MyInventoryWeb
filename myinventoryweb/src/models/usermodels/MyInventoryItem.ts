import ItemCount from "../../typeDefs/ItemCount";
import { MyInventoryItemProps } from "../../props/MyInventoryItemProps";

class MyInventoryItem {
    readonly title: string;
    readonly itemId: string;
    readonly owner: string;
    readonly type: string;
    readonly count: ItemCount;

    private constructor(props: MyInventoryItemProps) {
        this.title = props.title;
        this.itemId = props.itemId;
        this.owner = props.owner;
        this.type = props.type;
        this.count = props.count;
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
}

export default MyInventoryItem;