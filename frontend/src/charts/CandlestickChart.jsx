import { useRef, useEffect, useState } from "react";
import ChartDates from "./ChartDates.jsx";
import ChartPriceLevels from "./ChartPriceLevels.jsx";

import { lowestAndHighestPoint, dataRenderer } from "./chartScripts.js";
import { drawHorizontalLines, drawVerticalLines } from "./drawingScripts.js";
import { drawDatesCanvas } from "./datesCanvasScripts.js";
import { drawPriceCanvas } from "./priceCanvasCripts.js";
const CandlestickChart = ({ data, l, h, ordersMarker, height, tickerData }) => {
  const [resizeWidth, setResizeWidth] = useState(0);
  const [resizeLastDrag, setResizeLastDrag] = useState(0);
  const [resizeWindowSection, setResizeWindowSection] = useState(0);
  const [primaryWidth, setPrimaryWidth] = useState(0);
  // let board = lowestAndHighestPoint(h, l, height);

  const candlestickRef = useRef();
  const priceRef = useRef();
  const datesRef = useRef();

  const draw = (
    candlestickCanvas,
    context,
    datesCanvas,
    datesContext,
    priceCanvas,
    priceContext,
    primaryWidth
  ) => {
    let board = lowestAndHighestPoint(h, l, height);

    let width = primaryWidth - 40;
    // window.devicePixelRatio = 1;
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    candlestickCanvas.width = width;
    candlestickCanvas.height = height;
    datesCanvas.width = width;
    datesCanvas.height = 20;
    priceCanvas.width = 40;
    priceCanvas.height = height;
    context.imageSmoothingEnabled = false;
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    let screenSection = 0;
    let drag = 0;
    let lastDrag = 0;

    const drawCandles = () => {
      let currentDate = drag + lastDrag;
      Object.keys(data)
        .reverse()
        .map((date, keyInd) => {
          // let candleLow = moneyToPixelConverstion(
          //   parseFloat(data[`${date}`]["3. low"])
          // );
          // let candleHigh = moneyToPixelConverstion(
          //   parseFloat(data[`${date}`]["2. high"])
          // );
          // let candleOpen = moneyToPixelConverstion(
          //   parseFloat(data[`${date}`]["1. open"])
          // );
          // let candleClose = moneyToPixelConverstion(
          //   parseFloat(data[`${date}`]["4. close"])
          // );
          let candleLow = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["low"])
          );
          let candleHigh = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["high"])
          );
          let candleOpen = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["open"])
          );
          let candleClose = moneyToPixelConverstion(
            parseFloat(data[`${date}`]["close"])
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
    const reRenderFunction = () => {
      // event.preventDefault();

      isDragging = false;
      context.clearRect(0, 0, width, height);
      let reRender = dataRenderer(tickerData, ordersMarker, drag + lastDrag);
      screenSection = reRender.screenSection;
      // CHANGED ==========================
      data = reRender.compressed;
      board = lowestAndHighestPoint(reRender.high, reRender.low, height);
      drawPriceCanvas(
        priceCanvas,
        priceContext,
        reRender.low,
        reRender.high,
        height
      );
      drawDatesCanvas(data, datesContext, drag, lastDrag, screenSection, width);
      drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);
      drawHorizontalLines(context, width, board);
      drawCandles();
      drawTriangles();
      lastDrag += drag;
      lastDrag;
      drag = 0;
    };
    // default values
    let isDragging = false;
    let startX;
    const mouseDown = (event) => {
      event.preventDefault();
      isDragging = true;
      startX = parseInt(event.offsetX);
    };
    const mouseUp = (event) => {
      event.preventDefault();
      // +++++++++++++++++
      isDragging = false;
      // +++++++++++++++++

      reRenderFunction();
    };
    const mouseOut = (event) => {
      event.preventDefault();
      if (!isDragging) {
        return;
      }
      reRenderFunction();
    };

    const mouseMove = (event) => {
      event.preventDefault();

      if (!isDragging) {
        return;
      } else {
        context.clearRect(0, 0, width, height);
        let mouseX = parseInt(event.offsetX);
        drag = mouseX - startX;

        // drawHorizontalLines(
        //   context,
        //   board.pixelConversion,
        //   board.numberOfLines,
        //   width,
        //   board.pixelConversion
        // );

        drawDatesCanvas(
          data,
          datesContext,
          drag,
          lastDrag,
          screenSection,
          width
        );
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

    candlestickCanvas.onmousedown = mouseDown;
    // candlestickCanvas.onmousedown = sayHi;
    candlestickCanvas.onmouseup = mouseUp;
    candlestickCanvas.onmouseout = mouseOut;
    candlestickCanvas.onmousemove = mouseMove;

    // candlestickCanvas.width = width;

    // candlestickCanvas.height = height;
    // context.imageSmoothingEnabled = false;
    // candlestickCanvas.style.background = "yellow";

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
          // context.rect(this.date, this.open - 1, 2, 1);
          context.rect(this.date, this.open, 2, this.close - this.open);
        }
        context.stroke();
        context.fill();
        context.closePath();
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(this.date + 1.5, this.high);
        context.lineTo(this.date + 1.5, this.low);
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
    drawPriceCanvas(priceCanvas, priceContext, l, h, height);
    drawDatesCanvas(data, datesContext, drag, lastDrag, screenSection, width);
    drawHorizontalLines(context, width, board);
    drawVerticalLines(context, height, data, drag + lastDrag, lastDrag);
    drawCandles();

    drawTriangles();
  };

  // ++++++++++++

  const resizeObserver = new ResizeObserver((entries) => {
    let width = 0;
    for (let entry of entries) {
      width = entry.contentRect.width;
    }
    setPrimaryWidth(width);

    return width;
  });

  useEffect(() => {
    // ++++++++++++
    const chartDivSize = document.getElementById("chart-tables");
    resizeObserver.observe(chartDivSize);
  }, []);

  useEffect(() => {
    if (primaryWidth > 0) {
      const candlestickCanvas = candlestickRef.current;
      const context = candlestickCanvas.getContext("2d");

      const priceCanvas = priceRef.current;
      const priceContext = priceCanvas.getContext("2d");

      // setBoard(lowestAndHighestPoint(h, l, height));
      const datesCanvas = datesRef.current;
      const datesContext = datesCanvas.getContext("2d");

      draw(
        candlestickCanvas,
        context,
        datesCanvas,
        datesContext,
        priceCanvas,
        priceContext,
        primaryWidth
      );
    }
  }, [primaryWidth]);

  return (
    <div className="chart-tables" id="chart-tables">
      <div className="candles-and-price">
        <canvas className="rotate-canvas" ref={candlestickRef}></canvas>
        <canvas ref={priceRef}></canvas>
      </div>

      <canvas ref={datesRef}></canvas>
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
