import axios from "axios";
import { useEffect, useState } from "react";
import CandlestickChart from "../charts/CandlestickChart.jsx";
import ChartPriceLevels from "../charts/ChartPriceLevels.jsx";
import ChartDates from "../charts/ChartDates.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { dateToStringDate } from "../scripts/dateScripts.js";

import Chart from "../charts/Chart.jsx";

const TradeReview = ({ ticker }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { index } = useParams();

  useEffect(() => {
    if (!user.imports.ordersWithMetrics[index]) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      {user && user.imports.ordersWithMetrics[index] && (
        <>
          <div className="trade-info-board">
            <div>
              <h2 className="stats-title">position</h2>

              <div className="trade-intro">
                <span className="trade-intro-span">
                  {user.imports.ordersWithMetrics[index].ticker}{" "}
                </span>
                <span className="trade-intro-span">
                  {user.imports.ordersWithMetrics[index].PNL < 0 ? (
                    <span className="loss">
                      LOSS -$
                      {(user.imports.ordersWithMetrics[index].PNL * -1).toFixed(
                        2
                      )}
                    </span>
                  ) : (
                    <span className="won">
                      WON $
                      {user.imports.ordersWithMetrics[index].PNL.toFixed(2)}
                    </span>
                  )}
                </span>
                <span className="trade-intro-span">
                  {user.imports.ordersWithMetrics[index].position} position
                </span>
              </div>
            </div>
            <div className="orders-placed">
              <h2 className="stats-title">trades</h2>
              {user.imports.ordersWithMetrics[index].orders.map(
                (order, ind) => {
                  return (
                    <div key={ind} className="order-breakdown">
                      <div className="order-detail">
                        {order.action} {order.date}
                      </div>
                      <div className="order-detail">
                        {order.sharesQty} @ ${order.price.toFixed(2)}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <Chart ticker={ticker}></Chart>
        </>
      )}
    </div>
  );
};

export default TradeReview;
