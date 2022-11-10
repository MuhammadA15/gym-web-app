import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FETCH_EXERCISE_BY_ID_ENDPOINT,
  ADD_EXERCISE_FAVORITES_ENDPOINT,
  GET_FAVORITES_ENDPOINT,
  GET_FAVORITES_COUNT_ENDPOINT,
  REMOVE_EXERCISE_FAVORITES_ENDPOINT,
} from "../../utils/constants/apiEndpoints";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { exerciseTypes } from "../../types/exerciseType";

const ExerciseItem = () => {
  const userId = localStorage.getItem("id");
  const { exerciseId = "" } = useParams();

  const [exerciseData, setExerciseData] = useState<exerciseTypes | null>();
  const [favExercises, setFavExercises] = useState<number[] | null>([]);
  const [isFav, setIsFav] = useState(false);
  const [favCount, setFavCount] = useState(0);

  /**
   * Fetch exercise data
   */
  const fetchExercise = async () => {
    await fetch(FETCH_EXERCISE_BY_ID_ENDPOINT?.replace("id", exerciseId), {
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

  /**
   * Get Favorite Exercises
   */
  const fetchFavorites = async () => {
    await fetch(GET_FAVORITES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userId,
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          console.log("data", data.body);
          setFavExercises(data.body);
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  /**
   * Check if exercise is favorite
   * @param exerciseId 
   * @returns 
   */
  const checkFavExercise = (exerciseId: number) => {
    if (favExercises) {
      return favExercises.some((favId) => favId === exerciseId);
    }
    return false;
  };

  useEffect(() => {
    if (favExercises && exerciseData) {
      setIsFav(checkFavExercise(exerciseData?.id));
    }
  }, [favExercises, exerciseData]);

  /**
   * Get favorite count
   * @param exerciseId 
   */
  const fetchFavCount = async (exerciseId: string) => {
    await fetch(GET_FAVORITES_COUNT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseId),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          setFavCount(data.body);
        } else {
          // console.log(err)
        }
      });
  };

  useEffect(() => {
    if (exerciseId) {
      fetchFavCount(exerciseId);
    }
  }, [exerciseId]);

  /**
   * Add exercise to favorites
   */
  const addFavorite = async () => {
    const data = { userId, exerciseId };

    await fetch(ADD_EXERCISE_FAVORITES_ENDPOINT?.replace("id", exerciseId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          setIsFav(true);
          setFavCount(prev => {
            const nextState = prev + 1
            return nextState;
          })
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  /**
   * Remove exercise from favorites
   */
  const removeFavorite = async () => {
    const data = { userId, exerciseId };

    await fetch(REMOVE_EXERCISE_FAVORITES_ENDPOINT?.replace("id", exerciseId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          setIsFav(false);
          setFavCount(prev => {
            const nextState = prev - 1
            return nextState;
          })
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  return (
    <div className="grid grid-cols-4 bg-black rounded h-screen -mt-5">
      <div className="col-span-1 ml-16 mt-16 flex flex-col items-center">
        <img src={exerciseData?.gifUrl} className="h-80" />
      </div>
      <div className="col-span-3 m-12 mt-16 flex flex-col border-1 rounded w-3/4 items-start h-52 p-4">
        <div className="flex flex-row items-center w-full">
          <p className="text-lg font-bold text-capital mr-3">
            {exerciseData?.name}
          </p>
          <p className="bg-orange-400 rounded-full px-3 py-0.5 mx-2 my-1 text-capital">
            {exerciseData?.bodyPart}
          </p>
          <p className="bg-green-400 rounded-full px-3 py-0.5 mx-1 my-1 text-capital">
            {exerciseData?.target}
          </p>
          <div
            className="ml-auto flex flex-row items-center mr-3"
          >
            <p 
              className="mr-2 hover:cursor-pointer" 
              onClick={() => {
                isFav ? removeFavorite() : addFavorite();
              }}
            >
              {isFav ? (
                <BsFillStarFill className="text-xl" color="#eac54f" />
              ) : (
                <BsStar className="text-xl" color="rgb(94 94 94)" />
              )}
            </p>
            <p className="text-lg">{favCount}</p>
          </div>
        </div>
        <p className="text-gray-500 mb-6 text-capital">
          {exerciseData?.equipment}
        </p>
        <p className="text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          natus ex asperiores odio eum accusamus maxime deserunt, dolores
          tempore error repellat dolorem nam nihil a. Perspiciatis similique
          voluptate hic sapiente?
        </p>
      </div>
    </div>
  );
};

export default ExerciseItem;
