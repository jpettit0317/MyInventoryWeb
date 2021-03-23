import React, { useState } from "react";
import MyInventoryItem, { logItem } from "../../models/usermodels/MyInventoryItem";
import ViewItemDialogProps from "../../props/ViewItemDialogProps";
import ItemNavBar from "../navbars/ItemNavBar";
import ViewItemForm from "./ViewItemForm";
import { Dialog, DialogContent } from "@material-ui/core";

export default function ViewItemDialog(props: ViewItemDialogProps) {
    const dialogTitle = "View Item";
    const fullWidth = true;
    const maxWidth = "md";

    const [isOpen, setIsOpen] = useState(props.isOpen);

    function closeButtonWasPressed() {
        setIsOpen(false);
        props.onClose();
    }

    function renderForm(): JSX.Element {
        return (
            <div>
                <ItemNavBar title={dialogTitle} close={closeButtonWasPressed} />
                <ViewItemForm
                    itemToView={props.itemToView}
                    isOpen={props.isOpen}
                    onClose={closeButtonWasPressed}
                />
            </div>
        );
    }
    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isOpen}
            onClose={closeButtonWasPressed}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogContent>
                {renderForm()}
            </DialogContent>
        </Dialog>
    )
}