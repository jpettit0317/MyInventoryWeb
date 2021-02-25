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
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import RoutePath from "../enums/RoutePath_enum";
import MyInventoryNetworkCallManager from "../utils/MyInventoryNetworkCallManager";
import MyInventoryItem, { logItem, isItemInvalid, isCountValid } from "../models/usermodels/MyInventoryItem";
import IItem from "../interfaces/modelinterfaces/IItem";
import { MyInventoryItemProps } from "../props/MyInventoryItemProps";
import ApiURL from "../enums/ApiURL_enum";
import EditPageDialog from "./editItem/EditPageDialog";
import editItem from "../utils/EditItemNetworkRequestUtil";
import FullApiURL from "../enums/FullApiURL_enum";

function MyInventory(): JSX.Element {
    const classes = useMyInventoryStyles();

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldPush, setShouldPush] = useState(true);
    const [redirectDestination, setRedirectDestination] = useState("");
    const [items, setItems] = useState<MyInventoryItem[]>([]);
    const [didItemsLoad, setDidItemsLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MyInventoryItem>(MyInventoryItem.createEmptyItem());
    const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

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
        setSelectedItem(itemToEdit);
        setShouldOpenDialog(true);
    }

    async function updateItem(updatedItem: MyInventoryItem) {
        console.log("The new item is\n");
        logItem(updatedItem);

        await editItem(FullApiURL.editItem, updatedItem).then((result) => {
            console.log("Updated item");
            closeDialog();
            reloadPage();
        }).catch((reasonForRejection: string) => {
            console.log("Can't close dialog because " + reasonForRejection);
        });
    }

    function closeDialog() {
        setShouldOpenDialog(false);
    }

    function reloadPage() {
        window.location.reload();
    }

    function redirectToEditItem() {
        setRedirect({ shouldPush: true, shouldRedirect: true, destination: RoutePath.editItem});
    }

    function onAddItemButtonPressed() {
        console.log("Add item button was pressed!");
        setRedirect({shouldPush: true, shouldRedirect: true, destination: RoutePath.addItem});
    }

    function redirectToPage(): JSX.Element {
        if (redirectDestination === RoutePath.editItem) {
            console.log("Item to edit");
            logItem(selectedItem);
            
            return (
                <Redirect to={getEditItemUrl()} />
            );
        } else if (shouldPush) {
            console.log("Pushing to " + redirectDestination);
            return <Redirect push to={redirectDestination} />;
        } else {
            console.log("Replacing with " + redirectDestination);
            return <Redirect to={redirectDestination} />;
        }
    }
   
    function shouldRenderEditDialog(): boolean {
        return !isItemInvalid(selectedItem) && shouldOpenDialog;
    }

    function renderEditDialog(): JSX.Element {
        return (
            <EditPageDialog 
               itemToEdit={selectedItem} 
               updateItem={updateItem} 
               closeDialog={closeDialog} 
               isOpen={shouldOpenDialog} 
            />
        );
    }

    function getEditItemUrl(): string {
        return `/editItem/${selectedItem.itemId}`;
    }

    function setRedirect(info: {shouldPush: boolean, shouldRedirect: boolean, destination: string}) {
        setShouldPush(info.shouldPush);
        setRedirectDestination(info.destination);
        setShouldRedirect(info.shouldRedirect);
    }

    function renderItems(): JSX.Element {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                {shouldRedirect === true ? redirectToPage() : ""}
                {shouldRenderEditDialog() && renderEditDialog()}
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

    if (didItemsLoad) {
        return renderItems();
    } else {
        return renderLoading();
    }
}

export default MyInventory;