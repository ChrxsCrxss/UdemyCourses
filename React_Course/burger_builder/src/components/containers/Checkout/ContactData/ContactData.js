import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.module.css";

export default class ContactData extends Component {

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            zipCode : ''
        }
    }

    render () {

        return (

            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Enter name"/>
                    <input type="email" name="email" placeholder="Enter email"/>
                    <input type="text" name="street" placeholder="Enter street"/>
                    <input type="text" name="zipCode" placeholder="Enter zipCode"/>
                    <Button btnType="success">ORDER</Button>
                </form>
            </div>
        )
    }

}