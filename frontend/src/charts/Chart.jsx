import axios from "axios";
import { useEffect, useState } from "react";
import CandlestickChart from "../charts/CandlestickChart.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { dateToStringDate } from "../scripts/dateScripts.js";
import { dataRenderer } from "./chartScripts.js";
import polygonSampleData from "./testingData.js";

// import ChartDates from "../charts/ChartDates.jsx";
const Chart = ({ ticker }) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { index } = useParams();
  const [stockData, setStockData] = useState([]);
  const [l, setL] = useState(0);
  const [h, setH] = useState(0);
  const [ordersMarker, setOrdersMarker] = useState([]);
  const [height, setHeight] = useState(450);
  const [tickerData, setTickerData] = useState({});

  useEffect(() => {
    const polygonDataToObject = {};
    polygonSampleData.results.forEach((candle, i) => {
      polygonDataToObject[new Date(candle.t).toISOString().slice(0, 10)] = {
        open: candle.o,
        close: candle.c,
        high: candle.h,
        low: candle.l,
        volume: candle.v,
      };
    });
  }, []);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    polygonChartRequest();
    if (!user.importAccounts[user.activeAccount].ordersWithMetrics[index]) {
      navigate("/dashboard");
    }
    // const test123 =
    //   user.importAccounts[user.activeAccount].ordersWithMetrics[index].orders;
  }, [index]);

  const polygonChartRequest = () => {
    setLoad(false);
    const orders =
      user.importAccounts[user.activeAccount].ordersWithMetrics[index].orders;
    const todaysDate = new Date().toISOString().slice(0, 10);
    axios({
      url: `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/${todaysDate}`,
      headers: {
        Authorization: "Bearer 7n4l45XZJuIRGrCX6XOQXRtJxp_HoQIp",
      },
      method: "get",
    })
      .then((response) => {
        const polygonDataToObject = {};
        response.data.results.reverse().forEach((candle, i) => {
          polygonDataToObject[new Date(candle.t).toISOString().slice(0, 10)] = {
            open: candle.o,
            close: candle.c,
            high: candle.h,
            low: candle.l,
            volume: candle.v,
          };
        });
        setTickerData(polygonDataToObject);

        // ===========
        const renderedData = dataRenderer(polygonDataToObject, orders);
        // ===================================

        setOrdersMarker(orders);
        setH(renderedData.high);
        setL(renderedData.low);
        setStockData(renderedData.compressed);
        setLoad(true);
      })
      .catch((error) => {});
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
    setLoad(false);
    axios
      .get(`/api/stocks/${ticker}`)
      .then((response) => {
        const orders =
          user.importAccounts[user.activeAccount].ordersWithMetrics[index]
            .orders;
        let data = response.data.candles[0];
        setTickerData(data);
        const renderedData = dataRenderer(data, orders);
        setOrdersMarker(
          user.importAccounts[user.activeAccount].ordersWithMetrics[index]
            .orders
        );
        setH(renderedData.high);
        setL(renderedData.low);
        setStockData(renderedData.compressed);
        setLoad(true);
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  return (
    <div>
      {/* <button onClick={saveDataInTheBackend}>SAVE DATA</button> */}

      {load && (
        <>
          <div className="candles-and-price">
            <CandlestickChart
              l={l}
              h={h}
              data={stockData}
              ordersMarker={ordersMarker}
              height={height}
              tickerData={tickerData}
            ></CandlestickChart>
            {/* <ChartPriceLevels l={l} h={h} height={height} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
