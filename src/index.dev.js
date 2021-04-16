import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./app";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// Render only in the browser, export otherwise
render(app, document.getElementById("root"));
