import MyInventoryItem from "../models/usermodels/MyInventoryItem";

export default interface ViewItemDialogProps {
    itemToView: MyInventoryItem;
    isOpen: boolean;
    onClose: () => void;
};