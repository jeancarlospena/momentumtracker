// import { useState } from "react";
// import Papa from "papaparse";
// import {
//   ordersIntoJSON,
//   openTradesCloser,
//   ordersIntoCompleteOrders,
//   metricsCalculator,
// } from "../scripts/dataOrganiser.js";
// import axios from "axios";

// import { useAuthContext } from "../hooks/useAuthContext.jsx";

// const ImportTrades = () => {
//   const { user, dispatch } = useAuthContext();
//   // console.log(user.primaryAccount);
//   const [importedTrades, setImportedTrades] = useState([]);
//   const [disabledButton, setDisabledButton] = useState(true);
//   const [fileName, setFileName] = useState("");
//   const [importFileError, setImportFileError] = useState("");

//   const handleFile = (event) => {
//     setImportFileError("");
//     Papa.parse(event.target.files[0], {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         const trades = [];
//         results.data.map((data) => {
//           if (data.__parsed_extra && data.__parsed_extra.length === 12) {
//             trades.push(data.__parsed_extra);
//           }
//         });
//         trades.shift();
//         trades.reverse();
//         const tradesJSON = ordersIntoJSON(trades);

//         // This section makes sure to not double import data
//         const currentTradesLatestDate = new Date(
//           user.importAccounts[user.activeAccount].latestDate
//         );
//         if (tradesJSON.latestDate <= currentTradesLatestDate) {
//           setImportFileError("No new trades to import");
//           return;
//         }
//         if (tradesJSON.earliestDate < currentTradesLatestDate) {
//           const filteredJSONTrades = [];
//           tradesJSON.orders.map((trade) => {
//             const orderPlacedDate = new Date(trade.orderPlaced);
//             if (orderPlacedDate > currentTradesLatestDate) {
//               filteredJSONTrades.push(trade);
//             }
//           });
//           tradesJSON.orders = filteredJSONTrades;
//         }

//         // setFileName(`${event.target.files[0].name.match(/.{1,40}/g)[0]}...`);
//         setFileName(`${event.target.files[0].name}`);
//         setImportedTrades(tradesJSON);
//         if (tradesJSON.orders.length > 0) {
//           setDisabledButton(false);
//         }
//       },
//     });
//   };
//   // console.log(user.importAccounts.sdfg.oldestOpenTradeIndex);
//   const handleClick = () => {
//     let completeOrders;

//     if (user.importAccounts[user.activeAccount].empty) {
//       completeOrders = ordersIntoCompleteOrders(importedTrades.orders);
//     } else {
//       if (
//         user.importAccounts[user.activeAccount].oldestOpenTradeIndex !== "none"
//       ) {
//         const tradesMerged = openTradesCloser(
//           JSON.parse(JSON.stringify(user.importAccounts[user.activeAccount])),
//           importedTrades
//         );
//         const completeNewOrders = ordersIntoCompleteOrders(
//           importedTrades.orders,
//           tradesMerged.ignoreNewTradesIndex
//         );

//         completeOrders = [
//           ...tradesMerged.oldTrades.ordersWithMetrics,
//           ...completeNewOrders,
//         ];
//       }
//     }
//     const ordersWithMetrics = metricsCalculator(completeOrders);
//     // console.log(ordersWithMetrics);
//     const completeData = {
//       ...ordersWithMetrics,
//       earliestDate: user.importAccounts[user.activeAccount].empty
//         ? importedTrades.earliestDate
//         : user.importAccounts[user.activeAccount].earliestDate,
//       latestDate: importedTrades.latestDate,
//     };
//     axios({
//       url: "/api/accounts/import",
//       method: "post",
//       data: {
//         importData: completeData,
//         primaryAccount: user.activeAccount,
//       },
//     })
//       .then((response) => {
//         dispatch({ type: "IMPORT_TRADES", payload: response.data });
//         setFileName("");
//         // setImportedTrades([]);
//         // setDisabledButton(true);
//       })
//       .catch((error) => console.log(error));
//   };
//   // console.log(user);
//   // console.log(
//   //   user.importAccounts["Sample Account"].earliestDate <
//   //     user.importAccounts["Sample Account"].latestDate
//   // );
//   return (
//     <div className="import-section">
//       {/* <div className="file-input">
//         <label className="import-button-name" htmlFor="file">
//           <img className="upload-icon" src="../images/upload.svg" alt="" />
//           <span className="pad">{fileName ? fileName : "None"}</span>
//         </label>
//         <input
//           className="inputfile"
//           onChange={(e) => handleFile(e)}
//           accept=".csv"
//           type="file"
//           name="file"
//           id="file"
//         />
//         <label className="import-button" htmlFor="file">
//           <img className="upload-icon" src="../images/upload.svg" alt="" />
//           <span className="pad">Select file...</span>
//         </label>
//       </div> */}
//       {importFileError && (
//         <span className="error-span">{importFileError} *</span>
//       )}
//       <label className="import-file" htmlFor="file">
//         {fileName ? fileName : "Select import file."}
//       </label>
//       <input
//         className="inputfile"
//         onChange={(e) => handleFile(e)}
//         accept=".csv"
//         type="file"
//         name="file"
//         id="file"
//       />

//       <button
//         disabled={disabledButton}
//         className="button"
//         onClick={handleClick}
//       >
//         Import Trades
//       </button>
//     </div>
//   );
// };

// export default ImportTrades;
