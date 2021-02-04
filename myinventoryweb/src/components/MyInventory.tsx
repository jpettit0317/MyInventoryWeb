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
import { Redirect } from "react-router-dom";
import RoutePath from "../enums/RoutePath_enum";

function MyInventory(): JSX.Element {
    const classes = useMyInventoryStyles();
    const items = createItems();

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldPush, setShouldPush] = useState(true);
    const [redirectDestination, setRedirectDestination] = useState("");

    function onAddItemButtonPressed() {
        console.log("Add item button was pressed!");
        setRedirect({shouldPush: true, shouldRedirect: true, destination: RoutePath.addItem});
    }

    function redirectToPage(): JSX.Element {
        if (shouldPush) {
            console.log("Pushing to " + redirectDestination);
            return <Redirect push to={redirectDestination} />;
        } else {
            console.log("Replacing with " + redirectDestination);
            return <Redirect to={redirectDestination} />;
        }
    }

    function setRedirect(info: {shouldPush: boolean, shouldRedirect: boolean, destination: string}) {
        setShouldRedirect(info.shouldRedirect);
        setShouldPush(info.shouldPush);
        setRedirectDestination(info.destination);
    }

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            {shouldRedirect === true ? redirectToPage() : ""}
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