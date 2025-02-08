import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const AccountSubscription = () => {
  return (
    <div>
      <h1>subscription pages</h1>
      <br />
      <h1>sb-43v0sy27145819@personal.example.com</h1>
      <br />
      <h1>A123456789</h1>
      <br />
      <PayPalScriptProvider options={{ clientId: "test" }}>
        <PayPalButtons style={{ layout: "vertical" }} />
      </PayPalScriptProvider>
    </div>
  );
};

export default AccountSubscription;
