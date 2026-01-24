import { useEffect, useState } from "react";

const SubscribedUser = ({ user }) => {
  const [linkDate, setLinkDate] = useState(0);
  const [currentDate, setCurrentDate] = useState(0);
  useEffect(() => {
    setLinkDate(new Date(user.subscription.telegramLinkExpiration).getTime());
    setCurrentDate(Date.now());
  }, [user]);

  return (
    <div>
      <div>
        <h2>Plan Level</h2>
        <p>{user.subscription.planLevel}</p>
      </div>
      <div>
        <h2>Active Subscription Period</h2>
        <p>
          {user.subscription.startDate.split("T")[0]} to{" "}
          {user.subscription.endDate.split("T")[0]}
        </p>
      </div>
      <div>
        <h2>Telegram Invite Link</h2>
        {linkDate < currentDate && (
          <p>
            Your link has expired, please contract support to get a new one. If
            you're already in the telegram group no acion is needed.
          </p>
        )}
        {linkDate > currentDate && (
          <a href={user.subscription.telegramLink} target="_blank">
            Join Telegram Signals Group (Single use, expires in 24 hours)
          </a>
        )}
      </div>
    </div>
  );
};

export default SubscribedUser;
