import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import ImportTrades from "../components/ImportTrades.jsx";
import TradesDisplay from "../components/TradesDisplay.jsx";
import StatsDisplay from "../components/StatsDisplay.jsx";

const UserMain = () => {
  const { user, dispatch } = useAuthContext();
  const accountChange = (e) => {
    dispatch({ type: "SWAP_ACCOUNT", payload: e.target.value });
  };
  return (
    <>
      <div className="global-padding">
        <div className="top-heading ">
          {user && !user.activeAccount?.unAveilable && (
            <div className="left-intro">
              <div className="account-selection">
                <h2 className="basic-title">Account :</h2>
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

              <ImportTrades></ImportTrades>
            </div>
          )}

          <StatsDisplay></StatsDisplay>
        </div>
      </div>
      {user && !user?.importAccounts?.[user.activeAccount]?.empty ? (
        <>
          <TradesDisplay></TradesDisplay>
        </>
      ) : (
        <div className="global-padding">
          <h2 className="basic-title">
            No trades have been imported into this account. Import your CSV
            files from the "Think Or Swim" platform.
          </h2>
        </div>
      )}
    </>
  );
};

export default UserMain;
