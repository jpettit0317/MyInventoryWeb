import { Button, DialogActions, DialogContent, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import DeleteItemWarningProps from "../../props/DeleteItemWarningProps";


export default function DeleteItemWarning(props: DeleteItemWarningProps) {
    const [isOpen, setIsOpen] = useState(false);

    const warningDialog = "Are you sure you want to delete this item?";
    const buttonLabels = {
        cancel : "Cancel",
        ok : "Ok"
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, []);

    function handleClose() {
        props.onClose();
    }
    
    function handleOk() {
        props.onOk();
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {warningDialog}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        {buttonLabels.cancel}
                    </Button>
                    <Button autoFocus onClick={handleOk} color="primary">
                        {buttonLabels.ok}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};