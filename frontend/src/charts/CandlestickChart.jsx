import { useRef, useEffect } from "react";

const CandlestickChart = ({ data, l, h, ordersMarker }) => {
  const ref = useRef();
  const draw = (canvas, context) => {
    let width = 960;
    let height = 300;
    let globalHeightDivider = 6;
    // window.devicePixelRatio = 20;

    canvas.width = width;
    canvas.height = height;
    // canvas.style.width = width;
    // canvas.style.height = height;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
    canvas.style.background = "white";

    // graphics optimizer here
    // =============================
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    context.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // =============================
    // context.setTransform(1, 0, 0, -1, 0, canvas.height);
    // context.setTransform(1, 0, 0, 0, canvas.width, canvas.height);

    const candlesList = [{ open: 130, close: 140, high: 160 }];

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
          xPointTail = -4;
          xPoint = 4;
        } else {
          context.fillStyle = "red";
          context.strokeStyle = "red";
          xPointTail = +13;
          xPoint = 5;
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
        // context.beginPath();
        // context.lineWidth = 2;
        // if (this.open < this.close) {
        //   context.rect(this.date, this.open, 6, this.close - this.open);
        //   context.strokeStyle = "blue";
        //   context.fillStyle = "purple";
        //   // context.fillStyle = "#1ef007";
        // } else if (this.open > this.close) {
        //   context.strokeStyle = "red";
        //   context.rect(this.date, this.open, 6, this.close - this.open);
        //   // context.strokeStyle = "red";
        //   context.fillStyle = "#f26b61";
        //   // context.fillStyle = "#f00707";
        // } else {
        //   context.rect(this.date, this.open - 1, 6, 3);
        // }

        // context.strokeStyle = "black";
        // WICK
        // set line stroke and line width
        // context.strokeStyle = 'green';
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(this.date + 1, this.high);
        context.lineTo(this.date + 1, this.low);
        context.stroke();
        context.closePath();

        // CANDLE BODY
        context.beginPath();
        context.lineWidth = 2;
        if (this.open < this.close) {
          context.rect(this.date, this.open, 2, this.close - this.open);
          context.strokeStyle = "#00DB38";
          context.fillStyle = "#00DB38";
          // context.fillStyle = "#1ef007";
        } else if (this.open > this.close) {
          context.strokeStyle = "#f54e4e";
          context.strokeStyle = "#f54e4e";
          context.rect(this.date, this.open, 2, this.close - this.open);
          // context.strokeStyle = "red";
          context.fillStyle = "#f26b61";
          // context.fillStyle = "#f00707";
        } else {
          context.rect(this.date, this.open - 1, 6, 3);
        }
        context.stroke();
        // context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(this.date + 1, this.high);
        context.lineTo(this.date + 1, this.low);
        context.stroke();
        context.closePath();
      }
    }

    // =============================
    const lowestAndHighestPoint = (topPrice, minPrice) => {
      let diff = topPrice - minPrice;

      let roundToWhole = 0;
      let textIncrement = 0;
      if (diff < 3) {
        textIncrement = 0.5;
      } else if (diff < 10) {
        textIncrement = 1;
      } else if (diff < 20) {
        textIncrement = 2;
      } else if (diff < 40) {
        textIncrement = 5;
      } else if (diff < 80) {
        textIncrement = 10;
      } else if (diff < 150) {
        textIncrement = 10;
      } else {
        textIncrement = 50;
      }

      let top = Math.ceil(topPrice / textIncrement) * textIncrement;
      let min = Math.floor(minPrice / textIncrement) * textIncrement;
      let numberOfLines = (top - min) / textIncrement;
      const pixelConversion = height / numberOfLines;
      return { textIncrement, top, min, numberOfLines, pixelConversion };
    };

    // date, open, close, high, low
    // i represents the date
    // for (i = 20; i < 580; i += 8) {
    //   let candle = new Candle(i, 70, 80, 50, 15)
    //   candle.draw(context)
    // }

    const board = lowestAndHighestPoint(h, l);

    // the maximu is 100 aka the number that it's being divided by
    // needs to be based on skips
    const moneyToPixelConverstion = (money) => {
      let maxMoneyInput = board.top - board.min;

      let moneyInputed = board.top - money;
      moneyInputed = maxMoneyInput - moneyInputed;
      return (moneyInputed * height) / maxMoneyInput;
    };

    // $40 to $50
    // const openCandle = moneyToPixelConverstion(141);
    // const closeCandle = moneyToPixelConverstion(144.5);
    // const highCandle = moneyToPixelConverstion(145);
    // const lowCandle = moneyToPixelConverstion(140);

    // date, open, close, high, low
    // let candle = new Candle(
    //   500,
    //   openCandle,
    //   closeCandle,
    //   highCandle,
    //   lowCandle
    // );
    // candle.draw(context);

    let topPixel = board.pixelConversion;
    let topCopy = topPixel;
    // HORIZONTAL
    context.setLineDash([1, 3]);

    for (let i = 1; i < board.numberOfLines; i += 1) {
      // draw a red line
      context.beginPath();
      // set line stroke and line width
      context.strokeStyle = "grey";
      context.lineWidth = 1;
      context.moveTo(0, topCopy);
      context.lineTo(width, topCopy);
      topCopy += topPixel;
      context.stroke();
      context.closePath();
    }

    // VERTICAL
    for (let i = 84; i < 890; i += 80) {
      // draw a red line
      context.beginPath();
      // set line stroke and line width
      context.strokeStyle = "grey";
      context.lineWidth = 1;
      context.moveTo(i, 0);
      context.lineTo(i, height);
      context.stroke();
      context.closePath();
    }
    // for (
    //   let i = width / globalHeightDivider / 2;
    //   i < width;
    //   i += width / globalHeightDivider
    // ) {
    //   // draw a red line
    //   context.beginPath();
    //   // set line stroke and line width
    //   context.strokeStyle = "grey";
    //   context.lineWidth = 1;
    //   context.moveTo(i, 0);
    //   context.lineTo(i, height);
    //   context.stroke();
    //   context.closePath();
    // }
    context.setLineDash([]);

    let currentDate = 3;
    Object.keys(data)
      .reverse()
      .map((date) => {
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
          currentDate,
          candleOpen,
          candleClose,
          candleHigh,
          candleLow
        );
        candle.draw(context);
        currentDate += 5;
      });
    const datesInArray = Object.keys(data).reverse();

    const dateToPixelConvertion = (minDate, maxDate, date) => {
      // console.log(date);
    };
    dateToPixelConvertion(
      datesInArray[datesInArray.length - 1],
      datesInArray[0],
      ordersMarker[0].date
    );

    // const dateFormat = new Date(ordersMarker[0].date);
    // const year = dateFormat.getFullYear();
    // const day = String(dateFormat.getDate()).padStart(2, "0");
    // const month =
    //   dateFormat.getMonth() === 0
    //     ? "01"
    //     : String(dateFormat.getMonth() + 1).padStart(2, "0");
    // const completed = `${year}-${month}-${day}`;

    // const dateIndex = datesInArray.indexOf(completed);
    // let triangle = new Triangle(
    //   dateIndex * 5,
    //   moneyToPixelConverstion(ordersMarker[0].price),
    //   ordersMarker[0].action
    // );
    // triangle.draw(context);
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
        dateIndex * 5,
        moneyToPixelConverstion(currentOrder.price),
        currentOrder.action
      );
      triangle.draw(context);
    });
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas, context);
  }, []);

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

  return (
    <>
      <canvas className="rotate-canvas" ref={ref}></canvas>
    </>
  );
};

export default CandlestickChart;
