import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import ItemNavBarProps from "../../props/ItemNavBarProps";
import navBarStyles from "../../componentstyles/itemnavbarstyles";
import CloseIcon from '@material-ui/icons/Close';

function ItemNavBar(props: ItemNavBarProps) {
    const classes = navBarStyles();

    function handleClose() {
        props.close();
    }

    return (
        <AppBar position="static" className={classes.background}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default ItemNavBar;