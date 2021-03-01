import { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import AddItemPage from "./AddItemPage";
import { Dialog, DialogContent } from "@material-ui/core";
import MyInventoryItem, { logItem } from "../../models/usermodels/MyInventoryItem";
import ItemNavBar from "../navbars/ItemNavBar";
import AddItemPageDialogProps from "../../props/AddItemPageDialogProps";
import ItemCount from "../../typeDefs/ItemCount";

export default function AddPageDialog(props: AddItemPageDialogProps) {
    const [open, setOpen] = useState(false);

    const dialogTitle = "Add Item";
    const fullWidth = true;
    const maxWidth = "md";

    useEffect(() => {
        setOpen(props.isOpen);
    }, []);

    function handleClose() {
        console.log("Closing dialog box.");
        setOpen(false);
        props.onClose();
    }

    function addItem() {
        console.log("In AddPageDialog addItem");
        props.onAdd();
    }

    function renderPage(): JSX.Element {
        const emptyItemCount: ItemCount = {count: 0, units: ""};
        return (
            <div>
                <ItemNavBar title={dialogTitle} close={handleClose} />
                <AddItemPage
                   itemTitle=""
                   itemDescription=""
                   itemType=""
                   itemOwner=""
                   itemCount={emptyItemCount} 
                   onAdd={addItem}
                   onClose={handleClose}
                />
            </div>
        );
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
                     {renderPage()} 
                </DialogContent>
            </Dialog>
        </div>
    );
} 