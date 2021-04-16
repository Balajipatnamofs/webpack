import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import App components
import App from "./app";
// compile App component in `#app` HTML element
hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
