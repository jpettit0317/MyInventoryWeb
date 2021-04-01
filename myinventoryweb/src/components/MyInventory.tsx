import { 
    CardMedia, 
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    makeStyles,
    Container,
    Grid,
    ButtonGroup
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
import LoggedInNavBar from "./navbars/LoggedInNavBar";
import ViewItemDialog from "./viewItem/ViewItemDialog";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingIndicator } from "./LoadingIndicator";
import { ItemPageButtonGroup } from "./ButtonGroup";
import JumpToPageDialog from "./getItems/JumpToPageDialog";

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
    const [shouldOpenViewItemDialog, setShouldOpenViewItemDialog] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [shouldOpenJumpToPageNumberDialog, setShouldOpenJumpDialog] = useState(false);

    const fetchUserItems = async (sessionId: string, pageToLoad: number = 1) => {
        await MyInventoryNetworkCallManager.getItemsForUser(sessionId, pageToLoad).then((value) => {
            const retreivedItems: MyInventoryItem[] = JSON.parse(value.items);
            console.log("Items are " + value.items);

            setItems(retreivedItems);
            setDidItemsLoad(true);
            setTotalNumberOfPages(value.totalPages);
        }).catch((reasonForRejection) => {
            console.log(reasonForRejection);
            setDidItemsLoad(true);
        });
    };

    function fetchMoreData() {
        const sessionId = getCookieValue("sessionId");
        
        if (sessionId !== null) {
            const numberOfItemsToLoad = items.length + 6;
            fetchUserItems(sessionId, numberOfItemsToLoad);
        }
    }

    useEffect(() => {
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
                fetchUserItems(sessionId, currentPageNumber);
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
    }, [currentPageNumber]);

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
    }

    function addDialogAddButton() {
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
        console.log("The value of shouldOpenDeleteWarning is " + shouldOpenDeleteWarning);
    }

    function viewItem(item: MyInventoryItem) {
        console.log("Viewing item in MyInventory");

        if (!isItemInvalid(item)) {
            console.log("Item is valid");
            setSelectedItem(item);
            setShouldOpenViewItemDialog(true);
            console.log("ShouldOPenViewItemDialog " + shouldOpenViewItemDialog);
        }
    }

    function closeDeleteWarning() {
        setShouldOpenDeleteWarning(false);
        clearSelectedItem();
    }

    async function onOkay() {
        console.log("Hit okay");
        closeDeleteWarning();

        const sessionId = getCookieValue("sessionId");

        if (!sessionId) {
            console.log("Session Id is null");
            return;
        } else {
            console.log("Session id is " + sessionId!);
        }

        await deleteItemFromDB(FullApiURL.deleteItem, selectedItem, sessionId!).then((value) => {
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
               onAdd={addDialogAddButton} 
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

    function renderJumpDialog(): JSX.Element {
        return (
            <JumpToPageDialog 
               isOpen={shouldOpenJumpToPageNumberDialog} 
               okayPressed={jumpToPagePressed}
               cancelPressed={cancelPressedOnJumpToPage}
               totalNumberOfPages={totalNumberOfPages}
            />
        )
    }

    function cancelPressedOnJumpToPage() {
        setShouldOpenJumpDialog(false);
    }

    function jumpToPagePressed(pageSelected: number) {
        if (pageSelected > 0 && pageSelected <= totalNumberOfPages) {
            setCurrentPageNumber(pageSelected);
            setShouldOpenJumpDialog(false);
        }
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

    function closeViewItemDialog() {
        setShouldOpenViewItemDialog(false);
    }

    function renderViewItemDialog(): JSX.Element {
        console.log("Rendering ViewItemDialog");
        return (
            <ViewItemDialog itemToView={selectedItem} isOpen={shouldOpenViewItemDialog} onClose={closeViewItemDialog} />
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

    function loggedOutButtonPressed() {
        console.log("Logged button was pressed");

        logUserOut().then(result => {
            setRedirect({shouldPush: false, shouldRedirect: true, destination: RoutePath.login});
        }).catch((result: {result: boolean, reason: string}) => {
            console.log("Failed to logout because " + result.reason);
        });
    }

    async function logUserOut(): Promise<{result: boolean, reason: string}> {
        return new Promise(async (resolve, reject) => {
            const sessionId = getCookieValue("sessionId");

            if (sessionId === null) {
                reject({result: false, reason: "Couldn't find sessionId"});
            } else {
                await MyInventoryNetworkCallManager.deleteSession(sessionId!).then((result) => {
                    resolve(result);
                }).catch((reasonForRejection: {result: boolean, reason: string}) => {
                    reject(reasonForRejection);
                });
            }
        });
    }

    function shouldRenderViewItemDialog(): boolean {
        console.log("Running shouldRenderViewItemDialog");
        console.log("Is item valid" + !isItemInvalid(selectedItem));
        console.log("ShouldOpenViewItemDialog " + shouldOpenViewItemDialog);
        return !isItemInvalid(selectedItem) && shouldOpenViewItemDialog;
    }

    function onMenuButtonPressed() {
        setIsMenuOpen(true);
    }

    function renderItemList(): JSX.Element {
        const style = {
            display: 'flex'
        };

        return (
            <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Button size="small" color="primary" onClick={onAddItemButtonPressed}>
                            Add Item
                        </Button>
                    </Grid>
                {items.map((item, index) => (
                   <Grid item key={item.itemId} xs={12} md={4}>
                        {displayCard({ item, index })}
                    </Grid>
                ))}
                <Grid container justify="center">
                    <Grid item>
                        {renderButtonGroup()}
                    </Grid>
                </Grid>
            </ Grid>
        );
    }

    function renderButtonGroup(): JSX.Element {
        return (
            <ItemPageButtonGroup totalPages={totalNumberOfPages} currentPage={currentPageNumber} buttonPressed={pageButtonPressed} displayRangePressed={rangeButtonPressed}/>            
        );
    }

    function pageButtonPressed(index: number) {
        if (index === -1) {
            console.log("Range button was pressed");
        } else {
            console.log("The button is in pageButtonPressed " + index);
            setCurrentPageNumber(index);
        }
    }

    function rangeButtonPressed() {
        console.log("Range button was pressed");
        setShouldOpenJumpDialog(true);
    }

    function renderItems(): JSX.Element {
        return (
            <div>
                <LoggedInNavBar isMenuOpen={isMenuOpen} onLoggedOutPressed={loggedOutButtonPressed} onMenuButtonPressed={onMenuButtonPressed} />
                <Container className={classes.cardGrid} maxWidth="md">
                    {shouldRedirect === true ? redirectToPage() : ""}
                    {shouldRenderEditDialog() && renderEditDialog()}
                    {shouldRenderDeleteWarning() && renderDeleteWarning()}
                    {shouldOpenAddItemDialog && renderAddItemDialog()}
                    {shouldRenderViewItemDialog() === true ? renderViewItemDialog(): ""}
                    {shouldOpenJumpToPageNumberDialog === true ? renderJumpDialog(): ""}
                    {renderItemList()}
                </Container>
            </div>
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
                viewItem={viewItem}
            />
        );
    }

    function renderLoading(): JSX.Element {
        console.log("Redirect destination is " + redirectDestination);
        console.log("Redirect " + shouldRedirect);
        return (
            <div>
                <LoadingIndicator shouldRedirect={shouldRedirect} redirectToPage={redirectToPage} />
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