import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";
import ImportTrades from "./ImportTrades.jsx";

const ActiveAccount = () => {
  const { user, dispatch } = useAuthContext();

  const accountChange = (e) => {
    dispatch({ type: "SWAP_ACCOUNT", payload: e.target.value });
  };
  return (
    <>
      {" "}
      {user && !user.activeAccount?.unAveilable && (
        <div className="active-bar top-spacer">
          <div className="account-selection">
            <h2 className="basic-title">Account:</h2>
            <select
              defaultValue={user.activeAccount}
              onChange={accountChange}
              className="custom-select"
              name=""
              id=""
            >
              {Object.keys(user.importAccounts).map((accountName, ind) => {
                return <option key={ind}>{accountName}</option>;
              })}
            </select>
          </div>
          <ImportTrades />
          {/* <Link to="/import" className="link-btn highlight-btn">
            Import Trades
          </Link> */}
        </div>
      )}
    </>
  );
};

export default ActiveAccount;
