import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import express from "express";
import reload from "reload";
import App from "./app";
import theme from "./theme";
import { StaticRouter } from "react-router-dom";
const app = express();

const port = 3001;
const dev = process.env.NODE_ENV === "development";

app.use(express.static("public"));

if (dev) {
  reload(app);
}

app.use((req, res) => {
  const sheets = new ServerStyleSheets();

  const html = renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    )
  );

  const css = sheets.toString();

  res.send(
    `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
      <title>React App</title>
      <style id='jss-styles'>${css}</style>
      <link rel="stylesheet" type="text/css" href="./styles.css" />
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    </head>
    <body>
      <div id='root'>${html}</div>
      <script src='main.js' async type = "text/babel"></script>
      ${dev ? `<script src='/reload/reload.js' async></script>` : ""}
    </body>
    </html>
  `.trim()
  );
});

app.listen(port, () => `http://localhost:${port}`);
