import { Card, CardContent, Typography, Button, CardActions } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { logItem } from "../models/usermodels/MyInventoryItem";
import useMyInventoryCardStyles from "../componentstyles/myinventoryitemcardstyles";
import MyInventoryItemCardProps from "../props/MyInventoryItemCardProps";


function MyInventoryItemCard(props: MyInventoryItemCardProps): JSX.Element {
    const classes = useMyInventoryCardStyles();

    const buttonLabels = {
        view : "View",
        edit : "Edit",
        delete : "Delete"
    };
    
    function onEditPressed() {
        const itemCardIndex = props.index;

        props.editItemCallBack(itemCardIndex);
    }
    
    function onDeletePressed() {
        console.log("Delete button was pressed for item ");
        logItem(props.item);
    }

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.item.title} 
                </Typography>
                <Typography>
                    {props.item.count.count} {props.item.count.units}
                </Typography>
                <Typography>
                    {props.item.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    {buttonLabels.view}
                </Button>
                <Button size="small" color="primary" onClick={onEditPressed}>
                    {buttonLabels.edit}
                </Button>
                <Button size="small" color="secondary" onClick={onDeletePressed}>
                    {buttonLabels.delete}
                </Button>
            </CardActions>
        </Card>
    );
}

export default MyInventoryItemCard;