import ItemCount from "../../typeDefs/ItemCount";
import MyInventoryItemProps from "../../props/MyInventoryItemProps";

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
}

export default MyInventoryItem;