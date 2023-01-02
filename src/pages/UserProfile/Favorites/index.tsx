import React, { useState, useEffect, useCallback } from "react";
import {
  fetchExercise,
  fetchFavCount,
  fetchFavorites,
  removeFavorite,
} from "../../../services/exerciseService";
import { exerciseTypes } from "../../../types/exerciseType";
import { IFavExerciseType } from "../../../types/favoriteExerciseType";
import FavoritesEntryCard from "./FavoritesEntryCard";
import AddExerciseModal from "./Modal";
import "./styles.scss";

const Favorites = () => {
  const userId = localStorage.getItem("id");

  const [favExerciseIDs, setFavExerciseIDs] = useState<
    IFavExerciseType[] | null
  >([]);
  const [favExercises, setFavExercises] = useState<exerciseTypes[]>([]);
  const [favCount, setFavCount] = useState<Map<number, number>>(new Map());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eId, setEId] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * Get Favorite Exercises IDs
   */
  const makeFetchFavoritesCall = async (userid: string) => {
    fetchFavorites(userid).then((data) => {
      if (data?.status === 200) {
        setFavExerciseIDs(data.body);
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  useEffect(() => {
    if (userId) {
      makeFetchFavoritesCall(userId);
    }
  }, [userId]);

  /**
   * Fetch favorite exercises by Id
   * @param exerciseId
   */
  const makeFetchExerciseCall = async (exerciseId: string) => {
    fetchExercise(exerciseId).then((data) => {
      if (data?.status === 200) {
        setFavExercises((favExercisesArr) => [...favExercisesArr, data.body]);
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  const getExercisesbyId = useCallback(() => {
    favExerciseIDs?.forEach((data) => {
      makeFetchExerciseCall(String(data?.exerciseId));
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
  const makeFetchFavCountCall = async (exerciseId: number) => {
    fetchFavCount(String(exerciseId)).then((data) => {
      if (data?.status === 200) {
        setFavCount(new Map(favCount?.set(exerciseId, data.body)));
      } else {
        // console.log(err)
      }
    });
  };

  const mapFavCount = useCallback(() => {
    favExercises?.forEach((exercise) => {
      makeFetchFavCountCall(exercise.id);
    });
  }, [favExercises]);

  useEffect(() => {
    if (favExercises) {
      mapFavCount();
      setLoading(false);
    }
  }, [favExercises, mapFavCount]);

  /**
   * Remove exercise from favorites
   */
  const makeRemoveFavoriteCall = async (userid: string, exerciseId: string) => {
    removeFavorite(userid, exerciseId).then((data) => {
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

  const openMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setCardMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>,
    cardMenuOpenState: boolean
  ) => {
    e.stopPropagation();
    setCardMenuOpenState(!cardMenuOpenState);
  };

  return (
    <div>
      <div
        className={`${
          modalIsOpen ? "page-mask" : ""
        } transition-all duration-300`}
      ></div>
      <div
        className={`${
          !modalIsOpen ? "modal" : "box-shadow show"
        } transition-all duration-500`}
      >
        <AddExerciseModal
          modalIsOpen={modalIsOpen}
          userid={userId}
          eId={eId}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
      {!loading &&
        favExercises
          ?.sort((a, b) => a?.name.localeCompare(b?.name))
          ?.map((exercise, index) => (
            <FavoritesEntryCard
              index={index}
              exercise={exercise}
              favCount={favCount}
              loading={loading}
              openMenu={openMenu}
              removeFavorite={makeRemoveFavoriteCall}
              setModalIsOpen={setModalIsOpen}
              setEId={setEId}
            />
          ))}
      {loading &&
        Array.from(Array(8).keys())?.map((i) => (
          <FavoritesEntryCard
            index={i}
            exercise={null}
            favCount={null}
            loading={loading}
            openMenu={openMenu}
            removeFavorite={makeRemoveFavoriteCall}
            setModalIsOpen={setModalIsOpen}
            setEId={setEId}
          />
        ))}
    </div>
  );
};

export default Favorites;
