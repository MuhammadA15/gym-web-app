import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import { IRoutineType } from "../../../types/routineType";
import { FETCH_EXERCISE_BY_USERID_ENDPOINT, FETCH_ROUTINES_ENDPOINT } from "../../../utils/constants/apiEndpoints";

const Library = () => {

  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);
  const [routineData, setRoutineData] = useState<IRoutineType[] | null>([]);

  const fetchExercises = async (id: string) => {
    await fetch(FETCH_EXERCISE_BY_USERID_ENDPOINT.replace("id", id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          setExerciseData(data.body);
        } else {
          // console.log()
        }
      });
  };

  const fetchRoutines = async (id: string) => {
    await fetch(FETCH_ROUTINES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: id
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          setRoutineData(data.body)
        } else {
          // console.log()
        }
      });
  };

  useEffect(() => {
    if (userid) {
      fetchExercises(userid);
      fetchRoutines(userid);
    }
  }, [userid]);

  const navigateToRoutine = (id: number) => {
    navigate(`/routine/${id}`)
  }

  return (
    <div>
      <p className="mb-2 text-lg font-bold">Your Exercises</p>
      {exerciseData?.map((exercise) => (
        <p>{exercise?.name}</p>
      ))}
      <p className="mt-16 mb-2 text-lg font-bold">Your Routines</p>
      {routineData?.map((routine) => (
        <p className="hover:cursor-pointer hover:underline" onClick={() => navigateToRoutine(routine?.id)}>{routine?.routineName}</p>
      ))}
    </div>
  );
};

export default Library;
