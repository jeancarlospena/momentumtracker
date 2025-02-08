


export const drawDatesCanvas = (data, datesContext, drag, lastDrag, screenSection, width) => {
  datesContext.clearRect(0, 0, width, 20);

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
}