import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import useStyles from "../componentstyles/navbarstyles";
import NavBarProps from "../interfaces/componentinterfaces/NavBarProps";

function NavBar({navBarTitle = "MyInventory"}: NavBarProps) {
    const navBarStyles = useStyles();

    return (
        <div className={navBarStyles.root}>
            <AppBar position="static" className={navBarStyles.background}>
                <Toolbar>
                    <Typography variant="h6" className={navBarStyles.title}>
                       {navBarTitle} 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;