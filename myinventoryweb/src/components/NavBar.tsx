import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import useStyles from "../componentstyles/navbarstyles";

function NavBar() {
    const navBarStyles = useStyles();

    return (
        <div className={navBarStyles.root}>
            <h1> Hello World! </h1>
        </div>
    );
}

export default NavBar;