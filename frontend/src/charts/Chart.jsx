import axios from "axios";
import { useEffect, useState } from "react";
import CandlestickChart from "../charts/CandlestickChart.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { dateToStringDate } from "../scripts/dateScripts.js";
import { dataRenderer } from "./chartScripts.js";
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

  const [load, setLoad] = useState(false);
  useEffect(() => {
    getData();

    // clickHandler();
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
        setStockData(data);
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
    axios
      .get(`/api/stocks/${ticker}`)
      .then((response) => {
        const orders = user.imports.ordersWithMetrics[index].orders;
        let data = response.data.candles[0];
        setTickerData(data);
        // let low = 99999999;
        // let high = 0;
        // const dateKeys = Object.keys(data);
        // const openDate = dateToStringDate(new Date(orders[0].date));
        // const closeDate = dateToStringDate(
        //   new Date(orders[orders.length - 1].date)
        // );
        // const inbetweenDate =
        //   dateKeys.indexOf(openDate) -
        //   (dateKeys.indexOf(openDate) - dateKeys.indexOf(closeDate)) / 2;
        // let dataKeysArray = [];
        // if (inbetweenDate > 100) {
        //   dataKeysArray = dateKeys.slice(inbetweenDate - 100, 200);
        // } else {
        //   dataKeysArray = dateKeys.slice(0, 200);
        // }
        // console.log(dateKeys);

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
        const renderedData = dataRenderer(data, orders);
        setOrdersMarker(user.imports.ordersWithMetrics[index].orders);
        setH(renderedData.high);
        setL(renderedData.low);
        setStockData(renderedData.compressed);
        setLoad(true);
        // setOrdersMarker(user.imports.ordersWithMetrics[index].orders);
        // setH(high);
        // setL(low);
        // setStockData(compressed);
        // setLoad(true);
      })
      .catch((error) => console.log("NOT ABLE TO DISPLAY CHART"));
  };

  return (
    <div>
      <button onClick={saveDataInTheBackend}>SAVE DATA</button>

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
