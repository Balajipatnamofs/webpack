import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

// import { Provider } from "react-redux";
// import store from "./store";
import App from "./app";

const app = (
  // <Provider>
  <Router>
    <App />
  </Router>
  // </Provider>
);

// Render only in the browser, export otherwise
render(app, document.getElementById("root"));
