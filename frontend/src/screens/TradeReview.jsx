import { useEffect, useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

import Chart from "../charts/Chart.jsx";

const TradeReview = ({ ticker }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { index } = useParams();

  useEffect(() => {
    if (!user.importAccounts[user.activeAccount].ordersWithMetrics[index]) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="global-padding">
      {user &&
        user.importAccounts[user.activeAccount].ordersWithMetrics[index] && (
          <>
            <div className="trade-info-board">
              <div className="orders-placed">
                <span className="stats-title">position</span>

                <div className="trade-intro">
                  <span className="trade-intro-span">
                    {
                      user.importAccounts[user.activeAccount].ordersWithMetrics[
                        index
                      ].ticker
                    }{" "}
                  </span>
                  <span className="trade-intro-span">
                    {user.importAccounts[user.activeAccount].ordersWithMetrics[
                      index
                    ].outStandingPosition !== 0 ? (
                      <span className="status-tag open">OPEN</span>
                    ) : user.importAccounts[user.activeAccount]
                        .ordersWithMetrics[index].PNL < 0 ? (
                      <span className="status-tag  loss">
                        LOSS -$
                        {(
                          user.importAccounts[user.activeAccount]
                            .ordersWithMetrics[index].PNL * -1
                        ).toFixed(2)}
                      </span>
                    ) : (
                      <span className="status-tag won">
                        WON $
                        {user.importAccounts[
                          user.activeAccount
                        ].ordersWithMetrics[index].PNL.toFixed(2)}
                      </span>
                    )}
                  </span>
                  <span className="trade-intro-span">
                    {
                      user.importAccounts[user.activeAccount].ordersWithMetrics[
                        index
                      ].position
                    }{" "}
                    position
                  </span>
                </div>
              </div>
              <div className="orders-placed">
                <span className="stats-title">trades</span>
                {user.importAccounts[user.activeAccount].ordersWithMetrics[
                  index
                ].orders.map((order, ind) => {
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
            <Chart ticker={ticker}></Chart>
          </>
        )}
    </div>
  );
};

export default TradeReview;
