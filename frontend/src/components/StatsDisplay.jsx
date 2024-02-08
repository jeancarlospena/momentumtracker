import { useAuthContext } from "../hooks/useAuthContext.jsx";

const StatsDisplay = () => {
  const { user, loggedIn } = useAuthContext();
  return (
    <>
      {user && (
        <div className="global-padding">
          <h2 className="stats-title">stats</h2>
          <div className="stats-display">
            <div>
              {" "}
              <div className="stat">
                Total trades:{" "}
                <span>
                  {user.imports.metrics.wins + user.imports.metrics.losses}
                </span>
              </div>
              <div className="stat">
                Total wins:
                <span>{user.imports.metrics.wins}</span>
              </div>
              <div className="stat">
                Total losses:
                <span>{user.imports.metrics.losses}</span>
              </div>
              <div className="stat">
                Win percentage:
                <span>{user.imports.metrics.winPercentage}%</span>
              </div>
            </div>
            <div>
              {" "}
              <div className="stat">
                Average profit:
                <span>${user.imports.metrics.averageGains.toFixed(2)}</span>
              </div>
              <div className="stat">
                Average loss:
                <span>
                  -${(user.imports.metrics.averageLosses * -1).toFixed(2)}
                </span>
              </div>
              <div className="stat">
                Comulative PNL:
                <span>
                  {user.imports.metrics.comulativePNL < 0
                    ? `-$${(user.imports.metrics.comulativePNL * -1).toFixed(
                        2
                      )}`
                    : `$${user.imports.metrics.comulativePNL}`}
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
