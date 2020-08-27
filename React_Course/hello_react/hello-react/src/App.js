import React, {Component} from 'react';
import './App.css';
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput"

class App extends Component {
  
  state = {
    userName: ""
  };
  
  inputHandler = (event) => {

    this.setState({userName: event.target.value});
  
  };

  render() {

    return (
      <div className="App">
      <UserOutput
        userName={ this.state.userName || "Chris"}
      />
      <UserOutput
        userName={ this.state.userName || "Mulon"}
      />
      <UserOutput
        userName={ this.state.userName || "Sky"}
      />

      <UserInput
        inputHandler={this.inputHandler}
        userName={this.state.userName}
      />
    </div>

    )
  }

}

export default App;
