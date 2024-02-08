import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import ImportTrades from "../components/ImportTrades.jsx";
import TradesDisplay from "../components/TradesDisplay.jsx";
import StatsDisplay from "../components/StatsDisplay.jsx";

const UserMain = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div className="global-padding">
        <div className="top-heading ">
          {user && (
            <div className="left-intro">
              <h2 className="stats-title">Account : </h2>
              <select className="custom-select" name="" id="">
                <option>momentum swing trad...</option>
                {/* <option>swing trading</option>
                <option>day trading trading</option> */}
              </select>
            </div>
          )}

          <ImportTrades></ImportTrades>
        </div>
      </div>
      {user && (
        <>
          <StatsDisplay></StatsDisplay>
          <TradesDisplay></TradesDisplay>
        </>
      )}
    </>
  );
};

export default UserMain;
