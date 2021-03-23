import { Grid, TextField } from "@material-ui/core";
import React from "react";
import useAddItemPageStyles from "../../componentstyles/additempagestyles";
import ItemFormTextFieldIds from "../../enums/ItemFormTextFieldIds_enum";
import ViewItemFormProps from "../../props/ViewItemFormProps";

export default function ViewItemForm(props: ViewItemFormProps) {

    const classes = useAddItemPageStyles();

    const textFieldLabels = {
        itemTitle: "Item Title",
        itemDescription: "Item Description",
        itemCount: "Item Count",
        itemUnits: "Item Unit",
        itemType: "Item Type"
    };

    const itemDescriptionRowTotal = 6;

    function renderItemTitle(): JSX.Element {
        return (
            <TextField
                name={ItemFormTextFieldIds.itemTitle}
                variant="outlined"
                fullWidth
                id={ItemFormTextFieldIds.itemTitle}
                label={textFieldLabels.itemTitle}
                value={props.itemToView.title}
                inputProps={{
                    readOnly: true,
                    "aria-label": "primary checkbox"
                }}
            />
        );
    }

    function renderItemDescriptionField(): JSX.Element {
        return (
            <TextField
                name={ItemFormTextFieldIds.itemDescription}
                variant="outlined"
                fullWidth
                multiline
                rows={itemDescriptionRowTotal}
                id={ItemFormTextFieldIds.itemDescription}
                label={textFieldLabels.itemDescription}
                value={props.itemToView.description}
                inputProps={{
                    readOnly: true,
                    "aria-label": "primary checkbox"
                }}
            />
        );
    }

    function renderItemCountField(): JSX.Element {
        return (
            <TextField
                name={ItemFormTextFieldIds.itemCount}
                variant="outlined"
                fullWidth
                id={ItemFormTextFieldIds.itemCount}
                label={textFieldLabels.itemCount}
                type={"number"}
                InputProps={{ inputProps: { min: 0 }, readOnly: true }}
                value={props.itemToView.count.count}
            />
        );
    }

    function renderItemUnitField(): JSX.Element {
        return (
            <TextField
                name={ItemFormTextFieldIds.itemCountUnit}
                variant="outlined"
                fullWidth
                id={ItemFormTextFieldIds.itemCountUnit}
                label={textFieldLabels.itemUnits}
                value={props.itemToView.count.units}
                inputProps={{
                    readOnly: true,
                    "aria-label": "primary checkbox"
                }}
            />
        );
    }

    function renderItemTypeField(): JSX.Element {
        return (
            <TextField
                name={ItemFormTextFieldIds.itemType}
                variant="outlined"
                fullWidth
                id={ItemFormTextFieldIds.itemType}
                label={textFieldLabels.itemType}
                value={props.itemToView.type}
                inputProps={{
                    readOnly: true,
                    "aria-label": "primary checkbox"
                }}
            />
        );
    }

    return (
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {renderItemTitle()}
                </Grid>
                <Grid item xs={12}>
                    {renderItemDescriptionField()}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {renderItemCountField()}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {renderItemUnitField()}
                </Grid>
                <Grid item xs={12}>
                    {renderItemTypeField()}
                </Grid>
            </Grid>
        </form>
    )
}