import React, { Component } from 'react';

// You have to import the BrowswerRouter object and wrap
// The application inside it to use client-side routing 
import { BrowserRouter } from "react-router-dom";

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (

      // This is how you enable client-side routing with 
      // the BrowserRouter Component 
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
