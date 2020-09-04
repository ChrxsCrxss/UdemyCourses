import React, { Component } from 'react';
import Layout from "./components/layout/layout";
import BurgerBuilder from "./components/containers/BugerBuilder/BurgerBuilder";
import Checkout from './components/containers/Checkout/Checkout';
import { Route, Switch } from "react-router-dom";

// Note, component has to be capitalized here. 
class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' exact component={Checkout} />
          </Switch>
        </Layout>
      </div>

    )
  }
}
export default App;
