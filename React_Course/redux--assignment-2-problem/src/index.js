import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// First, impor the method to initialize the store
import { createStore } from 'redux';

// Next import the Provider component from react-redux
import { Provider } from 'react-redux'; 

// Import the reducer, i.e., the logic to immutably update the store
import reducer from "./store/reducer"; 

// create a store using the reducer 
const store = createStore( reducer );

// Wrap the entire application in the Provider component 
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
