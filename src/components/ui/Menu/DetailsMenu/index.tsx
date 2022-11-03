import React, { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import emptyPhoto from '../../../../assets/blank-profile-picture.png';
import './styles.scss';

const DetailsMenu = ({ logout, username }: { logout: () => void, username: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          id="dropdownDefault"
          className="rounded-full focus:outline-none"
          type="button"
          onClick={menuClick}
        >
          <img src={emptyPhoto} className="h-10 w-10 rounded-full" alt={'profile photo'}/>
        </button>
        <svg
          className="ml-1 w-4 h-4 hover:cursor-pointer"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={menuClick}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute border-1 right-10 mt-1 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="block py-1 text-md text-left text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li className="p-3 grid grid-cols-3 gap-2 items-center">
              <img src={emptyPhoto} className="w-10 h-10 rounded-full" alt={'profile photo'}/>
              <div className="col-span-2">
                Signed in as {" "}
                <strong>{username}</strong>
              </div>
            </li>
            <hr className="border-t-1 border-gray-300" />
            <li>
              <Link
                to="/home"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/user-profile"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                User Profile
              </Link>
            </li>
            <li>
              <button
                className="block text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                onClick={logout}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsMenu;
