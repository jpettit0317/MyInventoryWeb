import { Card, CardContent, Typography, Button, CardActions } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import useMyInventoryCardStyles from "../componentstyles/myinventoryitemcardstyles";
import MyInventoryItemCardProps from "../props/MyInventoryItemCardProps";


function MyInventoryItemCard(props: MyInventoryItemCardProps): JSX.Element {
    const classes = useMyInventoryCardStyles();
    
    function onEditPressed() {
        const itemCardIndex = props.index;

        props.editItemCallBack(itemCardIndex);
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
                    View
                </Button>
                <Button size="small" color="primary" onClick={onEditPressed}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default MyInventoryItemCard;