import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { exerciseTypes } from "../../../types/exerciseType";
import { bodyPartChartColorMapper } from "../../../utils/utils";
import "./styles.scss";
import { columnChartOptions, pieChartOptions } from "./utils/chartOptions";

const Analytics = ({ exerciseList }: { exerciseList: exerciseTypes[] }) => {
  const [data, setData] = useState<Map<string, number>>(new Map());
  const [helperData, setHelperData] = useState<Map<string, number>>(new Map());
  const [chartData, setChartData] = useState<Array<Array<any>>>([
    ["Exercise Type", "Count", { role: "style" }],
  ]);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);

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
      setChartData((dataArr) => [
        ...dataArr,
        [
          key,
          val / 2,
          bodyPartChartColorMapper[
            String(key).replace(
              /\s/g,
              ""
            ) as keyof typeof bodyPartChartColorMapper
          ],
        ],
      ]);
    });
  };

  useEffect(() => {
    if (data && !isLoadingChartData) {
      setChartData([["Exercise Type", "Count", { role: "style" }]]);
      formatChartData();
    }
  }, [data, isLoadingChartData]);

  return (
    <div>
      <div className="mt-10 grid grid-cols-2">
        <div className="col-span-1">
          {chartData && (
            <Chart
              chartType="PieChart"
              data={chartData}
              options={pieChartOptions}
              width={"100%"}
              height={"400px"}
            />
          )}
        </div>
        <div className="col-span-1">
          <Chart
            chartType="ColumnChart"
            options={columnChartOptions}
            data={chartData}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
      <div className="p-4 bg-neutral-900 shadow-2xl grid grid-cols-12 gap-2 text-xs items-center text-left">
          <div className="col-span-12 grid grid-cols-12">
            <p className="text-base mb-2 col-span-3 text-red-600 font-bold">Logs</p>
            <p className="col-span-9"></p>
          </div>
          <p className="col-span-1">Name</p>
          <p className="col-span-2">Description</p>
          <p className="col-span-1">Date</p>
          <p className="col-span-2"></p>
          <p className="col-span-1"># of Exercises</p>
          <p className="col-span-2">Workout Duration</p>
          <p className="col-span-2"></p>
          <p className="col-span-1 text-center">Status</p>
          <hr className="mt-1 border-t-2 border-neutral-700 col-span-12"/>

      </div>
    </div>
  );
};

export default Analytics;
