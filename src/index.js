import React from "react";
import { render } from "react-dom";

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
  render(app, document.getElementById("root"));
}
