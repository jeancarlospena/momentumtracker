import axios from "axios";
import { useEffect, useState } from "react";
import CandlestickChart from "../charts/CandlestickChart.jsx";
import ChartPriceLevels from "../charts/ChartPriceLevels.jsx";
import ChartDates from "../charts/ChartDates.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { dateToStringDate } from "../scripts/dateScripts.js";

const TradeReview = ({ ticker, result, position }) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { index } = useParams();
  const [stockData, setStockData] = useState([]);
  const [l, setL] = useState(0);
  const [h, setH] = useState(0);
  const [ordersMarker, setOrdersMarker] = useState([]);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    getData();
    if (!user.imports.ordersWithMetrics[index]) {
      console.log("trigger");
      navigate("/dashboard");
    }
  }, []);

  const clickHandler = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?symbol=${ticker}&RANGE=2023-01-01&RANGE=2024-01-30&outputsize=full&function=TIME_SERIES_DAILY&apikey=9ZJBUTMKMTOL2LTK`
      )
      .then((response) => {
        // const data = response.data["Time Series (Daily)"];
        // let low = 99999999;
        // let high = 0;
        // const dataKeysArray = Object.keys(data).splice(0, 180);

        // let compressed = {};

        // dataKeysArray.map((date) => {
        //   const datesLow = parseFloat(data[`${date}`]["3. low"]);
        //   const datesHigh = parseFloat(data[`${date}`]["2. high"]);
        //   compressed[date] = data[date];
        //   if (datesLow < low) {
        //     low = datesLow;
        //   }
        //   if (datesHigh > high) {
        //     high = datesHigh;
        //   }
        // });
        // console.log(data);
        // setH(high);
        // setL(low);
        // setOrdersMarker(user.imports.ordersWithMetrics[index].orders);

        // // setStockData(data);
        // setStockData(data);
        // setLoad(true);
        const orders = user.imports.ordersWithMetrics[index].orders;
        let data = response.data["Time Series (Daily)"];

        let low = 99999999;
        let high = 0;
        const dateKeys = Object.keys(data);

        const openDate = dateToStringDate(new Date(orders[0].date));
        const closeDate = dateToStringDate(
          new Date(orders[orders.length - 1].date)
        );
        const inbetweenDate =
          dateKeys.indexOf(openDate) -
          (dateKeys.indexOf(openDate) - dateKeys.indexOf(closeDate)) / 2;
        let dataKeysArray = [];
        if (inbetweenDate > 100) {
          dataKeysArray = dateKeys.splice(inbetweenDate - 100, 180);
        } else {
          dataKeysArray = dateKeys.splice(0, 180);
        }

        let compressed = {};
        dataKeysArray.map((date) => {
          const datesLow = parseFloat(data[`${date}`]["3. low"]);
          const datesHigh = parseFloat(data[`${date}`]["2. high"]);
          compressed[date] = data[date];
          if (datesLow < low) {
            low = datesLow;
          }
          if (datesHigh > high) {
            high = datesHigh;
          }
        });
        setOrdersMarker(user.imports.ordersWithMetrics[index].orders);
        setH(high);
        setL(low);
        setStockData(compressed);
        setLoad(true);
      });
  };

  const saveDataInTheBackend = () => {
    axios({
      url: "/api/stocks",
      method: "post",
      data: {
        ticker: ticker,
        candles: stockData,
      },
    });
  };

  const getData = () => {
    axios.get(`/api/stocks/${ticker}`).then((response) => {
      const orders = user.imports.ordersWithMetrics[index].orders;
      let data = response.data.candles[0];
      let low = 99999999;
      let high = 0;
      const dateKeys = Object.keys(data);

      const openDate = dateToStringDate(new Date(orders[0].date));
      const closeDate = dateToStringDate(
        new Date(orders[orders.length - 1].date)
      );
      const inbetweenDate =
        dateKeys.indexOf(openDate) -
        (dateKeys.indexOf(openDate) - dateKeys.indexOf(closeDate)) / 2;
      let dataKeysArray = [];
      if (inbetweenDate > 100) {
        dataKeysArray = dateKeys.splice(inbetweenDate - 100, 180);
      } else {
        dataKeysArray = dateKeys.splice(0, 180);
      }

      let compressed = {};
      dataKeysArray.map((date) => {
        const datesLow = parseFloat(data[`${date}`]["3. low"]);
        const datesHigh = parseFloat(data[`${date}`]["2. high"]);
        compressed[date] = data[date];
        if (datesLow < low) {
          low = datesLow;
        }
        if (datesHigh > high) {
          high = datesHigh;
        }
      });
      setOrdersMarker(user.imports.ordersWithMetrics[index].orders);
      setH(high);
      setL(low);
      setStockData(compressed);
      setLoad(true);
    });
  };

  const handleTickerInput = (e) => {
    setTicker(e.target.value);
  };

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
          {/* <input
            value={ticker}
            onChange={handleTickerInput}
            type="text"
            name=""
            id=""
          /> */}
          {/* <button onClick={clickHandler}>Load Stock</button>
          <button onClick={saveDataInTheBackend}>SAVE DATA</button>
          <button onClick={getData}>GET MONGOOSE DATA</button> */}

          {load && (
            <div className="chart-table">
              <div className="candles-and-price">
                <CandlestickChart
                  l={l}
                  h={h}
                  data={stockData}
                  ordersMarker={ordersMarker}
                ></CandlestickChart>
                <ChartPriceLevels l={l} h={h}></ChartPriceLevels>
              </div>

              <ChartDates data={stockData} l={l} h={h}></ChartDates>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TradeReview;

// 1 day = 86,400,000
// let date1 = new Date("01/10/2024");
// let date2 = new Date("01/26/2024");
// let testing = date1.getTime() - 24 * 60 * 60 * 1000 * 5;
// console.log(testing);
// // Calculating the time difference
// // of two dates
// let Difference_In_Time = date2.getTime() - date1.getTime();

// // Calculating the no. of days between
// // two dates
// let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

// // To display the final no. of days (result)
// console.log(
//   "Total number of days between dates:\n" +
//     date1.toDateString() +
//     " and " +
//     date2.toDateString() +
//     " is: " +
//     Difference_In_Days +
//     " days"
// );
