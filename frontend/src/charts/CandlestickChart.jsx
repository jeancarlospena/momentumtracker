import { useRef, useEffect, useState } from "react";
import ChartDates from "./ChartDates.jsx";
import ChartPriceLevels from "./ChartPriceLevels.jsx";

import {
  graphicsOptimizer,
  lowestAndHighestPoint,
  dataRenderer,
} from "./chartScripts.js";
import { drawHorizontalLines, drawVerticalLines } from "./drawingScripts.js";

const CandlestickChart = ({ data, l, h, ordersMarker, height, tickerData }) => {
  const [passDrag, setPassDrag] = useState(0);
  const [passLastDrag, setPassLastDrag] = useState(0);
  const [passHigh, setPassHigh] = useState(h);
  const [passLow, setPassLow] = useState(l);
  const [passData, setPassData] = useState(data);
  const [passScreenSection, setPassScreenSection] = useState(0);
  // const [board, setBoard] = useState({});
  let board = lowestAndHighestPoint(h, l, height);
  // console.log(tickerData);
  // console.log(data2);
  // console.log(dataToRender);
  const ref = useRef();

  const draw = (canvas, context) => {
    let width = 960;
    let globalHeightDivider = 6;
    // window.devicePixelRatio = 1;
    let screenSection = 0;
    let drag = 0;
    let lastDrag = 0;
    const drawCandles = () => {
      let currentDate = drag + lastDrag;
      Object.keys(data)
        .reverse()
        .map((date, keyInd) => {
          let candleLow = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["3. low"])
          );
          let candleHigh = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["2. high"])
          );
          let candleOpen = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["1. open"])
          );
          let candleClose = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["4. close"])
          );
          let candle = new Candle(
            currentDate + screenSection,
            candleOpen,
            candleClose,
            candleHigh,
            candleLow
          );

          candle.draw(context);
          currentDate += 5;
        });
    };

    const drawTriangles = () => {
      if (screenSection < 480 && screenSection > -480) {
        const datesInArray = Object.keys(data).reverse();
        ordersMarker.map((currentOrder) => {
          const dateFormat = new Date(currentOrder.date);
          const year = dateFormat.getFullYear();
          const day = String(dateFormat.getDate()).padStart(2, "0");
          const month =
            dateFormat.getMonth() === 0
              ? "01"
              : String(dateFormat.getMonth() + 1).padStart(2, "0");
          const completed = `${year}-${month}-${day}`;

          const dateIndex = datesInArray.indexOf(completed);
          let triangle = new Triangle(
            dateIndex * 5 + drag + lastDrag + screenSection,
            moneyToPixelConverstion(currentOrder.price),
            currentOrder.action
          );
          triangle.draw(context);
        });
      }
    };

    // default values
    let isDragging = false;
    let startX;
    const mouseDown = () => {
      event.preventDefault();
      isDragging = true;
      startX = parseInt(event.offsetX);
    };
    const mouseUp = () => {
      event.preventDefault();
      isDragging = false;
      context.clearRect(0, 0, width, height);
      let reRender = dataRenderer(tickerData, ordersMarker, drag + lastDrag);
      setPassScreenSection(reRender.screenSection);
      screenSection = reRender.screenSection;
      data = reRender.compressed;
      board = lowestAndHighestPoint(reRender.high, reRender.low, height);
      setPassLow(reRender.low);
      setPassHigh(reRender.high);
      setPassData(data);
      // console.log(board);
      drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);
      drawHorizontalLines(context, width, board);
      drawCandles();
      drawTriangles();
      lastDrag += drag;
      lastDrag;
      drag = 0;
      setPassLastDrag(lastDrag);
      setPassDrag(0);
    };
    const mouseOut = (event) => {
      event.preventDefault();
      if (!isDragging) {
        return;
      }
      isDragging = false;
      context.clearRect(0, 0, width, height);

      drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);
      drawHorizontalLines(context, width, board);
      drawCandles();
      drawTriangles();
      lastDrag += drag;
      drag = 0;
      setPassLastDrag(lastDrag);
      setPassDrag(0);
    };

    const mouseMove = () => {
      event.preventDefault();
      if (!isDragging) {
        return;
      } else {
        context.clearRect(0, 0, width, height);
        let mouseX = parseInt(event.offsetX);
        drag = mouseX - startX;
        // console.log(drag);
        setPassDrag(drag);
        // drawHorizontalLines(
        //   context,
        //   board.pixelConversion,
        //   board.numberOfLines,
        //   width,
        //   board.pixelConversion
        // );
        drawHorizontalLines(context, width, board);
        drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);

        drawCandles();
        drawTriangles();

        // let currentShape = shapes[currentShapeIndex];
        // currentShape.x += dx;
        // startX = mouseX;
        // drawShapes();
      }
    };

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmouseout = mouseOut;
    canvas.onmousemove = mouseMove;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = false;
    canvas.style.background = "white";

    graphicsOptimizer(canvas, context);

    class Triangle {
      constructor(date, price, action) {
        this.date = date;
        this.price = price;
        this.action = action;
      }
      draw(context) {
        context.beginPath();

        context.lineWidth = 2;
        let xPointTail = 0;
        let xPoint = 0;
        if (this.action === "opened" || this.action === "increased") {
          context.fillStyle = "green";
          context.strokeStyle = "green";
          xPointTail = -8;
          xPoint = 0;
        } else {
          context.fillStyle = "red";
          context.strokeStyle = "red";
          xPointTail = +9;
          xPoint = 1;
        }
        context.moveTo(this.date + xPoint, this.price);
        context.lineTo(this.date + xPointTail, this.price + 6);
        context.lineTo(this.date + xPointTail, this.price - 6);
        context.lineTo(this.date + xPoint, this.price);
        context.fill();
        context.stroke();
      }
    }

    class Candle {
      constructor(date, open, close, high, low) {
        this.date = date;
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
      }
      draw(context) {
        // CANDLE BODY
        context.beginPath();
        context.lineWidth = 2;
        if (this.open < this.close) {
          context.rect(this.date, this.open, 2, this.close - this.open);
          context.strokeStyle = "#00DB38";
          context.fillStyle = "#00DB38";
        } else if (this.open > this.close) {
          context.strokeStyle = "#f54e4e";
          context.fillStyle = "#f54e4e";
          context.rect(this.date, this.open, 2, this.close - this.open);
        } else {
          context.strokeStyle = "grey";
          context.fillStyle = "grey";
          context.rect(this.date, this.open - 1, 2, 1);
          context.rect(this.date, this.open, 2, this.close - this.open);
        }
        context.stroke();
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(this.date + 1, this.high);
        context.lineTo(this.date + 1, this.low);
        context.stroke();
        context.closePath();
      }
    }

    // const board = lowestAndHighestPoint(h, l, height);

    // the maximu is 100 aka the number that it's being divided by
    // needs to be based on skips
    const moneyToPixelConverstion = (money) => {
      let maxMoneyInput = board.top - board.min;

      let moneyInputed = board.top - money;
      moneyInputed = maxMoneyInput - moneyInputed;
      return (moneyInputed * height) / maxMoneyInput;
    };

    drawHorizontalLines(context, width, board);
    drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);
    drawCandles();

    drawTriangles();
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    // setBoard(lowestAndHighestPoint(h, l, height));

    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas, context);
  }, []);
  return (
    <div className="chart-tables">
      <div className="candles-and-price">
        <canvas className="rotate-canvas" ref={ref}></canvas>
        <ChartPriceLevels l={passLow} h={passHigh} height={height} />
      </div>
      {/* <ChartDates data={data} l={l} h={h}></ChartDates> */}
      <ChartDates
        lastDrag={passLastDrag}
        drag={passDrag}
        data={passData}
        screenSection={passScreenSection}
        l={l}
        h={h}
      ></ChartDates>
    </div>
  );
};

export default CandlestickChart;

// 1 day = 86,400,000
// let date1 = new Date("01/10/2024");
// let date2 = new Date("01/26/2024");
// let testing = date1.getTime() - 24 * 60 * 60 * 1000 * 5;
// // Calculating the time difference
// // of two dates
// let Difference_In_Time = date2.getTime() - date1.getTime();

// // Calculating the no. of days between
// // two dates
// let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

// // To display the final no. of days (result)
// console.log(
//   "Total number of days between dates:\n" +
//     date1.toDateString() +
//     " and " +
//     date2.toDateString() +
//     " is: " +
//     Difference_In_Days +
//     " days"
// );
