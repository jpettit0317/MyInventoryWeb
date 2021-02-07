import ItemCount from "../typeDefs/ItemCount";
import { v4 as uuidv4 } from 'uuid';
export interface MyInventoryItemProps {
    title: string;
    itemId: string;
    owner: string;
    type: string;
    count: ItemCount;
    description: string;
};

export function createMyInventoryItemProps(title: string = "", itemId: string = uuidv4(),
   owner: string = "", type: string = "", count: ItemCount = {count: 0, units: ""}, 
   description: string = ""): MyInventoryItemProps {
    const props: MyInventoryItemProps = {
        title: title,
        itemId: itemId,
        owner: owner,
        type: type,
        count: count,
        description: description
    };

    return props;
} 