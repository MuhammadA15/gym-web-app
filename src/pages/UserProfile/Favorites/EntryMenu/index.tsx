import React from "react";
import { MdRemove, MdPlaylistAdd } from "react-icons/md";

const EntryMenu = ({
  isOpen,
  exerciseId,
  setModalIsOpen,
  setEId,
  removeFavorite,
}: {
  isOpen: boolean | undefined;
  exerciseId: string;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removeFavorite: (userid: string, exerciseId: string) => void;
}) => {

  //console.log(exerciseId);
  const userId = localStorage.getItem("id") || "";

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
                <MdPlaylistAdd className="font-bold text-xl" color="" />
                <p className="ml-2 text-sm">
                  Add To Workout
                </p>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => removeFavorite(userId, exerciseId)}
              >
                <MdRemove className="font-bold text-xl" color="black" />
                <p className="ml-2 text-sm">Remove From Favorites</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default EntryMenu;
