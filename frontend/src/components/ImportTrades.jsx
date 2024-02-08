import { useState } from "react";
import Papa from "papaparse";
import {
  ordersIntoJSON,
  incorporateNewImports,
  ordersIntoCompleteOrders,
  metricsCalculator,
} from "../scripts/dataOrganiser.js";
import axios from "axios";

import { useAuthContext } from "../hooks/useAuthContext.jsx";

const ImportTrades = () => {
  const { dispatch } = useAuthContext();

  const [importedTrades, setImportedTrades] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [fileName, setFileName] = useState("");

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const trades = [];
        results.data.map((data) => {
          if (data.__parsed_extra && data.__parsed_extra.length === 12) {
            trades.push(data.__parsed_extra);
          }
        });
        trades.shift();
        trades.reverse();
        const tradesJSON = ordersIntoJSON(trades);
        setFileName(`${event.target.files[0].name.match(/.{1,11}/g)[0]}...`);
        setImportedTrades(tradesJSON);
        if (tradesJSON.orders.length > 0) {
          setDisabledButton(false);
        }
      },
    });
  };

  const handleClick = () => {
    // console.log(importedTrades);
    const completeOrders = ordersIntoCompleteOrders(importedTrades.orders);
    const ordersWithMetrics = metricsCalculator(completeOrders);
    const completeData = {
      ...ordersWithMetrics,
      earliestDate: importedTrades.earliestDate,
      latestDate: importedTrades.latestDate,
    };
    axios({
      url: "/api/user/import",
      method: "post",
      data: {
        importData: completeData,
      },
    })
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="import-section">
      <div className="file-input">
        <label className="import-button-name" htmlFor="file">
          <img className="upload-icon" src="../images/upload.svg" alt="" />
          <span className="pad">{fileName ? fileName : "None"}</span>
        </label>
        <input
          className="inputfile"
          onChange={(e) => handleFile(e)}
          accept=".csv"
          type="file"
          name="file"
          id="file"
        />
        <label className="import-button" htmlFor="file">
          <img className="upload-icon" src="../images/upload.svg" alt="" />
          <span className="pad">Select file...</span>
        </label>
      </div>

      <button
        disabled={disabledButton}
        className="button"
        onClick={handleClick}
      >
        Import Trades
      </button>
    </div>
  );
};

export default ImportTrades;
