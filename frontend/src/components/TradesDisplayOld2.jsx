import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TradesDisplay = ({
  startDate,
  endDate,
  displayOrderResult,
  selectedOrderSide,
  searchedSymbol,
}) => {
  const { user } = useAuthContext();

  // console.log(
  //   user.importAccounts?.[user.activeAccount].ordersWithMetrics[0].orders.at(-1)
  // );
  const symbolLength = searchedSymbol.length;
  const symbolComparison = (ticker) => {
    if (symbolLength > ticker.length) return true;
    const currentSymbol = ticker.slice(0, symbolLength);
    if (searchedSymbol === currentSymbol) {
      return false;
    } else {
      return true;
    }
  };

  const performanceTracker = {
    PNL: 0,
    wins: 0,
    losses: 0,
    profitGained: 0,
    profitLoss: 0,
  };

  return (
    <div className="global-padding">
      {!user.activeAccount.unAveilable &&
        user?.importAccounts[user.activeAccount] && (
          <>
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
                ]?.ordersWithMetrics.map((orderWithMetrics, i) => {
                  if (i === 0) {
                    const performanceTracker = { PNL: 0 };
                  }

                  const orderOpenDate = new Date(
                    orderWithMetrics.orders[0].date
                  );
                  // const closedDate = new Date(
                  //   orderWithMetrics.orders.at(-1).date
                  // );
                  // const ordAction = orderWithMetrics.orders.at(-1).action

                  const orderStatus =
                    orderWithMetrics.outStandingPosition !== 0
                      ? "open"
                      : orderWithMetrics.PNL < 0
                      ? "loss"
                      : "won";

                  const filterResult =
                    displayOrderResult !== "all" &&
                    orderStatus !== displayOrderResult;
                  const filterStartDate = orderOpenDate < startDate;
                  const filterEndDate = orderOpenDate > endDate;
                  const filterSide =
                    selectedOrderSide === "all"
                      ? false
                      : orderWithMetrics.position === selectedOrderSide
                      ? false
                      : true;

                  const filterSymbol = symbolComparison(
                    orderWithMetrics.ticker
                  );
                  if (
                    filterResult ||
                    filterStartDate ||
                    filterEndDate ||
                    filterSide ||
                    filterSymbol
                  ) {
                    return;
                  }
                  if (orderStatus === "loss" || orderStatus === "won") {
                    performanceTracker.PNL += orderWithMetrics.PNL;
                    if (orderWithMetrics.PNL <= 0) {
                      performanceTracker.losses += 1;
                      performanceTracker.profitLoss += orderWithMetrics.PNL;
                    } else {
                      performanceTracker.wins += 1;
                      performanceTracker.profitGained += orderWithMetrics.PNL;
                    }
                    console.log(performanceTracker);
                    console.log(orderWithMetrics);
                  }

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
