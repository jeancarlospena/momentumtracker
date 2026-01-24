import { useAuthContext } from "../hooks/useAuthContext.jsx";
import Pricing from "../components/Pricing.jsx";
import MakePayment from "../components/MakePayment.jsx";
import { useEffect, useState } from "react";
import SubscribedUser from "../components/SubscribedUser.jsx";

export default function PayPalButton() {
  const { user } = useAuthContext();
  const [subscriptionDate, setSubscriptionDate] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);

  useEffect(() => {
    setSubscriptionDate(new Date(user.subscription?.endDate));
    setCurrentDate(Date.now());
  }, [user]);

  return (
    <div className="global-padding top-spacer">
      {user.subscription?.active === true && subscriptionDate > currentDate ? (
        <>
          <SubscribedUser user={user} currentDate={currentDate} />
        </>
      ) : (
        <>
          {" "}
          <Pricing />
          <MakePayment />
        </>
      )}
    </div>
  );
}
