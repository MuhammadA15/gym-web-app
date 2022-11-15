import React from "react";
import { Link } from "react-router-dom";
import { MdRemove, MdPlaylistAdd } from "react-icons/md";

const EntryMenu = ({
  isOpen,
  exerciseId,
  isOpenList,
  setIsOpenList,
  removeFavorite,
}: {
  isOpen: boolean | undefined;
  exerciseId: string;
  isOpenList: Map<number, boolean>;
  setIsOpenList: React.Dispatch<React.SetStateAction<Map<number, boolean>>>
  removeFavorite: (exerciseId: string) => void;
}) => {

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
              <Link
                to="/home"
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <MdPlaylistAdd className="font-bold text-2xl" color="" />
                <p className="ml-2">Add To Workout</p>
              </Link>
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
