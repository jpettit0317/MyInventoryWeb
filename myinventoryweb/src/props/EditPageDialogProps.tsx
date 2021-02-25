import MyInventoryItem from "../models/usermodels/MyInventoryItem";

export default interface EditPageDialogProps {
    itemToEdit: MyInventoryItem;
    updateItem: (updatedItem: MyInventoryItem) => void;
    closeDialog: () => void;
    isOpen: boolean;
}