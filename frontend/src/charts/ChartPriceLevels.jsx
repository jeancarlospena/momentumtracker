import { useRef, useEffect } from "react";
import { graphicsOptimizer, lowestAndHighestPoint } from "./chartScripts.js";

const ChartPriceLevels = ({ l, h, height }) => {
  const ref = useRef();
  const draw = (canvas, context) => {
    const board = lowestAndHighestPoint(h, l, height);
    let width = 40;
    canvas.width = width;
    canvas.height = height;

    graphicsOptimizer(canvas, context);

    // canvas.style.background = "#F1EFED";

    let topMoney = board.top;
    let topPixel = board.pixelConversion;
    let topCopy = topPixel;
    for (let i = 1; i < board.numberOfLines; i += 1) {
      topMoney -= board.textIncrement;
      context.textAlign = "center";
      context.font = "12px Arial";
      context.fillText(topMoney, width / 2, topPixel + 3);
      topPixel += topCopy;
    }
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas, context);
  }, [h, l]);

  return <canvas ref={ref}></canvas>;
};

export default ChartPriceLevels;
