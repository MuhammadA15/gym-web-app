import React, { useEffect, useRef, useState } from "react";
import FilledButton from "../../../../components/ui/FilledButton/filledButton";
import { useOutsideClickAlerter } from "../../../../hooks/OutsideClickAlerter";
import { IRoutineType } from "../../../../types/routineType";
import { FETCH_ROUTINES_ENDPOINT } from "../../../../utils/constants/apiEndpoints";
import './styles.scss'

const AddExerciseModal = ({
  modalIsOpen,
  userid,
  eId,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  userid: string | null;
  eId: string | null;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const wrapperRef = useRef(null);
  useOutsideClickAlerter(wrapperRef, setModalIsOpen);

  const [routineData, setRoutineData] = useState<IRoutineType[] | null>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoutines = async (id: string | null) => {
    setLoading(true);
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
        setLoading(false);
      });
  };

  useEffect(() => {
    if (modalIsOpen) {
      fetchRoutines(userid);
    }
  }, [modalIsOpen]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="bg-light-black rounded-lg w-72 shadow-2xl" ref={wrapperRef}>
      <div className="pb-3">
        <p className="text-left text-lg pt-4 px-6 pr-10 mb-6">
          Select workout to save to...
        </p>
        {loading ? (
          <div className="loading mb-10 mx-auto"></div>
        ) : (
          <div className="px-10 mb-10">
            {routineData?.map((routine) => (
              <div className="flex flex-row items-center mb-4">
              <input 
                className="w-5 h-5 rounded-lg transition-all duration-500 outline hover:cursor-pointer"
                type={"checkbox"}
                onClick={() => {console.log("Saved!")}}
              />
              <p className="text-left text-lg ml-5">{routine?.routineName}</p>
              </div>
            ))}
          </div>
        )}
        <div className="text-right mr-4">
          <FilledButton text={"Close"} onClickFunc={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;
