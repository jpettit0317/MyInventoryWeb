import { 
    CardMedia, 
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    makeStyles,
    Container,
    Grid
} from "@material-ui/core/";
import React, { useState } from "react";
import fs from "fs";
import logo192 from "../logo192.png";
import MyInventoryItemCard from "./MyInventoryItemCard";
import createItems from "../DummyItems";
import useMyInventoryStyles from "../componentstyles/myinventorystyles";

function MyInventory(): JSX.Element {
    const classes = useMyInventoryStyles();
    const items = createItems();

    function onAddItemButtonPressed() {
        console.log("Add item button was pressed!");
    }

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Button size="small" color="primary" onClick={onAddItemButtonPressed}>
                        Add Item
                    </Button>
                </Grid>
                {items.map((item, index) => (
                    <Grid item key={index} xs={12} md={4}>
                        <MyInventoryItemCard item={item} />
                    </Grid>
                ))}
            </ Grid>
        </Container>
    );
}

export default MyInventory;