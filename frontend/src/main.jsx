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
import "./styling/profile.css";
import "./styling/calendar.css";
import "./styling/footer.css";
import "./styling/sidenavigator.css";
import "./styling/activebar.css";
import "./styling/frequentlyasked.css";
import "./styling/pricing.css";

// import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <PayPalScriptProvider deferLoading={true}>
      <App />
    </PayPalScriptProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
