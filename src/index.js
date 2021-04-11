import React from "react";
import { hydrate } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import App from "./app";

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
// Render only in the browser, export otherwise
if (typeof document === "undefined") {
  module.exports = app;
} else {
  hydrate(app, document.getElementById("root"));
}
