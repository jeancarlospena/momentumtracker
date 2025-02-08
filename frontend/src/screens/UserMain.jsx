import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import ImportTrades from "../components/ImportTrades.jsx";
import TradesDisplay from "../components/TradesDisplay.jsx";
import StatsDisplay from "../components/StatsDisplay.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const UserMain = () => {
  const { user, dispatch } = useAuthContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [displayOrderResult, setDisplayOrderResult] = useState("");
  const accountChange = (e) => {
    dispatch({ type: "SWAP_ACCOUNT", payload: e.target.value });
  };

  const orderResultDisplayHandler = (resultType) => {
    if (displayOrderResult === resultType) {
      setDisplayOrderResult("");
    } else {
      setDisplayOrderResult(resultType);
    }
  };

  useEffect(() => {
    if (!user?.importAccounts?.[user.activeAccount]?.empty) {
      setStartDate(
        new Date(user.importAccounts?.[user.activeAccount]?.earliestDate)
      );
    }
  }, [user.activeAccount]);

  return (
    <>
      <div className="global-padding">
        <div id="paypal"></div>
        <div className="top-heading ">
          {user && !user.activeAccount?.unAveilable && (
            <div className="left-intro">
              <div className="account-selection">
                <h2 className="basic-title">Account :</h2>
                <select
                  defaultValue={user.activeAccount}
                  onChange={accountChange}
                  className="custom-select "
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
          <div className="filters-area global-padding">
            <div className="filter-section">
              <span className="filter-tag">Display:</span>

              <span
                onClick={() => orderResultDisplayHandler("won")}
                className={`status-tag ${
                  displayOrderResult === "won" ? "won" : "inactive-tag"
                }`}
              >
                WON
              </span>
              <span
                onClick={() => orderResultDisplayHandler("loss")}
                className={`status-tag ${
                  displayOrderResult === "loss" ? "loss" : "inactive-tag"
                }`}
              >
                LOSS
              </span>
              <span
                onClick={() => orderResultDisplayHandler("open")}
                className={`status-tag ${
                  displayOrderResult === "open" ? "open" : "inactive-tag"
                }`}
              >
                OPEN
              </span>
            </div>
            <div className="filter-section">
              <span className="filter-tag">Date range:</span>
              <DatePicker
                className="date-picker"
                type="date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className="date-picker"
                type="date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <TradesDisplay
            startDate={startDate}
            endDate={endDate}
            displayOrderResult={displayOrderResult}
          ></TradesDisplay>
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
