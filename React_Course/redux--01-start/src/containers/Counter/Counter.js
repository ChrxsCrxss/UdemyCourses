import React, { Component } from 'react';

/**
 * Connect is a high-order function
 */
import { connect } from  'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}   />
                <CounterControl label="Add 5" clicked={ () => this.props.onAddCounter(5) }  />
                <CounterControl label="Subtract 5" clicked={ () => this.props.onSubtractCounter(5) }  />
                <hr/>
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(storedResult => {
                         return <li onClick={this.props.onDeleteResult}> {storedResult.value} </li>
                    })}
                </ul>
            </div>
        );
    }
}


/**
 * Basically, you use connect from react-redux to pass slices of the
 * state and actions to the component right before export. the type
 * property is a mandatory field: it is used to identify actions in the
 * reducer to appropriately update state. 
 */
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' }), 
        onDecrementCounter: () => dispatch({ type: 'DECREMENT' }), 
        onAddCounter: (value) => dispatch({ type: 'ADD', value : value }), 
        onSubtractCounter: (value) => dispatch({ type: 'SUBTRACT', value : value }), 
        onStoreResult: () => dispatch({ type : 'STORE_RESULT'}),
        onDeleteResult: () => dispatch({ type : 'DELETE_RESULT'}),
    };
}

const mapStateToProps = state => {
    return {
        ctr : state.counter,
        storedResults : state.results
    }; 
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Counter);