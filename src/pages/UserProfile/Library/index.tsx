import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExerciseByAuthor } from "../../../services/exerciseService";
import { fetchUserRoutines } from "../../../services/routineService";
import { exerciseTypes } from "../../../types/exerciseType";
import { IRoutineType } from "../../../types/routineType";

const Library = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);
  const [routineData, setRoutineData] = useState<IRoutineType[] | null>([]);

  const makeFetchUserCreatedExercisesCall = async (userid: string) => {
    fetchExerciseByAuthor(userid).then((data) => {
      if (data.status === 200) {
        setExerciseData(data.body);
      } else {
        // console.log()
      }
    });
  };

  const makeFetchUserRoutinesCall = async (userid: string) => {
    fetchUserRoutines(userid).then((data) => {
      if (data.status === 200) {
        setRoutineData(data.body);
      } else {
        // console.log()
      }
    });
  };

  useEffect(() => {
    if (userid) {
      makeFetchUserCreatedExercisesCall(userid);
      makeFetchUserRoutinesCall(userid);
    }
  }, [userid]);

  const navigateToRoutine = (id: number) => {
    navigate(`/routine/${id}`);
  };

  return (
    <div>
      <p className="mb-2 text-md font-bold">Your Exercises</p>
      {exerciseData?.map((exercise) => (
        <p className="text-sm">{exercise?.name}</p>
      ))}
      <p className="mt-16 mb-2 text-md font-bold">Your Routines</p>
      {routineData?.map((routine) => (
        <p
          className="hover:cursor-pointer hover:underline text-sm"
          onClick={() => navigateToRoutine(routine?.id)}
        >
          {routine?.routineName}
        </p>
      ))}
    </div>
  );
};

export default Library;
