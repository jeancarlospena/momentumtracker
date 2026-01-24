import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

import Chart from "../charts/Chart.jsx";

const TradeReview = () => {
  const navigate = useNavigate();
  const { user, loadedTrades } = useAuthContext();
  const { orderid } = useParams();
  useEffect(() => {
    // if (!user.importAccounts[user.activeAccount].ordersWithMetrics[orderid]) {
    //   navigate("/dashboard");
    // }
  }, []);
  const selectedOrder = user.importAccounts[user.activeAccount].find(
    (trade) => {
      return trade._id === orderid;
    }
  );
  return (
    <div className="global-padding">
      {user && selectedOrder && (
        <>
          <div className="trade-info-board">
            <div className="orders-placed">
              <span className="stats-title">position</span>

              <div className="trade-intro">
                <span className="trade-intro-span">
                  {selectedOrder.ticker}{" "}
                </span>
                <span className="trade-intro-span">
                  {selectedOrder.outStandingPosition !== 0 ? (
                    <span className="status-tag open">OPEN</span>
                  ) : selectedOrder.PNL < 0 ? (
                    <span className="status-tag  loss">
                      LOSS -$
                      {(selectedOrder.PNL * -1).toFixed(2)}
                    </span>
                  ) : (
                    <span className="status-tag won">
                      WON ${selectedOrder.PNL.toFixed(2)}
                    </span>
                  )}
                </span>
                <span className="trade-intro-span">
                  {selectedOrder.position} position
                </span>
              </div>
            </div>
            <div className="orders-placed">
              <span className="stats-title">trades</span>
              {selectedOrder.orders.map((order, ind) => {
                return (
                  <div key={ind} className="order-breakdown">
                    <div className="order-detail">
                      {order.action} {order.date.split("T")[0]}
                    </div>
                    <div className="order-detail">
                      {order.sharesQty} @ ${order.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <Chart ticker={ticker}></Chart> */}
        </>
      )}
    </div>
  );
};

export default TradeReview;
