import React from "react";
import NagivationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css"

const navigationItem = (props) => (

    <ul className={classes.NavigationItems }>
        <NagivationItem link="/" active> Burger Builder</NagivationItem>
        <NagivationItem link="/" active> Checkout</NagivationItem>
    </ul>

);

export default navigationItem; 