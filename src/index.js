import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { AuthContextProvider } from "./../src/store/authContext"

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>, document.getElementById("root"));

