import React from "react";
import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationsItems"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <button onClick={props.toggleSideDrawer}>Side Drawer</button>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>

)

export default toolbar; 