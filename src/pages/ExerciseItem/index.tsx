import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FETCH_EXERCISE_BY_ID_ENDPOINT } from '../../utils/constants/apiEndpoints';
import { exerciseTypes } from '../Search';

const ExerciseItem = () => {

  const { exerciseId = '' } = useParams();

  const [exerciseData, setExerciseData] = useState<exerciseTypes | null>();

  const fetchExercise = async () => {
    await fetch(FETCH_EXERCISE_BY_ID_ENDPOINT?.replace('id', exerciseId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          console.log("data", data.body);
          setExerciseData(data.body);
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  useEffect(() => {
    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  return (
      <div>{exerciseData?.name}</div>
  );
}

export default ExerciseItem