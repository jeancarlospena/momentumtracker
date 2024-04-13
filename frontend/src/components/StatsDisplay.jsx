import { useAuthContext } from "../hooks/useAuthContext.jsx";

const StatsDisplay = () => {
  const { user } = useAuthContext();
  return (
    <>
      {!user?.activeAccount?.unAveilable &&
        !user?.importAccounts?.[user.activeAccount]?.empty && (
          <div className="">
            <h2 className="stats-title">stats</h2>
            <div className="stats-display">
              <div>
                {" "}
                <div className="stat">
                  Total trades:{" "}
                  <span>
                    {user?.importAccounts[user.activeAccount].metrics.wins +
                      user?.importAccounts[user.activeAccount].metrics.losses}
                  </span>
                </div>
                <div className="stat">
                  Total wins:
                  <span>
                    {user?.importAccounts[user.activeAccount].metrics.wins}
                  </span>
                </div>
                <div className="stat">
                  Total losses:
                  <span>
                    {user?.importAccounts[user.activeAccount].metrics.losses}
                  </span>
                </div>
                <div className="stat">
                  Win percentage:
                  <span>
                    {
                      user?.importAccounts[user.activeAccount].metrics
                        .winPercentage
                    }
                    %
                  </span>
                </div>
              </div>
              <div>
                {" "}
                <div className="stat">
                  Average profit:
                  <span>
                    $
                    {user?.importAccounts[
                      user.activeAccount
                    ].metrics.averageGains.toFixed(2)}
                  </span>
                </div>
                <div className="stat">
                  Average loss:
                  <span>
                    -$
                    {(
                      user?.importAccounts[user.activeAccount].metrics
                        .averageLosses * -1
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="stat">
                  Comulative PNL:
                  <span>
                    {user?.importAccounts[user.activeAccount].metrics
                      .comulativePNL < 0
                      ? `-$${(
                          user?.importAccounts[user.activeAccount].metrics
                            .comulativePNL * -1
                        ).toFixed(2)}`
                      : `$${
                          user?.importAccounts[user.activeAccount].metrics
                            .comulativePNL
                        }`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default StatsDisplay;
