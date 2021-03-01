import { Box, Button, Container, CssBaseline, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import useAddItemPageStyles from "../../componentstyles/additempagestyles";
import MyInventoryItem, { logItem } from "../../models/usermodels/MyInventoryItem";
import AddItemPageProps from "../../props/AdditemPageProps";
import AddItemForm from "./AddItemForm";
import { withRouter } from 'react-router-dom';
import AddItemNetworkCallManager from "../../utils/AddItemNetworkCallManager";
import FullApiURL from "../../enums/FullApiURL_enum";

function AddItemPage(props: AddItemPageProps) {
    const classes = useAddItemPageStyles();

    const addItemLabel = "Add Item";

    function onClick(item: MyInventoryItem) {
        console.log("Item in AddItemPage is ");
        logItem(item);

        const networkCallManager = AddItemNetworkCallManager.createNetworkCallManager(FullApiURL.addItem);
        
        networkCallManager.addItem(item).then((result) => {
            console.log("Succesfully added item " + item.asString());
            props.onAdd();
        }).catch((rejectionReason: string) => {
            console.log("Falied to add item " + rejectionReason);
        });
    }
    
    function renderAddItemForm(): JSX.Element {
        return (
            <AddItemForm 
                itemTitle={props.itemTitle}
                itemDescription={props.itemDescription}
                itemCount={props.itemCount}
                itemType={props.itemType}
                itemOwner={props.itemOwner}
                addItemCallBack={onClick} />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {renderAddItemForm()} 
            </div>
        </Container>
    );
}

export default AddItemPage;