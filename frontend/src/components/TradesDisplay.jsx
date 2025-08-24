import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TradesDisplay = ({
  startDate,
  endDate,
  displayOrderResult,
  selectedOrderSide,
  searchedSymbol,
  setMetrics,
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
    cumulativePNL: 0,
    wins: 0,
    losses: 0,
    profitGained: 0,
    profitLoss: 0,
    averageGains: 0,
    averageLosses: 0,
    winPercentage: 0,
  };

  const tableRows = user.importAccounts?.[user.activeAccount]?.ordersWithMetrics
    ?.map((orderWithMetrics, i) => {
      const orderOpenDate = new Date(orderWithMetrics.orders[0].date);

      const orderStatus =
        orderWithMetrics.outStandingPosition !== 0
          ? "open"
          : orderWithMetrics.PNL < 0
          ? "loss"
          : "won";

      const filterResult =
        displayOrderResult !== "all" && orderStatus !== displayOrderResult;
      const filterStartDate = orderOpenDate < startDate;
      const filterEndDate = orderOpenDate > endDate;
      const filterSide =
        selectedOrderSide === "all"
          ? false
          : orderWithMetrics.position !== selectedOrderSide;

      const filterSymbol = symbolComparison(orderWithMetrics.ticker);

      if (
        filterResult ||
        filterStartDate ||
        filterEndDate ||
        filterSide ||
        filterSymbol
      ) {
        return null; // skip rendering this item
      }

      // Accumulate performance metrics
      if (orderStatus === "loss" || orderStatus === "won") {
        performanceTracker.cumulativePNL += orderWithMetrics.PNL;

        if (orderWithMetrics.PNL <= 0) {
          performanceTracker.losses += 1;
          performanceTracker.profitLoss += orderWithMetrics.PNL;
        } else {
          performanceTracker.wins += 1;
          performanceTracker.profitGained += orderWithMetrics.PNL;
        }
      }

      const dateFormatted = orderWithMetrics.orders[0].date
        .split("T")[0]
        .split("-");

      return (
        <Link
          key={orderWithMetrics.tradeIndex}
          className="table-row"
          to={`/order/${orderWithMetrics.tradeIndex}`}
        >
          <div className="table-cell">
            {orderStatus === "open" ? (
              <span className="status-tag open">OPEN</span>
            ) : orderStatus === "loss" ? (
              <span className="status-tag loss">LOSS</span>
            ) : (
              <span className="status-tag won">WON</span>
            )}
          </div>
          <div className="table-cell">{orderWithMetrics.ticker}</div>
          <div className="table-cell">
            {`${dateFormatted[1]}/${dateFormatted[2]}/${dateFormatted[0]}`}
          </div>
          <div className="table-cell">
            {orderWithMetrics.position.toUpperCase()}
          </div>
          <div className="table-cell">
            {orderWithMetrics.PNL < 0
              ? `$-${Math.abs(orderWithMetrics.PNL).toFixed(2)}`
              : `$${orderWithMetrics.PNL.toFixed(2)}`}
          </div>
        </Link>
      );
    })
    .filter(Boolean); // Remove skipped (null) entries
  if (performanceTracker.losses > 0) {
    performanceTracker.averageLosses = (
      performanceTracker.profitLoss / performanceTracker.losses
    ).toFixed(2);
  }
  if (performanceTracker.wins > 0) {
    performanceTracker.averageGains = (
      performanceTracker.profitGained / performanceTracker.wins
    ).toFixed(2);
  }
  if (
    displayOrderResult !== "open" &&
    (performanceTracker.wins > 0 || performanceTracker.losses > 0)
  )
    performanceTracker.winPercentage = Math.round(
      (performanceTracker.wins * 100) /
        (performanceTracker.wins + performanceTracker.losses)
    );
  performanceTracker.cumulativePNL =
    performanceTracker.cumulativePNL.toFixed(2);

  useEffect(() => {
    setMetrics(performanceTracker);
  }, [
    startDate,
    endDate,
    displayOrderResult,
    selectedOrderSide,
    searchedSymbol,
  ]);
  return (
    <div className="global-padding">
      <div className="table-heading">
        <div className="table-cell">Status</div>
        <div className="table-cell">Ticker</div>
        <div className="table-cell">Open Date</div>
        <div className="table-cell">Side</div>
        <div className="table-cell">Return</div>
        {/* <div className="table-cell">Setup</div> */}
      </div>
      {tableRows}
    </div>
  );
};

export default TradesDisplay;
