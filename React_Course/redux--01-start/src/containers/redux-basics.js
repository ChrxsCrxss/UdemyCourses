/**
 * Toy example with Redux 
 */
const redux = require('redux'); 
const createStore = redux.createStore;

const initialState = {
    counter : 0
}
// Reducer Initialization, All callbacks are merged into one
// reducer 
const rootReducer = (state = initialState, action) => {

    const newState = {...state};

    if (action.type === 'INC_COUNTER') {

        // Nonmutation. first spread the object, next override
        // specifc value of the counter property 
        return {
            ...state, 
            counter : state.counter + 1
        }
    }

    if (action.type === 'ADD_COUNTER') {
        newState.counter += action.value; 
        return newState; 
    }

}
// Store
const store = createStore( rootReducer ); 
console.log(store.getState());

// Subscription 
store.subscribe(() => {
    console.log('[Subscriptoin]', store.getState());
});

// Dispatching Action 
store.dispatch({type : 'INC_COUNTER'}); 
store.dispatch({type : 'ADD_COUNTER', value : 10});
console.log(store.getState()); 