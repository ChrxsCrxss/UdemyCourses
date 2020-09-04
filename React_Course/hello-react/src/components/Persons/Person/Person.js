import React, {Component} from 'react';

import classes from './Person.css';

class Person extends Component {

  getDerivedStateFromProps(props, state) {
    console.log("[Person.js] getDerivedStateFromProps");
    return state 
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Person.js] shouldComponentUpdate");
    return true; 
  }


  getSnapshotBeforeUpdate(nextProps, nextState) {
    console.log("[Person.js] getSnapshotBeforeUpdate");
    return true; 
  }

  componentDidUpdate() {
    console.log("[Person.js] componentDidUpdate");
  }


  render () {
    console.log("[Person.js] rendering" );
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </div>
    );

  }
};

export default Person;
