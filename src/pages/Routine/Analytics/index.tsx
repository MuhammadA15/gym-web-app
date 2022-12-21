import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { exerciseTypes } from "../../../types/exerciseType";
import "./styles.scss"

const Analytics = ({ exerciseList }: { exerciseList: exerciseTypes[] }) => {
  const [data, setData] = useState<Map<string, number>>(new Map());
  const [helperData, setHelperData] = useState<Map<string, number>>(new Map());
  const [chartData, setChartData] = useState<Array<Array<any>>>([
    ["Exercise Type", "Count"],
  ]);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);

  const options = {
    title: "Distribution",
    pieHole: 0.4,
    is3D: false,
    legend: { position: 'bottom', alignment: 'middle', textStyle: {color: 'aliceblue'} },
    backgroundColor: "rgb(17, 17, 17)",
    pieSliceBorderColor : "transparent",
    chartArea : { left: 0, top: 0 },
    pieSliceText: "label",
  };

  useEffect(() => {
    setData(new Map());
    setHelperData(new Map());
  }, [exerciseList]);

  const getChartData = () => {
    exerciseList.forEach((exercise) => {
      setData(
        new Map(
          data?.set(
            exercise?.bodyPart.toLocaleLowerCase(),
            (data?.get(exercise?.bodyPart.toLocaleLowerCase()) ?? 0) + 1
          )
        )
      );
    });
    setIsLoadingChartData(false);
  };

  useEffect(() => {
    if (exerciseList) {
      getChartData();
    }
  }, [helperData]);

  const formatChartData = () => {
    data.forEach((val, key) => {
      setChartData((dataArr) => [...dataArr, [key, val]]);
    });
  };

  useEffect(() => {
    if (data && !isLoadingChartData) {
      setChartData([["Exercise Type", "Count"]]);
      formatChartData();
    }
  }, [data, isLoadingChartData]);

  return (
    <div>
      <div className="mt-10">
        <p className="text-left text-md font-bold mb-6 ml-20">
          Distribution
        </p>
        {chartData && (
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"80%"}
            height={"400px"}
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;
