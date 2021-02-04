import ItemCount from "../typeDefs/ItemCount";
import { v4 as uuidv4 } from 'uuid';
export interface MyInventoryItemProps {
    title: string;
    itemId: string;
    owner: string;
    type: string;
    count: ItemCount;
};

export function createMyInventoryItemProps(title: string = "", itemId: string = uuidv4(), owner: string = "", type: string = "", count: number = 0, units: string = ""): MyInventoryItemProps {
    const props: MyInventoryItemProps = {
        title: title,
        itemId: itemId,
        owner: owner,
        type: type,
        count: {count: count, units: units}
    };

    return props;
} 