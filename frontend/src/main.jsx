import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styling/index.css";
import "./styling/header.css";
import "./styling/home.css";
import "./styling/userforms.css";
import "./styling/tradesdisplay.css";
import "./styling/usermain.css";
import "./styling/statsdisplay.css";
import "./styling/importfiles.css";
import "./styling/tradereview.css";
import "./styling/selectmenu.css";

// import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
