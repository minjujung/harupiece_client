import React from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import "./index.css";
import App from "./shared/App";
import { Provider } from "react-redux";

import store from "./redux/configureStore";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
