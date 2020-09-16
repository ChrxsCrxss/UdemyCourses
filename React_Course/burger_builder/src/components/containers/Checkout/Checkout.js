import React, { Component } from "react";
import CheckoutSummary from "../../../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends Component {

    state = {
        ingredients:{
            meat : 1,
            cheese : 1, 
            bacon : 1,
            salad : 1
        }
    }

    // Basically, everytime we mount the checkout component, 
    // we pass the ingredients as search parameters, extract them here in
    // componentDidMount, and use them to update the state of ingredients
    // here, to update the burger rendered to the user 
    componentDidMount() {

        const query =  new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredients}); 
    }

    checkoutCancelled = () => {

        this.props.history.goBack(); 

    }

    checkoutContinued = () => {

        this.props.history.replace('/checkout/contact-data'); 
    }


    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancalled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued} />
                <Route 
                path={this.props.match.url + '/contact-data'}
                render={ () => ( <ContactData ingredients={this.state.ingredients}/> ) }
                />
            </div>
        ); 
    }
}


