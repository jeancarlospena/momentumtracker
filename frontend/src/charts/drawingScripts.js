export const drawHorizontalLines = (context, width, board) => {
  // context.setLineDash([1, 3]);
  let pixelTracker = board.pixelConversion
  for (let i = 1; i < board.numberOfLines; i += 1) {
    // draw a red line
    context.beginPath();
    // set line stroke and line width
    context.strokeStyle = "rgb(194, 183, 183)";
    context.lineWidth = .5;
    context.moveTo(0, pixelTracker);
    context.lineTo(width, pixelTracker);
    pixelTracker += board.pixelConversion;
    context.stroke();
    context.closePath();
  }
  context.setLineDash([]);

}

export const drawVerticalLines = (context, height, data, drag, lastDrag) => {
  let startPoint = 4
  if (drag > 3) {

    startPoint -= Math.floor(drag / 80) * 80

  }
  // VERTICAL
  // context.setLineDash([1, 3]);
  const candlesLimiter = Object.keys(data).length * 6
  for (let i = startPoint + drag - 3; i < candlesLimiter; i += 80) {
    // draw a red line
    context.beginPath();
    // set line stroke and line width
    context.strokeStyle = "rgb(194, 183, 183)";
    context.lineWidth = .5;
    context.moveTo(i, 0);
    context.lineTo(i, height);
    context.stroke();
    context.closePath();
  }

  context.setLineDash([]);
}