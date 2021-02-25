import { useEffect, useState } from "react";
import EditItemPageProps from "../../props/EditItemPageProps";
import EditPageDialogProps from "../../props/EditPageDialogProps";
import EditItemForm from "./EditItemForm";
import EditItemPage from "./EditItemPage";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import MyInventoryItem, { logItem } from "../../models/usermodels/MyInventoryItem";
import ItemNavBar from "../navbars/ItemNavBar";

export default function EditPageDialog (props: EditPageDialogProps) {
    const [open, setOpen] = useState(false);
    
    const dialogTitle = "Edit Item";
    const fullWidth = true;
    const maxWidth = "md";

    useEffect(() => {
        console.log("Item to edit in dialog box is ");
        logItem(props.itemToEdit);
        setOpen(props.isOpen);
    }, []);

    function handleClose() {
        console.log("Closing dialog box.");
        setOpen(false);
        props.closeDialog();
    }

    function updateItem(item: MyInventoryItem) {
        console.log("In EditPageDialog updateItem");
        props.updateItem(item);
    }

    return (
        <div>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                    <DialogContent>
                        <ItemNavBar title={"Edit Item"} close={handleClose} />
                        <EditItemPage itemToEdit={props.itemToEdit} updateItem={updateItem} />
                    </DialogContent>
                </Dialog>
        </div>
    );
} 
