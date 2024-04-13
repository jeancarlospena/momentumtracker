import { useRef, useEffect } from "react";
import { graphicsOptimizer } from "./chartScripts.js";

const ChartDates = ({ data, drag, lastDrag, screenSection }) => {
  const ref = useRef();
  const draw = (canvas, context) => {
    let height = 300;
    let width2 = 960;
    height = 20;
    canvas.width = width2;
    canvas.height = height;

    // graphicsOptimizer(canvas, context);

    const datesInArray = Object.keys(data).reverse();

    let dayFromArray = 0;
    for (let i = 10; i < 1000; i += 80) {
      context.font = "12px sans-serif";
      // const days = i === 6 ? 0 : i + 15;
      if (datesInArray[dayFromArray]) {
        const date = datesInArray[dayFromArray].split("-");
        context.fillText(
          `${date[1]}/${date[2]}`,
          i + drag - 10 + lastDrag + screenSection,
          15
        );
        dayFromArray += 16;
      }
    }
    // context.fillText(`mama ${drag}`, drag, 15);
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    draw(canvas, context);
  }, [drag]);

  return <canvas ref={ref}></canvas>;
};

export default ChartDates;
