import { useAuthContext } from "../hooks/useAuthContext.jsx";

const StatsDisplay = ({ metrics }) => {
  const { user } = useAuthContext();
  // console.log(metrics);
  return (
    <div>
      {!user?.activeAccount?.unAveilable &&
        !user?.importAccounts?.[user.activeAccount]?.empty && (
          <div className="stats-section">
            <div className="stats-display">
              <div className="stat-group">
                <div className="stat">
                  Total Trades: <span>{metrics.wins + metrics.losses}</span>
                </div>
                <div className="stat">
                  Total Wins:
                  <span>{metrics.wins}</span>
                </div>
                <div className="stat">
                  Total Losses:
                  <span>{metrics.losses}</span>
                </div>
              </div>
              <div className="stat-group">
                <div className="stat">
                  Win Percentage:
                  <span>{metrics.winPercentage}%</span>
                </div>
                <div className="stat">
                  Average Profit:
                  <span>${metrics.averageGains}</span>
                </div>
                <div className="stat">
                  Average Loss:
                  <span>
                    -$
                    {(metrics.averageLosses * -1).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="stat">
                Cumulative PNL:
                <span>
                  {metrics.cumulativePNL < 0
                    ? `-$${(metrics.cumulativePNL * -1).toFixed(2)}`
                    : `$${metrics.cumulativePNL}`}
                </span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default StatsDisplay;
