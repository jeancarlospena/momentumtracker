import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

export const getTrades = (account) => {

  return axios({
    url: `/api/trade/get-trades/${account}`,
    method: "get",
  })
    .then((response) => {
      // dispatch({ type: "IMPORT_TRADES", payload: response.data });
      // setFileName("");
      // setImportedTrades([]);
      // setDisabledButton(true);
      return response.data.trades
    })
    .catch((error) => {
      console.log(error)
    });
};



