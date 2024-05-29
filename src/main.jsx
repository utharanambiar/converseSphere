import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import i18n from "../i18n.js";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider>
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
