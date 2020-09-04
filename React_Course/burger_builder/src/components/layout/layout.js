import React, { Component } from "react";
import Aux from "../hoc/Aux"
import classes from './layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

// A typical react workspace might have a layout folder that handles
// layout. this would be seperate from the app component 
class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer : false })
    }

    openSideDrawerHandler = () => {
        this.setState({ showSideDrawer : true })
    }


    render() {

        return (
            <Aux>
            <Toolbar openSideDrawerr={this.openSideDrawerHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main  className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )

    }
}

export default Layout

