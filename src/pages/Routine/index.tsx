import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExercise } from "../../services/exerciseService";
import {
  fetchRoutine,
  getAllRoutineExercises,
  removeExerciseFromRoutine,
} from "../../services/routineService";
import { exerciseTypes } from "../../types/exerciseType";
import { IRoutineExerciseType } from "../../types/routineExerciseType";
import { IRoutineType } from "../../types/routineType";
import Analytics from "./Analytics";
import ExerciseEntry from "./ExerciseEntry";
import "./styles.scss";

const RoutinePage = () => {
  const { routineId } = useParams();
  const { tabId = "exerciseList" } = useParams();
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");

  const [routineData, setRoutineData] = useState<IRoutineType | null>();
  const [routineExerciseData, setRoutineExerciseData] = useState<
    IRoutineExerciseType[] | null
  >();
  const [exerciseList, setExerciseList] = useState<exerciseTypes[]>([]);
  const [currentTab, setCurrentTab] = useState(tabId);

  let pId = "";
  const menuItems = ["Exercise List", "Analytics"];

  const makeFetchRoutineCall = async (routineid: string) => {
    fetchRoutine(routineid).then((data) => {
      if (data.status === 200) {
        setRoutineData(data.body);
      } else {
        console.log("Error fetching routine");
      }
    });
  };

  const makeGetAllRoutineExercisesCall = async (routineid: string) => {
    getAllRoutineExercises(routineid).then((data) => {
      if (data?.status === 200) {
        setRoutineExerciseData(data?.body);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    if (userid && routineId) {
      makeFetchRoutineCall(routineId);
      makeGetAllRoutineExercisesCall(routineId);
    }
  }, [userid, routineId]);

  const makeFetchExerciseCall = (eId: string) => {
    fetchExercise(eId).then((data) => {
      if (data.status === 200) {
        setExerciseList((list) => [...list, data.body]);
      } else {
        console.log("error fetching exercise");
      }
    });
  };

  const getExerciseList = () => {
    routineExerciseData?.forEach((exerciseData) => {
      makeFetchExerciseCall(String(exerciseData?.exerciseid));
    });
  };

  useEffect(() => {
    if (routineExerciseData) {
      getExerciseList();
    }
  }, [routineExerciseData]);

  useEffect(() => {
    setCurrentTab(tabId);
  }, [tabId]);

  const makeRemoveExerciseFromRoutineCall = async (
    routineId: string,
    exerciseId: string
  ) => {
    removeExerciseFromRoutine(routineId, exerciseId).then((data) => {
      if (data?.status === 200) {
        setExerciseList(
          exerciseList.filter((exercise) => {
            return String(exercise?.id) !== exerciseId;
          })
        );
      } else {
        console.log("Error removing exercise from routine");
      }
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 home-side bg-neutral-900 border-r-2 border-neutral-800 h-screen">
        <p className="text-md font-bold mt-4 mb-4">
          {routineData?.routineName}
        </p>
      </div>
      <div className="col-span-9 m-4 h-full">
        <div>
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`
                  py-2
                  ${
                    currentTab === item.toLocaleLowerCase().replace(/\s/g, "")
                      ? "menu_active"
                      : ""
                  }
                `}
              >
                <p
                  className="
                  py-0.5
                  rounded
                  text-sm
                  hover:cursor-pointer 
                  hover:bg-gray-400
                  hover:bg-opacity-10 
                  transition-all
                  duration-100
                  "
                  onClick={() => {
                    if (index === 0) {
                      pId = "exerciselist";
                    } else if (index === 1) {
                      pId = "analytics";
                    }
                    navigate(`/routine/${routineId}/${pId}`);
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
          <hr className="user-profile-border-t-1 border-g-300" />
          <div className="mt-6">
            {currentTab === "analytics" ? (
              <Analytics
                exerciseList={exerciseList}
                routineId={routineId ? routineId : ""}
                userId={userid ? userid : ""}
                routineName={routineData ? routineData?.routineName : "N/A"}
              />
            ) : currentTab === "exerciselist" ? (
              <div className="col-span-9">
                {exerciseList?.map((exercise, key) => (
                  <ExerciseEntry
                    exercise={exercise}
                    color={key % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"}
                    key={key}
                    routineId={routineId ? routineId : ""}
                    makeRemoveExerciseFromRoutineCall={
                      makeRemoveExerciseFromRoutineCall
                    }
                  />
                ))}
              </div>
            ) : (
              "Error"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;
