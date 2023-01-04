import React from "react";
import { logWorkoutSession } from "../../../../../services/routineService";
import { getCurrentDate, getCurrentTime } from "../../../../../utils/utils";

const CardMenu = ({
  isOpen,
  routineId,
  makeDeleteRoutineCall,
  exerciseCount,
}: {
  isOpen: boolean | undefined;
  routineId: string;
  makeDeleteRoutineCall: (routineId: string) => void;
  exerciseCount: number;
}) => {
  // console.log(isOpen);
  const userId = localStorage.getItem("id") || "";
  const date = getCurrentDate();
  const time = getCurrentTime();
  const interval = "0 1:00:00";
  const completedExercises = exerciseCount;
  const status = true;

  const makeLogWorkoutSessionCall = async (data: any) => {
    logWorkoutSession(data).then((data) => {
      if (data?.status === 200) {
        alert("Workout Logged!");
      } else {
        console.log("Error logging workout");
      }
    });
  };

  return (
    <>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute border-1 right-0 mt-1 z-100 w-40 bg-white rounded divide-y divide-gray-100 shadow-2xl dark:bg-gray-700"
        >
          <ul
            className="block py-1 text-md text-left text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <div
                onClick={() =>
                  makeLogWorkoutSessionCall({
                    routineId: routineId,
                    userId: userId,
                    date: date + " " + time,
                    duration: interval,
                    completedExercises: completedExercises,
                    status: status,
                  })
                }
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <p
                  className="ml-2 text-sm"
                >
                  Start Workout
                </p>
              </div>
            </li>
            <li>
              <div
                onClick={() => {}}
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <p className="ml-2 text-sm">Edit</p>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => makeDeleteRoutineCall(routineId)}
              >
                <p className="ml-2 text-sm">Delete</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CardMenu;
