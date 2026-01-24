import { dateToStringDate } from "../scripts/dateScripts.js";

export const graphicsOptimizer = (canvas, context) => {
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
}

export const lowestAndHighestPoint = (topPrice, minPrice, height) => {
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
}

export const dataRenderer = (data, orders, drag = 0) => {
  // 16 is the number of candles in square section
  // when i change the size of the candles and the space between them the number of candles per square will change also
  // 80 might be the number of pixels per square section.  

  const renderNewCandlesByDrag = Math.floor(drag / 80) * 16

  const screenSection = Math.floor(drag / 80) * -80
  let low = 99999999;
  let high = 0;
  const dateKeys = Object.keys(data);
  const openDate = dateToStringDate(new Date(orders[0].date));
  const closeDate = dateToStringDate(
    new Date(orders[orders.length - 1].date)
  );
  const inbetweenDate =
    Math.floor(dateKeys.indexOf(openDate) -
      (dateKeys.indexOf(openDate) - dateKeys.indexOf(closeDate)) / 2);
  let dataKeysArray = [];
  // i tried adding   drag or screenSection < 0
  // if (inbetweenDate > 100) {

  // here is where we pick the candles that will be on display
  const startSliceCalc = inbetweenDate - 100 + renderNewCandlesByDrag
  const startSlice = startSliceCalc >= 0 ? startSliceCalc : 0
  dataKeysArray = dateKeys.slice(startSlice, inbetweenDate + 93 + renderNewCandlesByDrag);
  // } else {
  //   dataKeysArray = dateKeys.slice(0, 170);
  // }

  let compressed = {};
  dataKeysArray.map((date) => {
    const datesLow = parseFloat(data[`${date}`]["low"]);
    const datesHigh = parseFloat(data[`${date}`]["high"]);
    compressed[date] = data[date];
    if (datesLow < low) {
      low = datesLow;
    }
    if (datesHigh > high) {
      high = datesHigh;
    }
  });


  return { compressed, high, low, screenSection }
}