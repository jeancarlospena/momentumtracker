import { useState } from "react";
import Papa from "papaparse";
import {
  ordersIntoJSON,
  openTradesCloser,
  ordersIntoCompleteOrders,
  metricsCalculator,
} from "../scripts/dataOrganiser.js";
import axios from "axios";

import { useAuthContext } from "../hooks/useAuthContext.jsx";
import CreateTradeAccount from "../components/trade-account/CreateTradeAccount.jsx";
import { getTrades } from "../scripts/tradesFetcher.js";

const TradesImport = () => {
  const { user, dispatch, accountState } = useAuthContext();
  // const {accounstState} = useAccou
  // (user.primaryAccount);
  const [importedTrades, setImportedTrades] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [fileName, setFileName] = useState("");
  const [importFileError, setImportFileError] = useState("");

  const handleFile = (event) => {
    setImportFileError("");
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

        // This section makes sure to not double import data
        // const currentTradesLatestDate = new Date(
        //   user.importAccounts[user.activeAccount].latestDate
        // );
        // if (tradesJSON.latestDate <= currentTradesLatestDate) {
        //   setImportFileError("No new trades to import");
        //   return;
        // }
        // if (tradesJSON.earliestDate < currentTradesLatestDate) {
        //   const filteredJSONTrades = [];
        //   tradesJSON.orders.map((trade) => {
        //     const orderPlacedDate = new Date(trade.orderPlaced);
        //     if (orderPlacedDate > currentTradesLatestDate) {
        //       filteredJSONTrades.push(trade);
        //     }
        //   });
        //   tradesJSON.orders = filteredJSONTrades;
        // }

        // setFileName(`${event.target.files[0].name.match(/.{1,40}/g)[0]}...`);
        setFileName(`${event.target.files[0].name}`);
        setImportedTrades(tradesJSON);
        if (tradesJSON.orders.length > 0) {
          setDisabledButton(false);
        }
      },
    });
  };
  const handleClick = () => {
    const completeOrders = ordersIntoCompleteOrders(importedTrades.orders);
    const ordersWithMetrics = metricsCalculator(completeOrders);
    // if (user.importAccounts[user.activeAccount].empty) {
    //   completeOrders = ordersIntoCompleteOrders(importedTrades.orders);
    // } else {
    //   if (
    //     user.importAccounts[user.activeAccount].oldestOpenTradeIndex !== "none"
    //   ) {
    //     const tradesMerged = openTradesCloser(
    //       JSON.parse(JSON.stringify(user.importAccounts[user.activeAccount])),
    //       importedTrades
    //     );
    //     const completeNewOrders = ordersIntoCompleteOrders(
    //       importedTrades.orders,
    //       tradesMerged.ignoreNewTradesIndex
    //     );

    //     completeOrders = [
    //       ...tradesMerged.oldTrades.ordersWithMetrics,
    //       ...completeNewOrders,
    //     ];
    //   }
    // }
    // const ordersWithMetrics = metricsCalculator(completeOrders);
    // const completeData = {
    //   ...ordersWithMetrics,
    //   earliestDate: user.importAccounts[user.activeAccount].empty
    //     ? importedTrades.earliestDate
    //     : user.importAccounts[user.activeAccount].earliestDate,
    //   latestDate: importedTrades.latestDate,
    // };

    axios({
      url: "/api/trade/save-trades",
      method: "post",
      data: {
        trades: ordersWithMetrics.ordersWithMetrics,
        accountId: user.activeAccount,
      },
    })
      .then((response) => {
        dispatch({ type: "IMPORT_TRADES", payload: response.data.trades });
        setFileName("");
        // setImportedTrades([]);
        // setDisabledButton(true);
      })
      .catch((error) => {});
  };
  const accountChange = async (e) => {
    const selectedAccount = e.target.value;
    if (user.importAccounts[selectedAccount]) {
      dispatch({ type: "SWAP_ACCOUNT", payload: selectedAccount });
    } else {
      const response = await getTrades(selectedAccount);
      dispatch({
        type: "IMPORT_TRADES",
        payload: { trades: response, account: selectedAccount },
      });
      dispatch({ type: "SWAP_ACCOUNT", payload: selectedAccount });
    }
  };
  // const getTrades = () => {
  //   axios({
  //     url: `/api/trade/get-trades/${user.activeAccount}`,
  //     method: "get",
  //   })
  //     .then((response) => {
  //       // dispatch({ type: "IMPORT_TRADES", payload: response.data });
  //       // setFileName("");
  //       console.log(response);
  //       // setImportedTrades([]);
  //       // setDisabledButton(true);
  //     })
  //     .catch((error) => {});
  // };
  return (
    <div className="global-padding">
      {/* <button onClick={() => getTrades(user.activeAccount)}>get trades</button> */}
      <div className="top-spacer">
        <div className="import-container">
          <div className="account-selection">
            <h2 className="basic-title">Account:</h2>
            <select
              defaultValue={user.activeAccount}
              onChange={accountChange}
              className="custom-select"
              name=""
              id=""
            >
              {accountState.map((account, ind) => {
                return (
                  <option key={ind} value={account._id}>
                    {account.accountName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="import-section">
            <h2 className="basic-title">Import:</h2>
            <input
              type="file"
              className="file-input"
              onChange={(e) => handleFile(e)}
              accept=".csv"
              name="file"
              id="file"
            ></input>
            {importFileError && (
              <span className="error-span">{importFileError} *</span>
            )}
            <button
              disabled={disabledButton}
              className="button"
              onClick={handleClick}
            >
              Import Trades
            </button>
          </div>
        </div>
        <CreateTradeAccount />
      </div>
    </div>
  );
};

export default TradesImport;
