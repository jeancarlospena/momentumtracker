import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";

const TradesDisplay = () => {
  const { user } = useAuthContext();
  // console.log(user.imports.ordersWithMetrics.toReversed());
  return (
    <>
      {user?.imports?.ordersWithMetrics && (
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

            {user.imports.ordersWithMetrics.map((orderWithMetrics, ind) => {
              return (
                <Link key={ind} className="table-row" to={`/order/${ind}`}>
                  <div className="table-cell">
                    {orderWithMetrics.PNL < 0 ? (
                      <span className="loss">LOSS</span>
                    ) : (
                      <span className="won">WON</span>
                    )}
                  </div>
                  <div className="table-cell">{orderWithMetrics.ticker}</div>
                  <div className="table-cell">
                    {orderWithMetrics.orders[0].date.split(" ")[0]}
                  </div>
                  <div className="table-cell">
                    {orderWithMetrics.position.toUpperCase()}
                  </div>
                  <div className="table-cell">
                    {orderWithMetrics.PNL < 0
                      ? `-$${(orderWithMetrics.PNL * -1).toFixed(2)}`
                      : "$" + orderWithMetrics.PNL.toFixed(2)}
                  </div>

                  <div className="table-cell">
                    {orderWithMetrics.stup ? "setup" : "None"}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default TradesDisplay;
