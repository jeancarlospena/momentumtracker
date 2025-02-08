import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TradesInDay = () => {
  const { date } = useParams();
  const { user } = useAuthContext();
  const [allTradesForDate, setAllTradesForDate] = useState([]);
  useEffect(() => {
    const tradesInDay = [];
    user.importAccounts[user.activeAccount].ordersWithMetrics.map((trade) => {
      const checkOpenDate = trade.orders[0].date.split("T")[0] === date;
      const checkClosedDate =
        trade.orders[trade.orders.length - 1].action === "closed" &&
        trade.orders[trade.orders.length - 1].date.split("T")[0] === date;
      if (checkOpenDate || checkClosedDate) {
        tradesInDay.push(
          <Link
            key={trade.tradeIndex}
            className="table-row"
            to={`/order/${trade.tradeIndex}`}
          >
            <div className="table-cell">
              {trade.outStandingPosition !== 0 ? (
                <span className="status-tag open">OPEN</span>
              ) : trade.PNL < 0 ? (
                <span className="status-tag loss">LOSS</span>
              ) : (
                <span className="status-tag won">WON</span>
              )}
            </div>
            <div className="table-cell">{trade.ticker}</div>
            <div className="table-cell">
              {trade.orders[0].date.split("T")[0]}
            </div>
            <div className="table-cell">{trade.position.toUpperCase()}</div>
            <div className="table-cell">
              {trade.PNL < 0
                ? `$-${(trade.PNL * -1).toFixed(2)}`
                : "$" + trade.PNL.toFixed(2)}
            </div>
          </Link>
        );
      }
    });
    setAllTradesForDate(tradesInDay);
  }, []);

  return (
    <div className="global-padding">
      <div className="date-on-display">
        <span> View all trades with orders on: {` ${date}`}</span>
      </div>
      <div className="table">
        {" "}
        <div className="table-heading">
          <div className="table-cell">Status</div>
          <div className="table-cell">Ticker</div>
          <div className="table-cell">Open Date</div>
          <div className="table-cell">Side</div>
          <div className="table-cell">Return</div>
          {/* <div className="table-cell">Setup</div> */}
        </div>
        <div className="table-body">{allTradesForDate}</div>
      </div>
    </div>
  );
};
export default TradesInDay;
