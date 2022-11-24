import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { exerciseTypes } from "../../types/exerciseType";
import { IFavExerciseType } from "../../types/favoriteExerciseType";
import {
  addFavorite,
  fetchExercise,
  fetchFavCount,
  fetchFavorites,
  removeFavorite,
} from "../../services/exerciseService";

const ExerciseItem = () => {
  const userId = localStorage.getItem("id") || "";
  const { exerciseId = "" } = useParams();

  const [exerciseData, setExerciseData] = useState<exerciseTypes | null>();
  const [favExercises, setFavExercises] = useState<IFavExerciseType[] | null>([]);
  const [isFav, setIsFav] = useState(false);
  const [favCount, setFavCount] = useState(0);

  /**
   * Fetch exercise data
   */
  const makeFetchExerciseCall = async () => {
    fetchExercise(exerciseId).then((data) => {
      if (data?.status === 200) {
        setExerciseData(data.body);
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  useEffect(() => {
    if (exerciseId) {
      makeFetchExerciseCall();
    }
  }, [exerciseId]);

  /**
   * Get Favorite Exercises
   */
  const makeFetchFavoritesCall = async (userId: string) => {
    fetchFavorites(userId).then((data) => {
      if (data?.status === 200) {
        setFavExercises(data.body);
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
   * Check if exercise is favorite
   * @param exerciseId
   * @returns
   */
  const checkFavExercise = (exerciseId: number) => {
    if (favExercises) {
      return favExercises.some((data) => data?.exerciseId === exerciseId);
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
  const makeFetchFavCountCall = async (exerciseId: string) => {
    fetchFavCount(exerciseId).then((data) => {
      if (data?.status === 200) {
        setFavCount(data.body);
      } else {
        // console.log(err)
      }
    });
  };

  useEffect(() => {
    if (exerciseId) {
      makeFetchFavCountCall(exerciseId);
    }
  }, [exerciseId]);

  /**
   * Add exercise to favorites
   */
  const makeAddFavoriteCall = async (userId: string, exerciseId: string) => {
    addFavorite(userId, exerciseId).then((data) => {
      if (data?.status === 200) {
        setIsFav(true);
        setFavCount((prev) => {
          const nextState = prev + 1;
          return nextState;
        });
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  /**
   * Remove exercise from favorites
   */
  const makeRemoveFavoriteCall = async (userId: string, exerciseId: string) => {
    removeFavorite(userId, exerciseId).then((data) => {
      if (data?.status === 200) {
        setIsFav(false);
        setFavCount((prev) => {
          const nextState = prev - 1;
          return nextState;
        });
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  return (
    <div className="grid grid-cols-4 bg-black rounded h-screen">
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
          <div className="ml-auto flex flex-row items-center mr-3">
            <p
              className="mr-2 hover:cursor-pointer"
              onClick={() => {
                isFav
                  ? makeRemoveFavoriteCall(userId, exerciseId)
                  : makeAddFavoriteCall(userId, exerciseId);
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
