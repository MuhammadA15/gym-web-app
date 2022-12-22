import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../components/ui/LoadingIcon/loadingIcon";
import { fetchExerciseByAuthor } from "../../../services/exerciseService";
import {
  deleteRoutine,
  fetchUserRoutines,
} from "../../../services/routineService";
import { exerciseTypes } from "../../../types/exerciseType";
import { IRoutineType } from "../../../types/routineType";
import RecommendationCard from "../../Home/recommendationCard";
import RoutineCard from "./RoutineCard";

const Library = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [exerciseData, setExerciseData] = useState<exerciseTypes[] | null>([]);
  const [routineData, setRoutineData] = useState<IRoutineType[]>([]);

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

  const makeDeleteRoutineCall = async (routineId: string) => {
    deleteRoutine(routineId).then((data) => {
      if (data?.status === 200) {
        alert(data?.body?.msg);
        setRoutineData(
          routineData.filter((routine) => {
            return routine?.id !== Number(routineId);
          })
        );
      } else {
        console.log("error");
      }
    });
  };

  const navigateToRoutine = (id: number) => {
    navigate(`/routine/${id}/exerciselist`);
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
      <div className="flex items-center mb-4 text-left">
        <p className="text-md font-bold mr-2">Your Workout Routines</p>
        <hr className="border-top-1 mt-1 flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {routineData ? (
          routineData?.map((routine) => (
            <RoutineCard
              routineData={routine}
              navigateToRoutine={navigateToRoutine}
              openMenu={openMenu}
              makeDeleteRoutineCall={makeDeleteRoutineCall}
            />
          ))
        ) : (
          <LoadingIcon className="w-8 h-8" />
        )}
      </div>
      <div className="flex items-center mb-8 mt-8 text-left">
        <p className="text-md font-bold mr-2">Your Exercises</p>
        <hr className="border-top-1 mt-1 flex-1" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {exerciseData ? (
          exerciseData?.map((exercise) => (
            <div className="flex justify-center mb-6">
              <RecommendationCard exercise={exercise} />
            </div>
          ))
        ) : (
          <LoadingIcon className="w-8 h-8" />
        )}
      </div>
    </div>
  );
};

export default Library;
