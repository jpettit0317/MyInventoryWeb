import useAddItemPageStyles from "../../componentstyles/additempagestyles";
import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import MyInventoryItem from "../../models/usermodels/MyInventoryItem";
import ItemCount from "../../typeDefs/ItemCount";
import AddItemFormProps from "../../props/AddItemFormProps";
import AddItemFormTextFieldIds from "../../enums/AddItemFormTextFieldIds_enum";
import { MyInventoryItemProps, createMyInventoryItemProps } from "../../props/MyInventoryItemProps";
import AddItemViewModel from "../../viewmodels/AddItemViewModel";
import AddItemViewModelErrors from "../../typeDefs/AddItemViewModelErrors";
import { isStringNotANumber } from "../../utils/StringUtil";

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
    let [itemCountAsString, setItemCountAsString] = useState("0");
    let [itemUnits, setItemUnits] = useState("");
    let [itemType, setItemType] = useState("");
    let [itemTitleError, setItemTitleError] = useState("");
    let [itemCountError, setItemCountError] = useState("");
    let [itemUnitError, setItemUnitError] = useState("");
    let [itemTypeError, setItemTypeError] = useState("");

    function onAddButtonClicked() {
        const itemCount = Number(itemCountAsString);
        const itemCountWithUnit: ItemCount = {count: itemCount, units: itemUnits};
        const itemProps = createMyInventoryItemProps(itemTitle, undefined, undefined,
            itemType, itemCountWithUnit, itemDescription);
        
        const item = MyInventoryItem.createItem(itemProps);

        const addItemViewModel = AddItemViewModel.createAddItemViewModelWithItem(item);
        const formErrors: AddItemViewModelErrors = addItemViewModel.reportError();

        setItemTitleError(formErrors.itemTitleError);
        setItemCountError(formErrors.itemCountError);
        setItemUnitError(formErrors.itemUnitError);
        setItemTypeError(formErrors.itemTypeError);

        console.log("Errors " + JSON.stringify(formErrors));
        console.log(item.asString());
    }

    function onClearButtonClicked() {
        clearFields();
    }

    function clearFields() {
        setItemTitle("");
        setItemDescription("");
        setItemCountAsString("");
        setItemUnits("");
        setItemType("");
    }

    function onFieldChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const [targetId, targetValue] = [event.target.id, event.target.value];

        console.log(`Field Id: ${targetId}, value: ${targetValue}`);

        if (targetId === AddItemFormTextFieldIds.itemCountUnit) {
            setItemUnits(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemType) {
            setItemType(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemTitle) {
            setItemTitle(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemDescription) {
            setItemDescription(targetValue);
        } else if (targetId === AddItemFormTextFieldIds.itemCount) {
            if (targetValue === "" || isStringNotANumber(targetValue)) {
                setItemCountAsString("0");
            } else {
                setItemCountAsString(targetValue);
            }
        }
    }

    function renderItemTitleField(): JSX.Element {
        return itemTitleError === "" ? renderNormalTitleField() : renderItemTitleFieldInError();
    }

    function renderItemTitleFieldInError(): JSX.Element {
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
                error
                helperText={itemTitleError}
            />
        );
    }

    function renderNormalTitleField(): JSX.Element {
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
        if (itemCountError === "") {
            return renderNormalItemCountField();
        } else {
            return renderItemCountFieldError();
        }
    }

    function renderNormalItemCountField(): JSX.Element {
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
                value={itemCountAsString}
            />
        );
    }

    function renderItemCountFieldError(): JSX.Element {
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
                value={itemCountAsString}
                error
                helperText={itemCountError}
            />
       ); 
    }

    function renderItemCountUnitField(): JSX.Element {
        if (itemUnitError === "") {
            return renderNormalItemUnitField();
        } else {
            return renderItemUnitFieldError();
        }
    }

    function renderNormalItemUnitField(): JSX.Element {
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

    function renderItemUnitFieldError(): JSX.Element {
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
                error
                helperText={itemUnitError}
            />
        );
    }

    function renderItemTypeField(): JSX.Element {
        if (itemTypeError === "") {
            return renderNormalItemTypeField();
        } else {
            return renderItemTypeFieldError();
        }
    }

    function renderNormalItemTypeField(): JSX.Element {
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

    function renderItemTypeFieldError(): JSX.Element {
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
                error
                helperText={itemTypeError}
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