import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TradesDisplay = ({ startDate, endDate, displayOrderResult }) => {
  const { user } = useAuthContext();

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
                {/* <div className="table-cell">Setup</div> */}
              </div>
              <div className="table-body">
                {user.importAccounts?.[
                  user.activeAccount
                ]?.ordersWithMetrics.map((orderWithMetrics) => {
                  const orderOpenDate = new Date(
                    orderWithMetrics.orders[0].date
                  );
                  const orderStatus =
                    orderWithMetrics.outStandingPosition !== 0
                      ? "open"
                      : orderWithMetrics.PNL < 0
                      ? "loss"
                      : "won";
                  if (
                    displayOrderResult !== "" &&
                    orderStatus !== displayOrderResult
                  ) {
                    return;
                  }
                  // if (orderOpenDate < startDate) {
                  //   return;
                  // }
                  const dateFormated = orderWithMetrics.orders[0].date
                    .split("T")[0]
                    .split("-");
                  return (
                    <Link
                      key={orderWithMetrics.tradeIndex}
                      className="table-row"
                      to={`/order/${orderWithMetrics.tradeIndex}`}
                    >
                      <div className="table-cell">
                        {orderWithMetrics.outStandingPosition !== 0 ? (
                          <span className="status-tag open">OPEN</span>
                        ) : orderWithMetrics.PNL < 0 ? (
                          <span className="status-tag loss">LOSS</span>
                        ) : (
                          <span className="status-tag won">WON</span>
                        )}
                      </div>
                      <div className="table-cell">
                        {/* {orderWithMetrics.tradeIndex} */}
                        {orderWithMetrics.ticker}
                      </div>
                      <div className="table-cell">
                        {`${dateFormated[1]}/${dateFormated[2]}/${dateFormated[0]}`}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.position.toUpperCase()}
                      </div>
                      <div className="table-cell">
                        {orderWithMetrics.PNL < 0
                          ? `$-${(orderWithMetrics.PNL * -1).toFixed(2)}`
                          : "$" + orderWithMetrics.PNL.toFixed(2)}
                      </div>

                      {/* <div className="table-cell">
                        {orderWithMetrics.stup ? "setup" : "None"}
                      </div> */}
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
