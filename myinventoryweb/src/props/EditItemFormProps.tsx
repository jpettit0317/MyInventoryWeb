import MyInventoryItem from "../models/usermodels/MyInventoryItem";

interface EditItemFormProps {
    itemToEdit: MyInventoryItem;
    editItem: (newItem: MyInventoryItem) => void;
};

export default EditItemFormProps;