import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface JumpToPageDialogProps {
    isOpen: boolean;
    okayPressed: (pageSelected: number) => void;
    cancelPressed: () => void;
    totalNumberOfPages: number;
}

export default function JumpToPageDialog(props: JumpToPageDialogProps) {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [pageNumber, setPageNumber] = useState(1);

    const dialogText = `Enter a page number between 1 and ${props.totalNumberOfPages}`;
    
    const buttonLabels = {
        cancel: "Cancel",
        ok: "Ok"
    };

    const pageNumberId = "pageNumber";

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, []);


    function onFieldChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const inputAsString = event.target.value;
        const pageNum = Number(inputAsString);

        setPageNumber(pageNum);
    }

    function handleClose() {
        props.cancelPressed();
    }

    function handleOk() {
        props.okayPressed(pageNumber);
    }

    function renderTextField(): JSX.Element {
        return (
            <form>
                <TextField
                    name="Page number"
                    variant="outlined"
                    fullWidth
                    multiline
                    id={pageNumberId}
                    label="Page number"
                    onChange={onFieldChanged}
                    autoFocus
                    value={pageNumber}
                />
            </form>
        )
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {dialogText}
                    </Typography>
                    {renderTextField()}
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