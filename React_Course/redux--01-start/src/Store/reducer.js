
const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {

    const newState = { ...state };
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            }
        case 'STORE_RESULT':
            console.log('stored')
            console.log(state.results);
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        default:
            console.error('unrecognized action type');
            break;
    }
    return newState;

};

export default reducer; 