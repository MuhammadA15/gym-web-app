import React, { useEffect, useState } from "react";
import { exerciseTypes } from "../../../types/exerciseType";
import { FETCH_EXERCISE_BY_USERID_ENDPOINT } from "../../../utils/constants/apiEndpoints";

const Library = () => {
  
  const userid = localStorage.getItem("id");
  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);

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

  useEffect(() => {
    if (userid) {
      fetchExercises(userid);
    }
  }, [userid]);

  return (
    <div>
      {exerciseData?.map((exercise) => (
        <p>{exercise?.name}</p>
      ))}
    </div>
  );
};

export default Library;
