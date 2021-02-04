import { Box, Button, Container, CssBaseline, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import useAddItemPageStyles from "../../componentstyles/additempagestyles";
import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import AddItemPageProps from "../../props/AdditemPageProps";
import AddItemForm from "./AddItemForm";
import { withRouter } from 'react-router-dom';

function AddItemPage(props: AddItemPageProps) {
    const classes = useAddItemPageStyles();

    const addItemLabel = "Add Item";

    function onClick(item: MyInventoryItem) {

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
                {/* {redirectToPage()} */}
                <Typography component="h1" variant="h5">
                    {addItemLabel}
                </Typography>
                {renderAddItemForm()} 
            </div>
        </Container>
    );
}

export default withRouter(AddItemPage);