import { useRef, useEffect } from "react";

const ChartDates = ({ data, l, h }) => {
  const ref = useRef();

  const draw = (canvas3, context3) => {
    let height = 300;

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
      } else if (diff < 150) {
        textIncrement = 10;
      } else {
        textIncrement = 20;
      }
      let top = Math.ceil(topPrice / textIncrement) * textIncrement;
      let min = Math.floor(minPrice / textIncrement) * textIncrement;
      let numberOfLines = (top - min) / textIncrement;

      const pixelConversion = height / numberOfLines;
      return { textIncrement, top, min, numberOfLines, pixelConversion };
    };

    // const h = 115;
    // const l = 55;

    const board = lowestAndHighestPoint(h, l);

    let width2 = 960;
    height = 15;
    // console.log(globalDivider);
    canvas3.width = width2;
    canvas3.height = height;

    // graphics optimizer here
    // =============================
    const dpr = window.devicePixelRatio;
    const rect = canvas3.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas3.width = rect.width * dpr;
    canvas3.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    context3.scale(dpr, dpr);

    // Set the "drawn" size of the canvas3
    canvas3.style.width = `${rect.width}px`;
    canvas3.style.height = `${rect.height}px`;
    // =============================

    // canvas3.style.background = "#F1EFED";
    context3.setLineDash([1, 2]);
    for (let i = 84; i < 900; i += 80) {
      // draw a red line
      context3.beginPath();
      // set line stroke and line width
      context3.strokeStyle = "grey";
      context3.lineWidth = 1;
      context3.moveTo(i, 0);
      context3.lineTo(i, height);
      context3.stroke();
      context3.closePath();
    }

    const datesInArray = Object.keys(data).reverse();

    // const dateToPixelConvertion = (minDate, days) => {
    //   console.log(minDate);
    //   const oneDay = 86400000;
    //   const minDateTime = new Date(minDate).getTime() + oneDay;

    //   const daysToDate = (days / 5) * oneDay;
    //   const dateInString = new Date(minDateTime + daysToDate);
    //   // console.log(`${dateInString.getMonth()}/${dateInString.getDate()}`);
    //   const month = dateInString.getMonth() + 1;
    //   const day = dateInString.getDate();
    //   return `${month === 12 ? 1 : month}/${day}`;
    // };
    // dateToPixelConvertion(datesInArray[datesInArray.length - 1], 160);
    let dayFromArray = 0;
    for (let i = 10; i < 900; i += 80) {
      context3.font = "12px sans-serif";
      // const days = i === 6 ? 0 : i + 15;
      if (datesInArray[dayFromArray]) {
        const date = datesInArray[dayFromArray].split("-");
        context3.fillText(`${date[1]}/${date[2]}`, i, 15);
        dayFromArray += 16;
      }
    }
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas, context);
  }, []);

  return <canvas ref={ref}></canvas>;
};

export default ChartDates;
