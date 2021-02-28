import MyInventoryItem from "../models/usermodels/MyInventoryItem";

interface MyInventoryItemCardProps {
    item: MyInventoryItem;
    index: number;
    editItemCallBack: (index: number) => void;
    deleteItem: (item: MyInventoryItem) => void;
};

export default MyInventoryItemCardProps;