import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YearlyCalendarDisplay from "../components/YearlyCalendarDisplay.jsx";
import ActiveAccount from "../components/ActiveAccount.jsx";
import ImportTrades from "../components/ImportTrades.jsx";

const Calendar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState("6");
  const [calendarElements, setCalendarElements] = useState([]);
  const [yearlyData, setYearlyData] = useState({});
  const [yearOpstions, setYearOptions] = useState([]);
  const [accountIsEmpty, setAccountIsEmpty] = [
    user.importAccounts[user.activeAccount]?.empty,
  ];
  const [yearValueInput, setYearValueInput] = useState([]);
  const [calendarReadyToLoad, setCalendarReadyToLoad] = useState(false);
  useEffect(() => {
    if (accountIsEmpty) {
      navigate("/import");
    }
  }, [user]);
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
    const earliestYear = new Date(
      user.importAccounts[user.activeAccount].earliestDate
    ).getFullYear();
    const latestYear = new Date(
      user.importAccounts[user.activeAccount].latestDate
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

  const daysToSkip = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  useEffect(() => {
    if (!accountIsEmpty) {
      const currentLatestImports =
        user.importAccounts[user.activeAccount].latestDate.split("-");
      setYear(currentLatestImports[0]);
      setYearValueInput(currentLatestImports[0]);
      setMonth(currentLatestImports[1]);
      setDateOptions();
    }
  }, []);
  useEffect(() => {
    if (!accountIsEmpty) {
      // Function below gathers all the trades for selected month. adds the number of trades and pnl for each day
      const tradesDataToDisplay = {};
      const monthDataToDisplay = {};
      user.importAccounts[user.activeAccount].ordersWithMetrics.map(
        (completeOrder) => {
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
        }
      );
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
  }, [user, year, month]);

  const changeYear = (yearValue) => {
    console.log(yearValue);
    setYearValueInput(yearValue);
    if (yearValue >= 1792) {
      setMonth("01");
      setYear(String(yearValue));
    }
  };
  const yearNavigator = (changeYearAmount) => {
    console.log(month);
    const updatedYear = Number(year) + changeYearAmount;
    setYearValueInput(updatedYear);
    setYear(String(updatedYear));

    if (changeYearAmount === 1) {
      console.log("trigger 111111111");
      setMonth("01");
    }
    if (changeYearAmount === -1) {
      console.log("triggered");
      setMonth("12");
    }
    // console.log(month);
    // changeYear(Number(year) + changeYearAmount);
  };
  return (
    <>
      <div className="global-padding">
        {/* <ActiveAccount /> */}
        <ImportTrades />
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
    </>
  );
};
export default Calendar;
