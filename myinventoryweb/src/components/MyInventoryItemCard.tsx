import { Card, CardContent, Typography, Button, CardActions } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import useMyInventoryCardStyles from "../componentstyles/myinventoryitemcardstyles";
interface MyInventoryItemCardProps {
    item: MyInventoryItem;
};

function MyInventoryItemCard(props: MyInventoryItemCardProps): JSX.Element {
    const classes = useMyInventoryCardStyles();
    console.log("In MyInventory Card.");
    return (
        <Card className={classes.card}>
            {console.log("Rendering card " + props.item.title)}
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
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default MyInventoryItemCard;