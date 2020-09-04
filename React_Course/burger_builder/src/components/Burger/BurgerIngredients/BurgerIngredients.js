import React, { Component } from "react";
import classes from "./BurgerIngredients.module.css"
import Proptypes from "prop-types";


class BurgerIngredient extends Component {

    render() {
        
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                )
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}> </div>
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            default:
                ingredient = null; 
                break;
        }

        return ingredient; 
    }

}

// This uses prop-types, which is an external package that 
// faciliates prop type validation. The validation is given
// in the form of a JSON object. This validation requires
// that 'type' be of type string and is requried 
BurgerIngredient.propTypes = {
    type: Proptypes.string.isRequired
}

export default BurgerIngredient