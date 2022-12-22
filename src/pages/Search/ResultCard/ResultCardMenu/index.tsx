import React from "react";
import { MdPlaylistAdd } from "react-icons/md";
import "./styles.scss";

const ResultCardMenu = ({
  isOpen,
  exerciseId,
  setModalIsOpen,
  setEId,
}: {
  isOpen: boolean;
  exerciseId: string;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userId = localStorage.getItem("id") || "";

  const openModal = (exerciseId: string) => {
    setModalIsOpen(true);
    setEId(exerciseId);
  };

  return (
    <>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute border-1 -right-5 mt-1 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow-2xl dark:bg-gray-700"
        >
          <ul
            className="block py-1 text-md text-left text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <div
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => openModal(exerciseId)}
              >
                <MdPlaylistAdd className="font-bold text-xl" color="" />
                <p className="ml-2 text-sm">Add to Workout</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ResultCardMenu;
