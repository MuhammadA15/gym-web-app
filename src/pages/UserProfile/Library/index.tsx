import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../components/ui/LoadingIcon/loadingIcon";
import {
  deleteExercise,
  fetchExerciseByAuthor,
} from "../../../services/exerciseService";
import {
  deleteRoutine,
  fetchUserRoutines,
} from "../../../services/routineService";
import { exerciseTypes } from "../../../types/exerciseType";
import { IRoutineType } from "../../../types/routineType";
import RecommendationCard from "../../Home/recommendationCard";
import AddExerciseModal from "../Favorites/Modal";
import ExerciseCard from "./ExerciseCard";
import RoutineCard from "./RoutineCard";

const Library = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [exerciseData, setExerciseData] = useState<exerciseTypes[]>([]);
  const [routineData, setRoutineData] = useState<IRoutineType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eId, setEId] = useState("");

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

  const makeDeleteExerciseCall = async (exerciseId: string, userId: string) => {
    deleteExercise(exerciseId, userId).then((data) => {
      if (data?.status === 200) {
        alert(data?.body?.msg);
        setExerciseData(
          exerciseData.filter((exercise) => {
            return exercise?.id !== Number(exerciseId);
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
    <div className="mb-10">
      <div
        className={`${
          modalIsOpen ? "page-mask z-10" : ""
        } transition-all duration-300`}
      ></div>
      <div
        className={`${
          !modalIsOpen ? "modal" : "box-shadow show"
        } transition-all duration-500 relative z-50`}
      >
        <AddExerciseModal
          modalIsOpen={modalIsOpen}
          userid={userid}
          eId={eId}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
      <div className="flex items-center mb-4 text-left">
        <p className="text-md font-bold mr-2">Your Workout Routines</p>
        <hr className="border-top-1 mt-1 flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {routineData.length ? (
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
        {exerciseData.length ? (
          exerciseData?.map((exercise) => (
            <div className="flex justify-center mb-6">
              <ExerciseCard
                exercise={exercise}
                openMenu={openMenu}
                makeDeleteExerciseCall={makeDeleteExerciseCall}
                setModalIsOpen={setModalIsOpen}
                setEId={setEId}
              />
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
