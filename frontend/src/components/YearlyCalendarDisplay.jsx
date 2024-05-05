import { useState, useEffect } from "react";
{
  /*   yearNavigator={yearNavigator}
              changeYear={changeYear}
              yearValue={yearValueInput} */
}
const YearlyCalendarDisplay = ({
  yearlyData,
  setMonth,
  yearNavigator,
  changeYear,
  yearValueInput,
  selectedMonth,
}) => {
  const [firstHalfOfYear, setFirstHalfOfYear] = useState([]);
  const [secondHalfOfYear, setSecondHalfOfYear] = useState([]);
  const [calendarReadyToLoad, setCalendarReadyToLoad] = useState(false);
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
  useEffect(() => {
    const temporaryYearlyElements = [];
    const secondTemporary = [];
    for (let i = 1; i < 13; i++) {
      const iString = i.toString().padStart(2, "0");
      temporaryYearlyElements.push(
        <div
          onClick={() => setMonth(iString)}
          key={`monthdata${iString}`}
          className="calendar-single-weekday calendar-single-weekday-data month-selector"
        >
          {iString === selectedMonth ? (
            <div className="month-selected">
              <span className="selected-dot"></span>
              <span>{monthsOfTheYear[iString]}</span>
            </div>
          ) : (
            <span>{monthsOfTheYear[iString]}</span>
          )}

          <div className="trade-data">
            {yearlyData[iString] && (
              <>
                <span className="bolded-money-ammount">
                  ${yearlyData[iString].PNL.toFixed(2)}
                </span>
                <span className="small-font">
                  {yearlyData[iString].numberOfTrades} Trades
                </span>
              </>
            )}
          </div>
        </div>
      );
    }

    setFirstHalfOfYear(temporaryYearlyElements.slice(0, 6));
    setSecondHalfOfYear(temporaryYearlyElements.slice(6, 13));
    setCalendarReadyToLoad(true);
  }, [yearlyData]);

  return (
    <>
      <div>
        <div className="calendar-month-selector">
          <span className="body-navigator" onClick={() => yearNavigator(-1)}>
            Previous Year
          </span>

          <input
            type="text"
            value={yearValueInput}
            onChange={(e) => changeYear(e.target.value)}
            className="year-input"
          />
          <span className="body-navigator" onClick={() => yearNavigator(1)}>
            Next Year
          </span>
        </div>

        <div className="calendar-weekdays">
          {calendarReadyToLoad && <> {firstHalfOfYear}</>}
        </div>
        <div className="calendar-weekdays">
          {calendarReadyToLoad && <> {secondHalfOfYear}</>}
        </div>
      </div>
    </>
  );
};
export default YearlyCalendarDisplay;
