import { useRef, useEffect } from "react";
import { graphicsOptimizer } from "./chartScripts.js";

const ChartDates = ({ data, drag, lastDrag, screenSection }) => {
  const datesRef = useRef();
  const drawDates = (datesCanvas, datesContext) => {
    let datesHeight = 20;
    let datesWidth = 960;
    datesCanvas.width = datesWidth;
    datesCanvas.datesHeight = datesHeight;

    // graphicsOptimizer(datesCanvas, datesContext);

    const datesInArray = Object.keys(data).reverse();

    let dayFromArray = 0;
    for (let i = 10; i < 1000; i += 80) {
      datesContext.font = "12px sans-serif";
      // const days = i === 6 ? 0 : i + 15;
      if (datesInArray[dayFromArray]) {
        const date = datesInArray[dayFromArray].split("-");
        datesContext.fillText(
          `${date[1]}/${date[2]}`,
          i + drag - 10 + lastDrag + screenSection,
          15
        );
        dayFromArray += 16;
      }
    }
    // datesContext.fillText(`mama ${drag}`, drag, 15);
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const datesCanvas = datesRef.current;
    const datesContext = datesCanvas.getContext("2d");
    drawDates(datesCanvas, datesContext);
  }, [drag]);

  return <canvas ref={datesRef}></canvas>;
};

export default ChartDates;

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     const datesRef = useRef();
//     const drawDates = (datesCanvas, datesContext) => {
//       let datesHeight = 20;
//       let datesWidth = 960;
//       datesCanvas.width = datesWidth;
//       datesCanvas.datesHeight = datesHeight;

//       // graphicsOptimizer(datesCanvas, datesContext);

//       const datesInArray = Object.keys(data).reverse();

//       let dayFromArray = 0;
//       for (let i = 10; i < 1000; i += 80) {
//         datesContext.font = "12px sans-serif";
//         // const days = i === 6 ? 0 : i + 15;
//         if (datesInArray[dayFromArray]) {
//           const date = datesInArray[dayFromArray].split("-");
//           datesContext.fillText(
//             `${date[1]}/${date[2]}`,
//             i + drag - 10 + lastDrag + screenSection,
//             15
//           );
//           dayFromArray += 16;
//         }
//       }
//     };
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
