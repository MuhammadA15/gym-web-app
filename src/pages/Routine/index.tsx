import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExercise } from "../../services/exerciseService";
import {
  fetchRoutine,
  getAllRoutineExercises,
} from "../../services/routineService";
import { exerciseTypes } from "../../types/exerciseType";
import { IRoutineExerciseType } from "../../types/routineExerciseType";
import { IRoutineType } from "../../types/routineType";

const RoutinePage = () => {
  const { routineId } = useParams();
  const userid = localStorage.getItem("id");

  const [routineData, setRoutineData] = useState<IRoutineType | null>();
  const [routineExerciseData, setRoutineExerciseData] = useState<IRoutineExerciseType[] | null>();
  const [exerciseList, setExerciseList] = useState<exerciseTypes[]>([]);

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

  const getExerciseList = () => {
    routineExerciseData?.forEach((exerciseData) => {
      makeFetchExerciseCall(String(exerciseData?.exerciseid));
    });
  };

  const makeFetchExerciseCall = (eId: string) => {
    fetchExercise(eId).then((data) => {
      if (data.status === 200) {
        setExerciseList((list) => [...list, data.body]);
      } else {
        console.log("error fetching exercise");
      }
    });
  };

  useEffect(() => {
    if (routineExerciseData) {
      getExerciseList();
    }
  }, [routineExerciseData]);

  return (
    <div>
      <p className="text-lg font-bold mt-4 mb-4">{routineData?.routineName}</p>
      {exerciseList?.map((exercise) => (
        <p className="text-lg mt-4 mb-4">{exercise?.name}</p>
      ))}
    </div>
  );
};

export default RoutinePage;
