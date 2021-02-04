import useAddItemPageStyles from "../../componentstyles/additempagestyles";
import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import ItemCount from "../../typeDefs/ItemCount";
import AddItemFormProps from "../../props/AddItemFormProps";
import AddItemFormTextFieldIds from "../../enums/AddItemFormTextFieldIds_enum";
import { MyInventoryItemProps, createMyInventoryItemProps } from "../../props/MyInventoryItemProps";

function AddItemForm(props: AddItemFormProps) {
    const classes = useAddItemPageStyles();

    const addItemButtonLabel = "Add Item";
    const clearItemButtonLabel = "Clear Item";

    const itemDescriptionRowTotal = 6;

    const textFieldLabels = {
        itemTitle: "Item Title",
        itemDescription: "Item Description",
        itemCount: "Item Count",
        itemUnits: "Item Unit",
        itemType: "Item Type"
    };
   
    let [itemTitle, setItemTitle] = useState("");
    let [itemDescription, setItemDescription] = useState("");
    let [itemCount, setItemCount] = useState(0);
    let [itemUnits, setItemUnits] = useState("");
    let [itemType, setItemType] = useState("");

    function onAddButtonClicked() {
        const itemProps = createMyInventoryItemProps(itemTitle, undefined, undefined,
            itemType, itemCount, itemUnits);
        
        const item = MyInventoryItem.createItem(itemProps);

        console.log(item.asString());
    }

    function onClearButtonClicked() {
        clearFields();
    }

    function clearFields() {
        setItemTitle("");
        setItemDescription("");
        setItemCount(0);
        setItemUnits("");
        setItemType("");
    }

    function onFieldChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const [targetId, targetValue] = [event.target.id, event.target.value];

        console.log(`Field Id: ${targetId}, value: ${targetValue}`);

        if (targetId === AddItemFormTextFieldIds.itemTitle) {
            setItemTitle(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemDescription) {
            setItemDescription(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemCount) {
            const count = Number(targetValue);
            setItemCount(count);
        } else if (targetId === AddItemFormTextFieldIds.itemCountUnit) {
            setItemUnits(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemType) {
            setItemType(targetValue);
        }
    }

    function renderItemTitleField(): JSX.Element {
        return (
            <TextField
                name={AddItemFormTextFieldIds.itemTitle}
                variant="outlined"
                required
                fullWidth
                id={AddItemFormTextFieldIds.itemTitle}
                label={textFieldLabels.itemTitle}
                onChange={onFieldChanged}
                autoFocus
                value={itemTitle}
            />
        );
    }

    function renderItemDescriptionField(): JSX.Element {
        return (
            <TextField
                name={AddItemFormTextFieldIds.itemDescription}
                variant="outlined"
                fullWidth
                multiline
                rows={itemDescriptionRowTotal}
                id={AddItemFormTextFieldIds.itemDescription}
                label={textFieldLabels.itemDescription}
                onChange={onFieldChanged}
                autoFocus
                value={itemDescription}
            />
        );
    }

    function renderItemCountCountField(): JSX.Element {
        return (
            <TextField
                name={AddItemFormTextFieldIds.itemCount}
                variant="outlined"
                required
                fullWidth
                id={AddItemFormTextFieldIds.itemCount}
                label={textFieldLabels.itemCount}
                onChange={onFieldChanged}
                autoFocus
                value={itemCount}
            />
        );
    }

    function renderItemCountUnitField() {
        return (
            <TextField
                name={AddItemFormTextFieldIds.itemCountUnit}
                variant="outlined"
                required
                fullWidth
                id={AddItemFormTextFieldIds.itemCountUnit}
                label={textFieldLabels.itemUnits}
                onChange={onFieldChanged}
                autoFocus
                value={itemUnits}
            />
        );
    }

    function renderItemTypeField(): JSX.Element {
        return (
            <TextField
                name={AddItemFormTextFieldIds.itemType}
                variant="outlined"
                required
                fullWidth
                id={AddItemFormTextFieldIds.itemType}
                label={textFieldLabels.itemType}
                onChange={onFieldChanged}
                autoFocus
                value={itemType}
            />
        );
    }

    return (
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {renderItemTitleField()}
                </Grid>
                <Grid item xs={12}>
                    {renderItemDescriptionField()}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {renderItemCountCountField()}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {renderItemCountUnitField()}
                </Grid>
                <Grid item xs={12}>
                    {renderItemTypeField()}
                </Grid>
                <Grid item xs={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onAddButtonClicked}
                        >
                            {addItemButtonLabel}
                        </ Button>
                </ Grid>
                <Grid item xs={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onClearButtonClicked}
                        >
                            {clearItemButtonLabel}
                        </ Button>
                </Grid>
            </Grid>
            {/* <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onAddButtonClicked}
            >
                {addItemButtonLabel}
            </Button> */}
        </form>
    );
}

export default AddItemForm;