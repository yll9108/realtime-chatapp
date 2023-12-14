import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import GlobalStyle from "./globalStyles";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStyle />
                <App />
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
