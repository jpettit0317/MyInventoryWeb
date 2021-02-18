import { Box, Button, Container, CssBaseline, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import EditItemPageProps from "../../props/EditItemPageProps";
import EditItemForm from "./EditItemForm";
import { withRouter } from 'react-router-dom';
import FullApiURL from "../../enums/FullApiURL_enum";
import useEditItemFormStyles from "../../componentstyles/ediitemformstyles";

function EditItemPage(props: EditItemPageProps) {
    const editItemLabel = "Edit Item";

    const classes = useEditItemFormStyles();

    function onClick(item: MyInventoryItem) {
        console.log("Edit item was pressed.");
    }

    function renderAddItemForm(): JSX.Element {
        return (
            <EditItemForm itemToEdit={props.itemToEdit}/>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* {redirectToPage()} */}
                <Typography component="h1" variant="h5">
                    {editItemLabel}
                </Typography>
                {renderAddItemForm()}
            </div>
        </Container>
    );
}

export default withRouter(EditItemPage);