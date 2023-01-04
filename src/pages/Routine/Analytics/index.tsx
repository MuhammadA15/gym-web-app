import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getRoutineLogHistory } from "../../../services/routineService";
import { exerciseTypes } from "../../../types/exerciseType";
import { IRoutineLogsType } from "../../../types/routineLogsType";
import { bodyPartChartColorMapper } from "../../../utils/utils";
import "./styles.scss";
import { columnChartOptions, pieChartOptions } from "./utils/chartOptions";

const Analytics = ({
  exerciseList,
  routineId,
  userId,
}: {
  exerciseList: exerciseTypes[];
  routineId: string;
  userId: string;
}) => {
  const [data, setData] = useState<Map<string, number>>(new Map());
  const [helperData, setHelperData] = useState<Map<string, number>>(new Map());
  const [chartData, setChartData] = useState<Array<Array<any>>>([
    ["Exercise Type", "Count", { role: "style" }],
  ]);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);
  const [routineLogs, setRoutineLogs] = useState<IRoutineLogsType[]>([]);

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

  const makeGetRoutineLogHistoryCall = async (
    routineId: string,
    userId: string
  ) => {
    getRoutineLogHistory(routineId, userId).then((data) => {
      if (data?.status === 200) {
        setRoutineLogs(data?.body);
      } else {
        console.log("Error fetching logs");
      }
    });
  };

  useEffect(() => {
    if (routineId && userId) {
      makeGetRoutineLogHistoryCall(routineId, userId);
    }
  }, [routineId, userId]);

  console.log(routineLogs);

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
      <div className="p-4 bg-neutral-900 shadow-xl grid grid-cols-12 gap-2 text-xs items-center text-left">
        <div className="col-span-12 grid grid-cols-12 pl-2">
          <p className="text-base mb-4 col-span-3 text-red-600 font-bold">
            Logs
          </p>
          <p className="col-span-9"></p>
        </div>
        <p className="col-span-1 pl-2">Name</p>
        <p className="col-span-2">Description</p>
        <p className="col-span-1">Date</p>
        <p className="col-span-2"></p>
        <p className="col-span-1"># of Exercises</p>
        <p className="col-span-2">Workout Duration</p>
        <p className="col-span-2"></p>
        <p className="col-span-1 text-center">Status</p>
        <hr className="mt-1 border-t-2 border-neutral-700 col-span-12" />
        {routineLogs &&
          routineLogs?.map((log) => (
            <>
              <p className="col-span-1 pl-4 py-1">{log?.routineId}</p>
              <p className="col-span-2">Description</p>
              <p className="col-span-2">{log?.date}</p>
              <p className="col-span-1"></p>
              <p className="col-span-1 pl-2">{log?.completedExercises}</p>
              <p className="col-span-2 pl-2">{log?.duration}</p>
              <p className="col-span-2"></p>
              <p className="col-span-1 text-center">{log?.status === true ? "Completed" : "Incomplete"}</p>
              <hr className="border-t-2 border-neutral-700 col-span-12" />
            </>
          ))}
      </div>
    </div>
  );
};

export default Analytics;
