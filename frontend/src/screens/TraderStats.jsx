import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  ordersIntoJSON,
  incorporateNewImports,
  ordersIntoCompleteOrders,
  metricsCalculator,
} from "../scripts/dataOrganiser.js";
import axios from "axios";
import CandlestickChart from "../charts/CandlestickChart.jsx";
import ChartPriceLevels from "../charts/ChartPriceLevels.jsx";
import TradeReview from "./TradeReview.jsx";

const TraderStats = () => {
  const [newTrades, setNewTrades] = useState([]);
  const [newTrades2, setNewTrades2] = useState([]);
  const [early, setEarly] = useState({});
  const [end, setEnd] = useState({});
  const [overlap, setOverlap] = useState({});
  const [j1, setj1] = useState({});
  const [j2, setj2] = useState({});
  const [table, setTable] = useState(false);

  useEffect(() => {
    // axios.get("http://localhost:3000/api/trades").then((results) => {});
  }, []);

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const trades = [];
        results.data.map((data) => {
          if (data.__parsed_extra && data.__parsed_extra.length === 12) {
            setNewTrades(trades.push(data.__parsed_extra));
          }
        });
        trades.shift();
        trades.reverse();
        setNewTrades(trades);
        console.log(trades);
        const json = ordersIntoJSON(trades);
        setj1(json);
      },
    });
  };
  const handleFile2 = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const trades = [];
        results.data.map((data) => {
          if (data.__parsed_extra && data.__parsed_extra.length === 12) {
            setNewTrades(trades.push(data.__parsed_extra));
          }
        });
        trades.shift();
        trades.reverse();
        setNewTrades2(trades);
        const json = ordersIntoJSON(trades);
        setj2(json);
      },
    });
  };

  const order1 = () => {
    const json = ordersIntoJSON(trades);
    setj1(json);
  };

  const order2 = () => {
    const json = ordersIntoJSON(newTrades2);
    setj2(json);
  };

  const logJ = () => {
    // console.log(newTrades2);
    // const returnedData = incorporateNewImports(j1, j2);
    // console.log(returnedData);
    const completeData = ordersIntoCompleteOrders(j1.orders);
    console.log(completeData);
    const metrics = metricsCalculator(completeData);
    console.log(metrics);
  };
  return (
    <div className="container">
      <div>
        {" "}
        <input type="file" onChange={handleFile} accept=".csv" />
        <input type="file" onChange={handleFile2} accept=".csv" />
        <br />
        <button onClick={order1}>order 1</button>
        <button onClick={order2}>order 2</button>
        <button onClick={logJ}>log orders</button>
      </div>

      {/* <CandlestickChart></CandlestickChart>
      <ChartPriceLevels></ChartPriceLevels> */}
      <TradeReview></TradeReview>
    </div>
  );
};

export default TraderStats;

// const structure = {
//   openPositionOrders: { tickerSymbol: { trades: [], side: "", openTrade: {} } },
//   closePositionOrders: { tickerSymbol: { trades: [] } },
//   closedTrades: [
//     {
//       dateOpened: "Date",
//       dateClosed: "Date",
//       tickerSymbol: "",
//       profitable: "Boolean",
//       openedPositionAt: "Int",
//       closedPositionsAt: "Int",
//       position: "LONG SHORT",
//     },
//   ],
//   dayToDayPNL: [{ date: "Date" }],
// };

{
  /* {table && (
        <table>
          <thead>
            <tr>
              <th>date placed</th>
              <th>type</th>
              <th>long/short</th>
              <th>qty</th>
              <th>open or close</th>
              <th>ticker</th>
              <th>type</th>
              <th>price</th>
              <th>price</th>
              <th>order type</th>
            </tr>
          </thead>

          <tbody>
            {newTrades.map((trade, index) => {
              return (
                <tr key={index + 500}>
                  {trade.map((value, dataIndex) => {
                    if (dataIndex !== 6 && dataIndex !== 7) {
                      return <td key={dataIndex + 1000}>{value}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )} */
}
