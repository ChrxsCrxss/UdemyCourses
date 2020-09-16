

const initialState = {
    persons : []
}

/**
 * The reducer is a module that handles updates 
 * to the store. I takes a state, and an action 
 */
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD':
            return {
                persons : state.persons.concat(action.payload)
            }
            break;
        case 'DELETE':
            return {
                persons : state.persons.filter(person => person.id != action.payload) 
            }
        default:
            console.error('unknown action type'); 
            break;
    }

    return state; 
}

export default reducer
