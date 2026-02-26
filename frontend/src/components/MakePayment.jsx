import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";

export default function MakePayment() {
  const { user, dispatch } = useAuthContext();
  const [program, setProgram] = useState("exclusive");

  const handleCreateOrder = async () => {
    const response = await fetch(
      "/api/paypal/create-order",
      // "http://localhost:3000/api/paypal/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program }),
      },
    );
    const data = await response.json();

    return data.id; // order ID
  };

  const handleApprove = async (data) => {
    const response = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: data.orderID }),
    });
    const capture = await response.json();
    if (capture.success) {
      dispatch({ type: "UPDATE_SUBSCRIPTION", payload: capture.subscription });
    }
  };

  return (
    <div className="top-spacer">
      <div className="payment-section">
        <div className="select-program-section">
          <h2>Select Program</h2>

          <button
            className={`select-program ${
              program === "dedicated" && "selected-plan"
            }`}
            onClick={() => setProgram("dedicated")}
          >
            <div className="select-program-top">
              <h2 className="center-text">Dedicated Trader $129</h2>
            </div>
            <p className="select-program-description">
              Signals for <b>4 Months!</b>
            </p>
          </button>
          <button
            className={`select-program ${
              program === "exclusive" && "selected-plan"
            }`}
            onClick={() => setProgram("exclusive")}
          >
            <div className="select-program-top">
              <h2 className="center-text">Exclusive Trader $349</h2>
            </div>
            <p className="select-program-description">
              Signals for <b>1 Year!</b>
            </p>
          </button>
        </div>
        <div className="paypal-buttons">
          {/* <h2 className="basic-title">
            Subscription:{" "}
            {user.subscription.active ? `active until ` : `Not active`}
          </h2>
          <p>sb-43v0sy27145819@personal.example.com</p>
          <p>A123456789</p>
          <br /> */}
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD",
              disableFunding: "paylater",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

// {
//   id: '23575407AS865210P',
//   paymentSource: {
//     paypal: {
//       emailAddress: 'sb-43v0sy27145819@personal.example.com',
//       accountId: 'H75V6E2HFF52Q',
//       accountStatus: 'VERIFIED',
//       name: [Object],
//       address: [Object]
//     }
//   },
//   payer: {
//     emailAddress: 'sb-43v0sy27145819@personal.example.com',
//     payerId: 'H75V6E2HFF52Q',
//     name: { givenName: 'Chris', surname: 'Buy' },
//     address: { countryCode: 'US' }
//   },
//   purchaseUnits: [
//     { referenceId: 'default', shipping: [Object], payments: [Object] }
//   ],
//   status: 'COMPLETED',
//   links: [
//     {
//       href: 'https://api.sandbox.paypal.com/v2/checkout/orders/23575407AS865210P',
//       rel: 'self',
//       method: 'GET'
//     }
//   ]
// }
