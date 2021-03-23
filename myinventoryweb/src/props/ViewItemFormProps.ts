import MyInventoryItem from "../models/usermodels/MyInventoryItem";

export default interface ViewItemFormProps {
    itemToView: MyInventoryItem;
    isOpen: boolean;
    onClose: () => void;
}