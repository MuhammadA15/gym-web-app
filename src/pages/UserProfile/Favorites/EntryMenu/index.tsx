import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdRemove, MdPlaylistAdd } from "react-icons/md";
import { IRoutineType } from "../../../../types/routineType";
import { FETCH_ROUTINES_ENDPOINT } from "../../../../utils/constants/apiEndpoints";

const EntryMenu = ({
  isOpen,
  exerciseId,
  isOpenList,
  setIsOpenList,
  setModalIsOpen,
  setEId,
  removeFavorite,
}: {
  isOpen: boolean | undefined;
  exerciseId: string;
  isOpenList: Map<number, boolean>;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenList: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
  removeFavorite: (exerciseId: string) => void;
}) => {

  //console.log(exerciseId);

  const openModal = (exerciseId: string) => {
    setModalIsOpen(true);
    setEId(exerciseId);
  }

  return (
    <>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute border-1 right-10 mt-1 z-100 w-60 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="block py-1 text-md text-left text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <div onClick={() => openModal(exerciseId)} className="flex flex-row items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <MdPlaylistAdd className="font-bold text-2xl" color="" />
                <p className="ml-2">
                  Add To Workout
                </p>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => removeFavorite(exerciseId)}
              >
                <MdRemove className="font-bold text-2xl" color="black" />
                <p className="ml-2">Remove From Favorites</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default EntryMenu;
