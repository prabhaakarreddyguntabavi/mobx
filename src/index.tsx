import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import "./i18n/index";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
// reportWebVitals();
