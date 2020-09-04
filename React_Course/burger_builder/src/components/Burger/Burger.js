import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients"

const burger = (props) => {

    // Okay. This is a complicated bit of code, but it's easay to 
    // analyze. First, the Object.keys() method takes an object 
    // and transforms its keys into a array of strings, each string is 
    // a key in the original object. SUPER USEFUL method. So we take 
    // that array of key strings and return an array using the ES6 
    // spread operator. The returned value, FOR EACH key string, 
    // is an array of BurgerIngredient elements, where the key is
    // some random concatenation of the key string and its index, 
    // and the type is the string itself, which must pass props-type
    // validation. We have to pass in a key prop because we are creating
    // an array of elements. Finally, this returned array of arrays
    // is saved to the constant transformedIngredients, and is returned,
    // serving up a tasty virtual burger between two slices of the finest
    // virtual bread! 
    //
    // Also, the Array() method can be used to create arrays on the fly.
    // Also, the reduce function in this case is used to "flatten" the 
    // 2D array. Since we have an array of arrays, we use the reduce
    // method it iterate through that array and contatencate each inner
    // array with the initial value (an empty array)
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, elem) => {
            return arr.concat(elem)

        }, []); 

    


    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients.length > 0 ? transformedIngredients : <p>Put some meat on them buns!</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>

    );
}

export default burger