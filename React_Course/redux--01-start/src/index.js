import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'; 
import reducer from "./Store/reducer"; 
import { Provider } from "react-redux"; 

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action); 
            console.log('[Middleware] next state', store.getState());
            return result;  
        }
    }
}

const store = createStore( reducer, applyMiddleware(logger) ); 


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
