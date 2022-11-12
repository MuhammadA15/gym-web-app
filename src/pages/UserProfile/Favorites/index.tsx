import React, { useState, useEffect, useCallback } from "react";
import { BsFillStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import {
  GET_FAVORITES_ENDPOINT,
  FETCH_EXERCISE_BY_ID_ENDPOINT,
  GET_FAVORITES_COUNT_ENDPOINT,
  REMOVE_EXERCISE_FAVORITES_ENDPOINT,
} from "../../../utils/constants/apiEndpoints";
import EntryMenu from "./EntryMenu";

const Favorites = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [favExerciseIDs, setFavExerciseIDs] = useState<number[] | null>([]);
  const [favExercises, setFavExercises] = useState<exerciseTypes[]>([]);
  const [favCount, setFavCount] = useState<Map<number, number>>(new Map());
  const [isOpenList, setIsOpenList] = useState<Map<number, boolean>>(new Map());

  /**
   * Get Favorite Exercises IDs
   */
  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

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
          // console.log("data", data.body);
          setFavExerciseIDs(data.body);
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  /**
   * Fetch favorite exercises by Id
   * @param exerciseId
   */
  const fetchExercise = async (exerciseId: string) => {
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
          // console.log("data", data.body);
          setFavExercises((favExercisesArr) => [...favExercisesArr, data.body]);
          setIsOpenList(new Map(isOpenList?.set(data?.body?.id, false)));
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  const getExercisesbyId = useCallback(() => {
    favExerciseIDs?.forEach((id) => {
      fetchExercise(String(id));
    });
  }, [favExerciseIDs]);

  useEffect(() => {
    if (favExerciseIDs) {
      getExercisesbyId();
    }
  }, [favExerciseIDs, getExercisesbyId]);

  /**
   * Get favorite count and map to exercise
   * @param exerciseId
   */
  const fetchFavCount = async (exercise: exerciseTypes) => {
    await fetch(GET_FAVORITES_COUNT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise?.id),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res?.status, body: data }))
      )
      .then((data) => {
        if (data?.status === 200) {
          // console.log(data.body)
          setFavCount(new Map(favCount?.set(exercise?.id, data.body)));
        } else {
          // console.log(err)
        }
      });
  };

  const mapFavCount = useCallback(() => {
    favExercises?.forEach((exercise) => {
      fetchFavCount(exercise);
    });
  }, [favExercises]);

  useEffect(() => {
    if (favExercises) {
      mapFavCount();
    }
  }, [favExercises, mapFavCount]);

  /**
   * Set open state for selected entry menu
   * @param exerciseId
   */
  const openDetailsMenu = (exerciseId: number) => {
    isOpenList.forEach((val, key) => {
      if (key !== exerciseId) {
        setIsOpenList(new Map(isOpenList?.set(key, false)));
      }
    });
    setIsOpenList(
      new Map(isOpenList?.set(exerciseId, !isOpenList?.get(exerciseId)))
    );
  };

  /**
   * Remove exercise from favorites
   */
  const removeFavorite = async (exerciseId: string) => {
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
          setFavExercises(
            favExercises.filter((exercise) => {
              return exercise?.id !== Number(exerciseId);
            })
          );
        } else {
          // setErrorMsg(data?.body?.msg);
        }
      });
  };

  return (
    <div>
      {favExercises
        ?.sort((a, b) => a?.name.localeCompare(b?.name))
        ?.map((exercise, index) => (
          <div
            key={index}
            className="border-1 rounded mb-6 flex flex-row shadow-xl"
          >
            <img
              src={exercise?.gifUrl}
              className="h-fit max-h-48 rounded-l border-r-1"
            />
            <div className="flex flex-col mx-4 pt-4 px-4">
              <div className="flex flex-row items-center">
                <p
                  className="font-bold text-capital text-left hover:cursor-pointer hover:underline"
                  onClick={() => navigate(`/exercise/${exercise?.id}`)}
                >
                  {exercise?.name}
                </p>
                <p className="bg-orange-400 rounded-full px-3 py-0.5 ml-3 mr-1 my-1 text-capital text-sm">
                  {exercise?.bodyPart}
                </p>
                <p className="bg-green-400 rounded-full px-3 py-0.5 mx-1 my-1 text-capital text-sm">
                  {exercise?.target}
                </p>
                <div
                  className="ml-auto -mr-5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded py-1.5 px-1.5"
                  onClick={() => openDetailsMenu(exercise?.id)}
                >
                  <BsThreeDotsVertical />
                  <EntryMenu
                    isOpen={isOpenList?.get(exercise?.id)}
                    removeFavorite={removeFavorite}
                    exerciseId={String(exercise?.id)}
                  />
                </div>
              </div>
              <p className="text-gray-500 text-capital text-left mb-2">
                {exercise?.equipment}
              </p>
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione totam consectetur quam veritatis voluptatem dolorem vero
                magni consequatur eius, laudantium quod suscipit perferendis.
                Dolore, voluptas facere eaque placeat at praesentium.
              </p>
              <div className="mt-auto mb-2 flex flex-row items-center">
                <BsFillStarFill className="text-sm" color="#eac54f" />
                <p className="mx-2">{favCount?.get(exercise?.id)}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Favorites;
