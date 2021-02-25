import { Box, Button, Container, CssBaseline, Grid, Link, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import EditItemPageProps from "../../props/EditItemPageProps";
import EditItemForm from "./EditItemForm";
import { useParams, withRouter } from 'react-router-dom';
import FullApiURL from "../../enums/FullApiURL_enum";
import useEditItemFormStyles from "../../componentstyles/ediitemformstyles";

function EditItemPage(props: EditItemPageProps) {
    const editItemLabel = "Edit Item";

    const classes = useEditItemFormStyles();

    useEffect(() => {
        console.log("Loading edit item page.");
    }, []);

    function onClick(item: MyInventoryItem) {
        console.log("Edit item was pressed.");
    }

    function editItem(item: MyInventoryItem) {
        console.log("In EditItemPage editItem");
        props.updateItem(item);
    }

    const renderAddItemForm = (): JSX.Element => {
        console.log("Rendering item form.");
        
        return (
            <EditItemForm itemToEdit={props.itemToEdit} editItem={editItem} />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* {redirectToPage()} */}
                {renderAddItemForm()}
            </div>
        </Container>
    );
}

export default withRouter(EditItemPage);