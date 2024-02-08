import { useRef, useEffect } from "react";

const ChartPriceLevels = ({ l, h }) => {
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

    // const h = 115;
    // const l = 55;

    const board = lowestAndHighestPoint(h, l);

    let width2 = 40;
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

    let topMoney = board.top;
    let topPixel = board.pixelConversion;
    let topCopy = topPixel;
    for (let i = 1; i < board.numberOfLines; i += 1) {
      topMoney -= board.textIncrement;
      context3.textAlign = "center";
      context3.font = "12px Arial";
      context3.fillText(topMoney, width2 / 2, topPixel + 3);
      topPixel += topCopy;
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

export default ChartPriceLevels;
