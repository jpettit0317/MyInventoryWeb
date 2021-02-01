import { Card, CardContent, Typography, Button, CardActions, makeStyles } from "@material-ui/core";
import React from "react";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";

interface MyInventoryItemCardProps {
    item: MyInventoryItem;
};

function MyInventoryItemCard(props: MyInventoryItemCardProps): JSX.Element {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.title}>
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