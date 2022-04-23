import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <ToastProvider autoDismissTimeout={3000} placement="top-right">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById("root")
);

reportWebVitals();
