import React, { Component } from "react"; 

class UserInput extends Component {



    render () {
        return (
            <input 
            onChange={this.props.inputHandler}
            value={this.props.userName}
            /> 
        )
    }


}

export default UserInput; 