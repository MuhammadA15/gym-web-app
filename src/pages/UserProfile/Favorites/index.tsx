import React, { useState, useEffect, useCallback, useRef } from "react";
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
import FavoritesEntryCard from "./FavoritesEntryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Favorites = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [favExerciseIDs, setFavExerciseIDs] = useState<number[] | null>([]);
  const [favExercises, setFavExercises] = useState<exerciseTypes[]>([]);
  const [favCount, setFavCount] = useState<Map<number, number>>(new Map());
  const [isOpenList, setIsOpenList] = useState<Map<number, boolean>>(new Map());
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
        {!loading && favExercises
          ?.sort((a, b) => a?.name.localeCompare(b?.name))
          ?.map((exercise, index) => (
            <FavoritesEntryCard
              index={index}
              exercise={exercise}
              isOpenList={isOpenList}
              favCount={favCount}
              loading={loading}
              openDetailsMenu={openDetailsMenu}
              setIsOpenList={setIsOpenList}
              removeFavorite={removeFavorite}
            />
          ))
        }
        {loading && Array.from(Array(8).keys())?.map((i) => (
            <FavoritesEntryCard 
              index={i}
              exercise={null}
              isOpenList={isOpenList}
              favCount={null}
              loading={loading}
              openDetailsMenu={openDetailsMenu}
              setIsOpenList={setIsOpenList}
              removeFavorite={removeFavorite}
            /> 
          ))
        }
    </div>
  );
};

export default Favorites;
