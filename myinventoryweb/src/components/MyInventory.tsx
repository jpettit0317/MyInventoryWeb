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
import DeleteItemWarning from "./deleteItem/DeleteItemWarning";
import deleteItemFromDB from "../utils/DeleteItemUtils";
import AddPageDialog from "./additem/AddPageDialog";
import getCookieValue, { deleteCookie } from "../utils/CookieUtils";

function MyInventory(): JSX.Element {
    const classes = useMyInventoryStyles();

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldPush, setShouldPush] = useState(true);
    const [redirectDestination, setRedirectDestination] = useState("");
    const [items, setItems] = useState<MyInventoryItem[]>([]);
    const [didItemsLoad, setDidItemsLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MyInventoryItem>(MyInventoryItem.createEmptyItem());
    const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
    const [shouldOpenDeleteWarning, setShouldOpenDeleteWarning] = useState(false);
    const [shouldOpenAddItemDialog, setShouldOpenAddItemDialog] = useState(false);

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

        async function checkForValidCookie(sessionId: string): Promise<{result: boolean, reason: string}> {
            return new Promise( async (resolve, reject) => {
                await MyInventoryNetworkCallManager.checkForValidCookie(sessionId).then(result => {
                    console.log("Cookie is valid " + result.reason);
                    resolve(result);
                }).catch((result: {result: boolean, reason: string}) => {
                    console.log("Cookie is invalid " + result.reason);
                    reject(result);
                });
            });
        }
        
        const sessionId = getCookieValue("sessionId");

        if (sessionId) {
            console.log("The session id is " + sessionId);
            checkForValidCookie(sessionId).then(() => {
                fetchUserItems();
            }).catch(() => {
                console.log("Deleting session ");
                MyInventoryNetworkCallManager.deleteSession(sessionId).then((result) => {
                    if (result.result) {
                        console.log("Setting delete ")
                        setRedirect({shouldPush: false, shouldRedirect: true, destination: RoutePath.login});
                        deleteCookie("sessionId");
                    }
                }).catch((reasonForRejection: {result: boolean, reason: string}) => {
                    console.log("Redirecting to login because " + reasonForRejection.reason);
                    setRedirect({ shouldPush: false, shouldRedirect: true, destination: RoutePath.login });
                    deleteCookie("sessionId");
                });
            });
        }
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

    function closeAddDialogue() {
        setShouldOpenAddItemDialog(false);
        reloadPage();
    }

    function reloadPage() {
        window.location.reload();
    }

    function deleteItem(item: MyInventoryItem) {
        setSelectedItem(item);
        console.log("Deleting item");
        logItem(selectedItem);
        setShouldOpenDeleteWarning(true);
    }

    function closeDeleteWarning() {
        setShouldOpenDeleteWarning(false);
        clearSelectedItem();
    }

    async function onOkay() {
        console.log("Hit okay");
        closeDeleteWarning();

        await deleteItemFromDB(FullApiURL.deleteItem, selectedItem).then((value) => {
            closeDeleteWarning();
            reloadPage();
        }).catch((reason: string) => {
            console.log("Couldn't delete item");
        });
    }

    function redirectToEditItem() {
        setRedirect({ shouldPush: true, shouldRedirect: true, destination: RoutePath.editItem});
    }

    function onAddItemButtonPressed() {
        setShouldOpenAddItemDialog(true);
    }

    function renderAddItemDialog(): JSX.Element {
        return (
            <AddPageDialog 
               onClose={closeAddDialogue} 
               onAdd={closeAddDialogue} 
               isOpen={shouldOpenAddItemDialog}
            />
        );
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

    function clearSelectedItem() {
        setSelectedItem(MyInventoryItem.createEmptyItem());
    }

    function shouldRenderEditDialog(): boolean {
        return !isItemInvalid(selectedItem) && shouldOpenDialog;
    }

    function shouldRenderDeleteWarning(): boolean {
        return !isItemInvalid(selectedItem) && shouldOpenDeleteWarning;
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

    function renderDeleteWarning(): JSX.Element {
        return (
            <DeleteItemWarning 
               isOpen={shouldOpenDeleteWarning} 
               onClose={closeDeleteWarning}
               onOk={onOkay}
            />
        )
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
                {shouldRenderDeleteWarning() && renderDeleteWarning()}
                {shouldOpenAddItemDialog && renderAddItemDialog()}
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
                deleteItem={deleteItem}
            />
        );
    }

    function renderLoading(): JSX.Element {
        console.log("Redirect destination is " + redirectDestination);
        console.log("Redirect " + shouldRedirect);
        return (
            <div>
                { shouldRedirect === true ? redirectToPage() : ""}
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