import React, { useState, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from "../../componentstyles/navbarstyles";
import LoggedInNabBarProps from "../../props/LoggedInNavBarProps";
import { Fade, Menu, MenuItem } from '@material-ui/core';

export default function LoggedInNavBar(props: LoggedInNabBarProps) {
    const classes = useStyles();
    const navBarTitle = "MyInventory";

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorElement);

    function handleLogout() {
        props.onLoggedOutPressed();
    }

    function closeMenu() {
        setAnchorElement(null);
    }

    function renderMenu() : JSX.Element {
        return (
            <div>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorElement}
                    keepMounted
                    open={isMenuOpen}
                    onClose={closeMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }

    function onMenuButtonPressed(event: MouseEvent<HTMLElement>) {
        console.log("Menu button pressed");
        console.log("Current target is " + event.currentTarget);
        setAnchorElement(event.currentTarget);
        console.log("IsMenuOpen " + isMenuOpen);
    }

    return (
        <div className={classes.root}>
            {renderMenu()}
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onMenuButtonPressed}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                       {navBarTitle} 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}