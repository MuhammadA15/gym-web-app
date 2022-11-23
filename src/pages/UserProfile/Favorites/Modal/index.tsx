import React, { useEffect, useRef, useState } from "react";
import FilledButton from "../../../../components/ui/FilledButton/filledButton";
import { useOutsideClickAlerter } from "../../../../hooks/OutsideClickAlerter";
import { IRoutineType } from "../../../../types/routineType";
import {
  ADD_EXERCISE_TO_ROUTINE_ENDPOINT,
  FETCH_ROUTINES_ENDPOINT,
  FETCH_ROUTINE_EXERCISE_BY_EXERCISE_ID,
} from "../../../../utils/constants/apiEndpoints";
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
   * @param id
   */
  const fetchRoutines = async (id: string | null) => {
    await fetch(FETCH_ROUTINES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: id,
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          setRoutineData(data.body);
        } else {
          // console.log()
        }
      });
  };

  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true);

      // Reset map state for subsequent modal openings
      setExerciseInRoutineMap(new Map());

      fetchRoutines(userid);
    }
  }, [modalIsOpen, eId]);

  /**
   * Fetch routine exercise by routine id and exercise id
   * @param id
   */
  const fetchRoutineExercise = async (id: string) => {
    await fetch(
      FETCH_ROUTINE_EXERCISE_BY_EXERCISE_ID.replace("id", id).replace(
        "eid",
        eId
      ),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          setExerciseInRoutineMap(new Map(exerciseInRoutineMap?.set(id, true)));
        } else {
          setExerciseInRoutineMap(
            new Map(exerciseInRoutineMap?.set(id, false))
          );
        }
      });
  };

  /**
   * Check for exercise in routine
   */
  const checkRoutineForExercise = () => {
    routineData?.forEach((routine) =>
      fetchRoutineExercise(String(routine?.id))
    );
  };

  useEffect(() => {
    if (routineData) {
      checkRoutineForExercise();
      setLoading(false);
    }
  }, [routineData]);

  /**
   * Close modal window
   */
  const closeModal = () => {
    setModalIsOpen(false);
  };

  /**
   * Save exercise to routine
   */
  const saveExerciseToRoutine = async (id: number) => {
    setLoading(true);

    const data = {
      exerciseid: eId,
      routineid: id,
    };

    await fetch(ADD_EXERCISE_TO_ROUTINE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          alert(data.body.msg);
          setExerciseInRoutineMap(
            new Map(exerciseInRoutineMap?.set(String(id), true))
          );
        } else {
          // console.log()
        }
        setLoading(false);
      });
  };

  return (
    <div
      className="bg-light-black border-1 rounded-lg w-72 shadow-2xl"
      ref={wrapperRef}
    >
      <div className="pb-3">
        <p className="text-left text-lg pt-4 px-6 pr-10 mb-6">
          Select workout to save to...
        </p>
        {loading ? (
          <div className="loading mb-10 mx-auto"></div>
        ) : (
          <div className="px-10 mb-5">
            {routineData?.map((routine) => (
              <div className="flex flex-row items-center mb-4">
                <input
                  className="w-5 h-5 rounded-lg transition-all duration-500 outline hover:cursor-pointer"
                  type={"checkbox"}
                  onClick={() => {
                    exerciseInRoutineMap.get(String(routine?.id))
                      ? alert("Exercise is already saved to this routine!")
                      : saveExerciseToRoutine(routine?.id);
                  }}
                  checked={exerciseInRoutineMap.get(String(routine?.id))}
                />
                <p className="text-left text-lg ml-5">{routine?.routineName}</p>
              </div>
            ))}
          </div>
        )}
        <div className="text-right mr-4">
          <FilledButton text={"Close"} onClickFunc={closeModal} py={"py-1"} />
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;
