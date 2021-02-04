import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemCount from "../typeDefs/ItemCount";

interface AddItemFormProps {
    addItemCallBack: (item: MyInventoryItem) => void;
    itemTitle: string;
    itemDescription: string;
    itemCount: ItemCount;
    itemType: string;
    itemOwner: string;
};

export default AddItemFormProps;