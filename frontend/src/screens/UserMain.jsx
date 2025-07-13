import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import TradesDisplay from "../components/TradesDisplay.jsx";
import StatsDisplay from "../components/StatsDisplay.jsx";
import DatePicker from "react-datepicker";
import ActiveAccount from "../components/ActiveAccount.jsx";
import "react-datepicker/dist/react-datepicker.css";
import ImportTrades from "../components/ImportTrades.jsx";

const UserMain = () => {
  const { user, dispatch } = useAuthContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date().setHours(23, 59, 59, 59));
  const [selectedOrderSide, setSelectedOrderSide] = useState("all");
  const [selectedOrderResult, setSelectedOrderResult] = useState("all");
  const [searchedSymbol, setSearchedSymbol] = useState("");
  const [metrics, setMetrics] = useState({});
  const accountChange = (e) => {
    dispatch({ type: "SWAP_ACCOUNT", payload: e.target.value });
  };

  useEffect(() => {
    if (!user?.importAccounts?.[user.activeAccount]?.empty) {
      setStartDate(
        new Date(
          user.importAccounts?.[user.activeAccount]?.earliestDate
        ).setHours(0, 0, 0, 0)
      );
      setMetrics(user?.importAccounts[user.activeAccount].metrics);
      // setEndDate(new Date().setHours(23, 59, 59, 59));
    }
  }, [user.activeAccount]);
  useEffect(() => {
    // console.log(new Date(endDate).setHours(23, 59, 59, 59));
  }, [endDate]);

  const tradesSymbolFilterHandler = (event) => {
    setSearchedSymbol(event.target.value.toUpperCase());
  };

  const tradeStatusFilterHandler = (event) => {
    setSelectedOrderResult(event.target.value);
  };

  const tradeSideFilterHandler = (event) => {
    setSelectedOrderSide(event.target.value);
  };
  return (
    <>
      <div className="global-padding">
        {/* <ActiveAccount /> */}
        <ImportTrades />
      </div>
      {user && !user?.importAccounts?.[user.activeAccount]?.empty ? (
        <>
          <div className="filters-area global-padding">
            <div className="left-filter">
              <div className="trade-filter">
                <span className="filter-tag">Symbol:</span>
                <input
                  onChange={tradesSymbolFilterHandler}
                  className="filter-input"
                  type="text"
                  value={searchedSymbol}
                ></input>
              </div>
              <div className="trade-filter">
                <span className="filter-tag">Side:</span>
                <select
                  className="filter-selector"
                  value={selectedOrderSide}
                  onChange={tradeSideFilterHandler}
                >
                  <option value="all">All</option>
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
                {/* <span className="filter-tag">long/short</span> */}
              </div>
              <div className="trade-filter">
                <span className="filter-tag">Status:</span>
                <select
                  className="filter-selector"
                  value={selectedOrderResult}
                  onChange={tradeStatusFilterHandler}
                >
                  <option value="all">All</option>
                  <option value="won">Won</option>
                  <option value="loss">Loss</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
            <div className="right-filters">
              <span className="filter-tag">Date range:</span>
              <div className="filter-section">
                <DatePicker
                  className="date-picker date-spacer"
                  type="date"
                  selected={startDate}
                  onChange={(date) =>
                    setStartDate(new Date(date).setHours(0, 0, 0, 0))
                  }
                />
                <DatePicker
                  className="date-picker"
                  type="date"
                  selected={endDate}
                  onChange={(date) =>
                    setEndDate(new Date(date).setHours(23, 59, 59, 59))
                  }
                />
              </div>
            </div>
          </div>
          <div className="global-padding">
            {Object.keys(metrics).length !== 0 && (
              <StatsDisplay metrics={metrics}></StatsDisplay>
            )}
          </div>

          <TradesDisplay
            startDate={startDate}
            endDate={endDate}
            displayOrderResult={selectedOrderResult}
            selectedOrderSide={selectedOrderSide}
            searchedSymbol={searchedSymbol}
            setMetrics={setMetrics}
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
