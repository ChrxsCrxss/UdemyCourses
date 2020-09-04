import React, { Component } from "react";
import CheckoutSummary from "../../../components/CheckoutSummary/CheckoutSummary";

export default class Checkout extends Component {

    state = {
        ingredients:{
            meat : 1,
            cheese : 1, 
            bacon : 1,
            salad : 1
        }
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
                checkoutCanclled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued} />
            </div>
        ); 
    }
}


