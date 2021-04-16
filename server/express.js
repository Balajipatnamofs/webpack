const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter, matchPath } = require("react-router-dom");
import App from "../src/app";
import { HelmetProvider } from "react-helmet-async";

// create express application
const app = express();

// import App component

// import routes
const routes = require("./routes");

// serve static assets
app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, "../dist"))
);

// for any other requests, send `index.html` as a response
app.use("*", async (req, res) => {
  if (typeof window === "undefined") {
    global.window = {};
  }
  // get matched route
  const matchRoute = routes.find((route) => matchPath(req.originalUrl, route));

  // fetch data of the matched component
  let componentData = {};
  // if (
  //   typeof matchRoute &&
  //   matchRoute.component &&
  //   matchRoute.component.fetchData === "function"
  // ) {
  //   componentData = await matchRoute.component.fetchData();
  // }

  // read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    {
      encoding: "utf8"
    }
  );
  const helmetContext = {};

  // get HTML string from the `App` component
  let appHTML = ReactDOMServer.renderToString(
    // <StaticRouter location={req.originalUrl} context={componentData}>
    <HelmetProvider context={helmetContext}>
      {" "}
      <StaticRouter location={req.originalUrl} context={componentData}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;

  // populate `#app` element with `appHTML`
  indexHTML = indexHTML
    .replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
    .replace(
      "<head>",
      ` ${updateMeta(matchRoute)}
      `
    );
  // set value of `initial_state` global variable
  indexHTML = indexHTML.replace(
    "var initial_state = null;",
    `var initial_state = ${JSON.stringify(componentData)};`
  );
  // set header and status
  res.contentType("text/html");
  res.status(200);
  return res.send(indexHTML);
});

// run express server on port 9000
app.listen("9002", () => {
  console.log("Express server started at http://localhost:9000");
});

function updateMeta(route) {
  let meta = (route && route.meta) || null;
  return `
        <title>ObjectFrontier - ${
          meta && meta.title ? meta.title : "Home"
        } </title>
        <meta name="description" content="${
          meta && meta.description ? meta.description : "Home"
        }" />
        <meta name="keywords" content="OFS" />
        <meta property="og:url" content="https://www.objectfrontier.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${
          meta && meta.title ? meta.title : "Home"
        }" />
        <meta property="og:description" content="${
          meta && meta.description ? meta.description : "Home"
        }" />
        <meta property="og:image" content="../src/assets/logo.svg" />
        <meta property="og:site_name" content="European Travel, Inc." />
        <meta name="twitter:title" content="${
          meta && meta.title ? meta.title : "Home"
        }" />
        <meta name="twitter:description" content="${
          meta && meta.description ? meta.description : "Home"
        }" />
        <meta name="twitter:image" content="../src/assets/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Alt text for image" />`;
}
