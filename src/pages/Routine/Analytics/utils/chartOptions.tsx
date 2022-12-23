export const pieChartOptions = {
  title: "Distribution",
  titleTextStyle: {
    color: "aliceblue",
    fontSize: "14",
  },
  pieHole: 0.4,
  is3D: false,
  // legend: {
  //   position: "bottom",
  //   alignment: "middle",
  //   textStyle: { color: "aliceblue" },
  // },
  legend: "none",
  backgroundColor: "rgb(17, 17, 17)",
  pieSliceBorderColor: "transparent",
  pieSliceText: "label",
};

export const columnChartOptions = {
  title: "Spread",
  titleTextStyle: {
    color: "aliceblue",
    fontSize: "14",
  },
  is3D: false,
  backgroundColor: "rgb(17, 17, 17)",
  hAxis: {
    textStyle:{color: '#FFF'}
  },
  legend: "none",
  animation: {
    startup: true,
    easing: "linear",
    duration: 1000,
  },
};