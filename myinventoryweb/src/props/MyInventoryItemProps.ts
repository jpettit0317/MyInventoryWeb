import ItemCount from "../typeDefs/ItemCount";

interface MyInventoryItemProps {
    title: string;
    itemId: string;
    owner: string;
    type: string;
    count: ItemCount;
};

export default MyInventoryItemProps;