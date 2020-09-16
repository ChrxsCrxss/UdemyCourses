import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Burger/Burger"
import BuildControls from "../../Burger/BulidControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../layout/AxiosOrders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 2.5,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients:{
            meat : 0,
            cheese : 0, 
            bacon : 0,
            salad : 0
        },
        totalPrice: 7,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    // The componentDidMount is commented out because of a 
    // cors error that needs to be investigated 
    // async componentDidMount() {

    //     try {

    //         const response = axios.get(`https://udmey-burger-builder-project.firebaseio.com/ingredients`);

    //         this.setState({ ingredients: response.data });


    //     } catch (err) {

    //         console.log(err);

    //     } finally {

    //         console.log('[BurgerBuilder] did mount');
    //     }

    // }


    purchaseHanlder = () => {
        this.setState({ purchasing: !this.state.purchasing })
    }

    updatePurchaseableState = (ingredients) => {

        const Sum =
            Object.keys(ingredients)
                .map((igKey) => {
                    return ingredients[igKey]
                })
                .reduce((sum, elem) => sum += elem, 0)

        this.setState({ purchaseable: Sum > 0 })

    }

    addIngredientHanlder = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })

        this.updatePurchaseableState(updatedIngredients);

    }

    removeIngredientHanlder = (type) => {

        const oldCount = this.state.ingredients[type];

        let updatedCount =
            oldCount > 0 ? oldCount - 1 : 0;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =
            oldCount > 0 ? oldPrice - priceDeduction : oldPrice;


        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })

        this.updatePurchaseableState(updatedIngredients);


    }

    purhcaseCancelHandler = () => {

        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = async () => {
        // alert("You continue");

        // this.setState({ loading: true })

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customerData: {
        //         name: "Chris",
        //         address: {
        //             street: "500 Landfair",
        //             state: "California",
        //             zipCode: 40092
        //         },
        //         email: 'testemail@gmail.com'
        //     },
        //     deliverMethod: "fastest"
        // }

        // let response;
        // try {

        //     response = await axios.post('/orders.json', {
        //         order
        //     });

        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     console.log(response);

        //     this.setState({ loading: false, purchasing: false })
        // }


        const queryParams = [] 
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); 
        }

        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });

    }


    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    clicked={this.purchaseHanlder}>

                    {this.state.ingredients && !this.state.loading ?
                        <OrderSummary
                            price={this.state.totalPrice}
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purhcaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                        />
                        : <Spinner/>
                    }

                </Modal>

                {this.state.ingredients ?

                    <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHanlder}
                            ingredientRemoved={this.removeIngredientHanlder}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable}
                            ordered={this.purchaseHanlder}
                        />
                    </Aux>
                    : <Spinner />
                }
            </Aux>

        )
    }
}



export default withErrorHandler(BurgerBuilder, axios); 