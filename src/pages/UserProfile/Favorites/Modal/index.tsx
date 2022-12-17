import React, { useEffect, useRef, useState } from "react";
import FilledButton from "../../../../components/ui/FilledButton/filledButton";
import { useOutsideClickAlerter } from "../../../../hooks/OutsideClickAlerter";
import {
  fetchRoutineExercise,
  fetchUserRoutines,
  removeExerciseFromRoutine,
  saveExerciseToRoutine,
} from "../../../../services/routineService";
import { IRoutineType } from "../../../../types/routineType";
import "./styles.scss";

const AddExerciseModal = ({
  modalIsOpen,
  userid,
  eId,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  userid: string | null;
  eId: string;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const wrapperRef = useRef(null);
  useOutsideClickAlerter(wrapperRef, setModalIsOpen);

  const [routineData, setRoutineData] = useState<IRoutineType[] | null>([]);
  const [exerciseInRoutineMap, setExerciseInRoutineMap] = useState<Map<String, boolean>>(new Map());
  const [loading, setLoading] = useState(false);

  /**
   * Fetch routines
   * @param userid
   */
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
    if (modalIsOpen && userid) {
      setLoading(true);

      // Reset map state for subsequent modal openings
      setExerciseInRoutineMap(new Map());

      makeFetchUserRoutinesCall(userid);
    }
  }, [modalIsOpen, eId]);

  /**
   * Fetch routine exercise by routine id and exercise id
   * @param routineid
   */
  const makeFetchRoutineExerciseCall = async (routineid: string) => {
    fetchRoutineExercise(routineid, eId).then((data) => {
      if (data.status === 200) {
        setExerciseInRoutineMap(
          new Map(exerciseInRoutineMap?.set(routineid, true))
        );
      } else {
        setExerciseInRoutineMap(
          new Map(exerciseInRoutineMap?.set(routineid, false))
        );
      }
    });
  };

  /**
   * Check for exercise in routine
   */
  const checkRoutineForExercise = () => {
    routineData?.forEach((routine) =>
      makeFetchRoutineExerciseCall(String(routine?.id))
    );
  };

  useEffect(() => {
    if (routineData) {
      checkRoutineForExercise();
      setLoading(false);
    }
  }, [routineData]);

  /**
   * Save exercise to routine
   */
  const makeSaveExerciseToRoutineCall = async (routineid: number) => {
    setLoading(true);
    saveExerciseToRoutine(routineid, eId).then((data) => {
      if (data.status === 200) {
        setExerciseInRoutineMap(
          new Map(exerciseInRoutineMap?.set(String(routineid), true))
        );
      } else {
        // console.log()
      }
      setLoading(false);
    });
  };

  /**
   * Remove routine exercise by routine id and exercise id
   * @param routineid
   */
  const makeRemoveExerciseFromRoutineCall = async (routineid: string) => {
    removeExerciseFromRoutine(routineid, eId).then((data) => {
      if (data.status === 200) {
        setExerciseInRoutineMap(
          new Map(exerciseInRoutineMap?.set(routineid, false))
        );
      } else {
        // console.log
      }
    });
  };

  /**
   * Close modal window
   */
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className="bg-neutral-900 rounded w-72 shadow-2xl"
      ref={wrapperRef}
    >
      <div className="pb-3">
        <p className="text-left text-md pt-4 px-6 pr-10 mb-6">
          Select workout to save to...
        </p>
        {loading ? (
          <div className="loading mb-10 mx-auto"></div>
        ) : (
          <div className="px-10 mb-5">
            {routineData?.map((routine) => (
              <div className="flex flex-row items-center mb-4">
                <input
                  className="w-4 h-4 rounded-lg transition-all duration-500 hover:cursor-pointer"
                  type={"checkbox"}
                  onClick={() => {
                    exerciseInRoutineMap.get(String(routine?.id))
                      ? makeRemoveExerciseFromRoutineCall(String(routine?.id))
                      : makeSaveExerciseToRoutineCall(routine?.id);
                  }}
                  checked={exerciseInRoutineMap.get(String(routine?.id))}
                />
                <p className="text-left text-md ml-5">{routine?.routineName}</p>
              </div>
            ))}
          </div>
        )}
        <div className="text-right mr-4">
          <FilledButton text={"Close"} onClickFunc={closeModal} py={"py-1"} textSize={"text-sm"} />
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;
