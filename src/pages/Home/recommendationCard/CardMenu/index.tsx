import React from "react";

const CardMenu = ({
  isOpen,
  exerciseId,
  setModalIsOpen,
  setEId,
  makeAddFavoriteCall,
  makeRemoveFavoriteCall,
  isFav,
}: {
  isOpen: boolean;
  exerciseId: string;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  makeAddFavoriteCall: (userId: string, exerciseId: string) => void;
  makeRemoveFavoriteCall: (userId: string, exerciseId: string) => void;
  isFav: boolean;
}) => {
  const userId = localStorage.getItem("id");

  const openModal = (exerciseId: string) => {
    setModalIsOpen(true);
    setEId(exerciseId);
  };

  return (
    <>
      {isOpen && (
        <div
          id="dropdown"
          className={`absolute rounded border-1 right-0 mt-1 z-100 ${
            isFav ? "w-52" : "w-40"
          } bg-white rounded divide-y divide-gray-100 shadow-2xl dark:bg-gray-700`}
        >
          <ul
            className="block py-1 text-md text-left text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <div
                onClick={() => openModal(exerciseId)}
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <p className="ml-2 text-sm">Add to Workout</p>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() =>
                  userId && !isFav
                    ? makeAddFavoriteCall(userId, exerciseId)
                    : userId && isFav
                    ? makeRemoveFavoriteCall(userId, exerciseId)
                    : ""
                }
              >
                <p className="ml-2 text-sm">
                  {isFav ? "Remove from Favorites" : "Save to Favorites"}
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CardMenu;
