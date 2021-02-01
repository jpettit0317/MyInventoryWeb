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

function MyInventory(): JSX.Element {
    const useStyles = makeStyles((theme) => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
    }));
    
    // {
    //     items.map((item, index) => {
    //         <Grid item xs={12} sm={6} md={4}>
    //             <MyInventoryItemCard key={index} item={item} />
    //         </ Grid>
    //     })
    // }
    const classes = useStyles();
    
    function readImage() { 
        console.log("Logo is " + logo192);       
    }

    readImage();

    const items = createItems();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
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