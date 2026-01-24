import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YearlyCalendarDisplay from "../components/YearlyCalendarDisplay.jsx";
import ActiveAccount from "../components/ActiveAccount.jsx";
import ImportTrades from "../components/ImportTrades.jsx";

const Calendar = () => {
  const navigate = useNavigate();
  const { user, accountState } = useAuthContext();
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState("6");
  const [calendarElements, setCalendarElements] = useState([]);
  const [yearlyData, setYearlyData] = useState({});
  const [yearOpstions, setYearOptions] = useState([]);
  const [accountIsEmpty, setAccountIsEmpty] = useState(
    user.activeAccount === "" ||
      !user.importAccounts[user.activeAccount]?.length > 0
  );

  const [yearValueInput, setYearValueInput] = useState([]);
  const [calendarReadyToLoad, setCalendarReadyToLoad] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  // useEffect(() => {
  //   if (accountIsEmpty) {
  //     navigate("/import");
  //   }
  // }, [user]);
  const monthsOfTheYear = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const numberOfDaysByMonth = {
    Jan: 31,
    Feb: parseInt(year) % 4 === 0 ? 29 : 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31,
  };

  const setDateOptions = () => {
    const gatherSelectedAccount = user.importAccounts[user.activeAccount];
    const lastTradeInd = gatherSelectedAccount.length - 1;
    const lastOrderInd = gatherSelectedAccount[0].orders.length - 1;
    const earliestYear = new Date(
      gatherSelectedAccount[lastTradeInd].orders[0].date
    ).getFullYear();
    const latestYear = new Date(
      gatherSelectedAccount[0].orders[lastOrderInd].date
    ).getFullYear();
    const listOfYears = [];
    for (let i = earliestYear; i <= latestYear; i++) {
      listOfYears.unshift(
        <option key={`yearoption${i}`} value={i}>
          {i}
        </option>
      );
    }
    setYearOptions(listOfYears);
  };
  // const selectedAccount = loadedTrades[user.activeAccount];
  // const selectedExample = selectedAccount[selectedAccount.length - 1];

  const daysToSkip = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  useEffect(() => {
    if (user.importAccounts[user.activeAccount]?.length > 0) {
      setAccountIsEmpty(false);
      const gatherSelectedAccount = user.importAccounts[user.activeAccount];
      const lastOrderInd = gatherSelectedAccount[0].orders.length - 1;
      setSelectedAccount(gatherSelectedAccount);
      // if (!accountIsEmpty) {
      const currentLatestImports =
        gatherSelectedAccount[0].orders[lastOrderInd].date.split("-");
      setYear(currentLatestImports[0]);
      setYearValueInput(currentLatestImports[0]);
      setMonth(currentLatestImports[1]);
      setDateOptions();
    }
  }, [user]);
  useEffect(() => {
    if (selectedAccount.length > 0) {
      // Function below gathers all the trades for selected month. adds the number of trades and pnl for each day
      const tradesDataToDisplay = {};
      const monthDataToDisplay = {};
      selectedAccount.map((completeOrder) => {
        completeOrder.orders.map((trade) => {
          const tradeDateDetails = trade.date.split("T")[0].split("-");
          if (tradeDateDetails[0] === year) {
            const day = tradeDateDetails[2];
            const currentMonth = tradeDateDetails[1];
            // Montly Calendar
            if (currentMonth === month) {
              if (tradesDataToDisplay[day]) {
                tradesDataToDisplay[day].numberOfTrades += 1;
              } else {
                tradesDataToDisplay[day] = { numberOfTrades: 1, PNL: 0 };
              }
              if (trade.action === "closed") {
                tradesDataToDisplay[day].PNL += completeOrder.PNL;
              }
            }

            // Yearly Calendar
            if (monthDataToDisplay[currentMonth]) {
              monthDataToDisplay[currentMonth].numberOfTrades += 1;
            } else {
              monthDataToDisplay[currentMonth] = {
                numberOfTrades: 1,
                PNL: 0,
              };
            }
            if (trade.action === "closed") {
              monthDataToDisplay[currentMonth].PNL += completeOrder.PNL;
            }
          }
        });
      });
      const firstDayOfMonth = new Date(`${year}-${month.padStart(2, "0")}-02`)
        .toDateString()
        .split(" ");
      const firstDay = firstDayOfMonth[0];
      const numberOfDays = numberOfDaysByMonth[firstDayOfMonth[1]];
      const weeklyElements = [];
      let currentDay = 1 - daysToSkip[firstDay];
      while (currentDay <= numberOfDays) {
        const dailyElements = [];
        for (let i = 0; i < 7; i++) {
          const validDate = currentDay > 0 && currentDay < numberOfDays + 1;
          dailyElements.push(
            <Link
              to={
                tradesDataToDisplay[currentDay.toString().padStart(2, "0")]
                  ? `/tradesinday/${year}-${month}-${currentDay
                      .toString()
                      .padStart(2, "0")}`
                  : "#"
              }
              key={`day${currentDay}`}
              className="calendar-single-weekday calendar-single-weekday-data"
            >
              <span>{validDate ? currentDay : ""}</span>
              {validDate && (
                <div className="trade-data">
                  {tradesDataToDisplay[
                    currentDay.toString().padStart(2, "0")
                  ] && (
                    <>
                      <span className="bolded-money-ammount">
                        $
                        {tradesDataToDisplay[
                          currentDay.toString().padStart(2, "0")
                        ].PNL.toFixed(2)}
                      </span>
                      <span className="small-font">
                        {
                          tradesDataToDisplay[
                            currentDay.toString().padStart(2, "0")
                          ].numberOfTrades
                        }{" "}
                        {tradesDataToDisplay[
                          currentDay.toString().padStart(2, "0")
                        ].numberOfTrades > 1
                          ? "Trades"
                          : "Trade"}
                      </span>
                    </>
                  )}
                </div>
              )}
            </Link>
          );

          currentDay++;
        }
        weeklyElements.push(
          <div key={`week${currentDay}`} className="calendar-weekdays">
            {...dailyElements}
          </div>
        );
      }
      setYearlyData(monthDataToDisplay);
      setCalendarElements(weeklyElements);
      setCalendarReadyToLoad(true);
    }
  }, [user, year, month, selectedAccount]);

  const changeYear = (yearValue) => {
    setYearValueInput(yearValue);
    if (yearValue >= 1792) {
      setMonth("01");
      setYear(String(yearValue));
    }
  };
  const yearNavigator = (changeYearAmount) => {
    const updatedYear = Number(year) + changeYearAmount;
    setYearValueInput(updatedYear);
    setYear(String(updatedYear));

    if (changeYearAmount === 1) {
      setMonth("01");
    }
    if (changeYearAmount === -1) {
      setMonth("12");
    }
  };
  return (
    <>
      <div className="global-padding">
        <ActiveAccount />
        {/* <ImportTrades /> */}
      </div>
      {accountIsEmpty ? (
        <div className="global-padding">
          <h2 className="basic-title">
            No trades,{" "}
            <Link className="link-to-import" to={"/import-trades"}>
              Import here.
            </Link>
          </h2>
        </div>
      ) : (
        <div className="global-padding top-spacer">
          {/* <ActiveAccount /> */}
          {/* <ImportTrades /> */}
          {!accountIsEmpty && calendarReadyToLoad && (
            <div className="calendar-box">
              {calendarReadyToLoad && (
                <YearlyCalendarDisplay
                  selectedMonth={month}
                  yearNavigator={yearNavigator}
                  changeYear={changeYear}
                  yearValueInput={yearValueInput}
                  yearlyData={yearlyData}
                  setMonth={setMonth}
                />
              )}

              <div className="date-on-display">
                <span>
                  {monthsOfTheYear[month]} {year}
                </span>
              </div>
              <div className="calendar-weekdays days-of-week-names">
                <div className="calendar-single-weekday">Sunday</div>
                <div className="calendar-single-weekday">Monday</div>
                <div className="calendar-single-weekday">Tuesday</div>
                <div className="calendar-single-weekday">Wednesday</div>
                <div className="calendar-single-weekday">Thursday</div>
                <div className="calendar-single-weekday">Friday</div>
                <div className="calendar-single-weekday">Saturday</div>
              </div>

              {calendarElements}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Calendar;
