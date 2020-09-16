import React, { Component } from 'react';

import { connect } from "react-redux";
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
 
    render() {
        return (
            <div>
                <AddPerson personAdded={this.props.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.personDeletedHandler(person.id)} />
                ))}
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
        personAddedHandler: () => dispatch(
            {
                type: 'ADD',
                payload: {
                    id: Math.random(), // not really unique but good enough here!
                    name: 'Zynxthri',
                    age: Math.floor(Math.random() * 40)
                }
            }),

        personDeletedHandler: personId => dispatch(
            {
                type: 'DELETE',
                payload: personId
            }
        )
    };
}


const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
