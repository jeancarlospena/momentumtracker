import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";

const TradesDisplay = () => {
  const { user } = useAuthContext();
  // console.log(user.imports.ordersWithMetrics.toReversed())
  // console.log(user.importAccounts.sdfg);
  return (
    <div className="global-padding">
      {!user.activeAccount.unAveilable &&
        user?.importAccounts[user.activeAccount] && (
          <>
            <h2 className="stats-title">trades</h2>

            <div className="table">
              <div className="table-heading">
                <div className="table-cell">Status</div>
                <div className="table-cell">Ticker</div>
                <div className="table-cell">Open Date</div>
                <div className="table-cell">Side</div>
                <div className="table-cell">Return</div>
                <div className="table-cell">Setup</div>
              </div>
              <div className="table-body">
                {user.importAccounts?.[
                  user.activeAccount
                ]?.ordersWithMetrics.map((orderWithMetrics) => {
                  return (
                    <Link
                      key={orderWithMetrics.tradeIndex}
                      className="table-row"
                      to={`/order/${orderWithMetrics.tradeIndex}`}
                    >
                      <div className="table-cell">
                        {orderWithMetrics.outStandingPosition !== 0 ? (
                          <span className="open">OPEN</span>
                        ) : orderWithMetrics.PNL < 0 ? (
                          <span className="loss">LOSS</span>
                        ) : (
                          <span className="won">WON</span>
                        )}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.ticker}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.orders[0].date.split(" ")[0]}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.position.toUpperCase()}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.PNL < 0
                          ? `$-${(orderWithMetrics.PNL * -1).toFixed(2)}`
                          : "$" + orderWithMetrics.PNL.toFixed(2)}
                      </div>

                      <div className="table-cell">
                        {orderWithMetrics.stup ? "setup" : "None"}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default TradesDisplay;
