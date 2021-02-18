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
import React, { useEffect, useState } from "react";
import fs from "fs";
import logo192 from "../logo192.png";
import MyInventoryItemCard from "./MyInventoryItemCard";
import createItems from "../DummyItems";
import useMyInventoryStyles from "../componentstyles/myinventorystyles";
import { Redirect } from "react-router-dom";
import RoutePath from "../enums/RoutePath_enum";
import MyInventoryNetworkCallManager from "../utils/MyInventoryNetworkCallManager";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import IItem from "../interfaces/modelinterfaces/IItem";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";

function MyInventory(): JSX.Element {
    const classes = useMyInventoryStyles();

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldPush, setShouldPush] = useState(true);
    const [redirectDestination, setRedirectDestination] = useState("");
    const [items, setItems] = useState<MyInventoryItem[]>([]);
    const [didItemsLoad, setDidItemsLoad] = useState(false);

    useEffect(() => {
        let mounted = true;

        const fetchUserItems = async () => {
            await MyInventoryNetworkCallManager.getItemsForUser("jpettit0317").then((value) => {
                const retreivedItems: MyInventoryItem[] = JSON.parse(value);
                console.log("Items are " + value);
                console.log(`Item one count is ${retreivedItems[0].count.count} ${retreivedItems[0].count.units}`);
                
                if (!mounted) { return }
                
                setItems(retreivedItems);
                setDidItemsLoad(true);

            }).catch((reasonForRejection) => {
                console.log(reasonForRejection);
            });
        };

        fetchUserItems();

        return  () => {
            mounted = false;
        };
    }, []);

    function onEditButtonPressed(index: number) {
        console.log("Editing item at index " + index);
        const itemToEdit = items[index];

        logItem(itemToEdit);
    }

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

    function renderItems(): JSX.Element {
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
                        <Grid item key={item.itemId} xs={12} md={4}>
                            {displayCard({item, index})}
                        </Grid>
                    ))}
                </ Grid>
            </Container>
        );
    }

    function displayCard(cardInfo: {item: MyInventoryItem, index: number}): JSX.Element {
        const itemToDisplay = cardInfo.item;
        const index = cardInfo.index;

        return (
            <MyInventoryItemCard
                item={itemToDisplay}
                index={index}
                editItemCallBack={onEditButtonPressed}
                key={itemToDisplay.itemId}
            />
        );
    }

    function renderLoading(): JSX.Element {
        return (
            <div>
                Loading...
            </div>
        );
    }

    function logItem(item: MyInventoryItem) {
        console.log(`Title: ${item.title}`);
        console.log(`Owner: ${item.owner}`);
        console.log(`Type: ${item.type}`);
        console.log(`Count: ${item.count.count} ${item.count.units}`);
        console.log(`Description: ${item.description}`);
    }

    if (didItemsLoad) {
        return renderItems();
    } else {
        return renderLoading();
    }
}

export default MyInventory;