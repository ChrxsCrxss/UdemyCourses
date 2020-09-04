import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios"; 


// This allows us to intercept and edit any request. It is applied globally. This makess
// sense if you want to log 
const myRequestInterceptor = axios.interceptors.request.use(request => {
    console.log(request); 
    // Edit request config

    // BE SURE TO RETURN THE REQUEST 
    return request; 
}, error => {
    console.log('Global interceptor handling ' + error);
    return Promise.reject(error); 
}); 

const myResponseInterceptor = axios.interceptors.response.use(response => {
    console.log(response); 
    // Edit request config

    // BE SURE TO RETURN THE REQUEST 
    return response; 
}, error => {
    console.log('Global interceptor handling ' + error);
    return Promise.reject(error); 
});


// You can dynamically disable interceptors using the 
// following methods. Comment these out to see the above
// interceptors in action
axios.interceptors.request.eject(myRequestInterceptor);
axios.interceptors.response.eject(myResponseInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
