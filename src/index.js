import React, { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './store/reducers';
import thunk from 'redux-thunk';

import App from './app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <Router>        
            <App />
        </Router>
    </Provider>
);

render(app, document.getElementById('root'));
