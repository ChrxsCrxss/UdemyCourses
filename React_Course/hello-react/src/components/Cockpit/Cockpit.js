import React, {useEffect} from "react"; 

import classes from "./Cockpit.css"

const cockpit = (props) => {


    // the useEffect hook combines componentDidMount and componentDidUpdate
    // the callback function is called each time the virtual DOM is rendered
    // by providing a second argument (an array), you can specify when the 
    // callback should execute. In this case, the callback will execute only
    // when there is a change to props.persons, which is passed from a parent
    // element 
    useEffect(() => {
        console.log("Cockpit.js useEffect");

        setTimeout(() => {
            console.log("saved data to cloud");
        }, 1000);
    }, [props.persons])

    // To make the callback execute only once, pass in an empty array
    // nothing can never change... so philosophical. Yes, you can 
    // have multiple calls to useEffect 
    useEffect(() => {
        console.log("Cockpit.js useEffect");

        setTimeout(() => {
            console.log("I'm only going to run once!");
        }, 1000);
    }, [])

    const assignedClasses = [];

    let btnClass = ''; 

    if (props.showPerson) {
        btnClass = classes.Red; 
    }

    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }


    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.click}>
                Toggle Persons
            </button>

        </div>

    )

}

export default cockpit; 