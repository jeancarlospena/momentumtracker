import { graphicsOptimizer, lowestAndHighestPoint } from "./chartScripts.js";


export const drawPriceCanvas = (priceCanvas, priceContext, l, h, height) => {
  const board = lowestAndHighestPoint(h, l, height);
  let width = 40;
  priceCanvas.width = width;
  priceCanvas.height = height;

  // graphicsOptimizer(priceCanvas, priceContext);

  let topMoney = board.top;
  let topPixel = board.pixelConversion;
  let topCopy = topPixel;
  for (let i = 1; i < board.numberOfLines; i += 1) {
    topMoney -= board.textIncrement;
    priceContext.textAlign = "center";
    priceContext.font = "12px Arial";
    priceContext.fillText(topMoney, width / 2, topPixel + 3);
    topPixel += topCopy;
  }
}