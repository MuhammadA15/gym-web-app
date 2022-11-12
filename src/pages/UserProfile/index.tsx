import React, { useEffect, useState } from "react";
// @ts-ignore
import emptyPhoto from "../../assets/blank-profile-picture.png";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import Favorites from "./Favorites";

const UserProfile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  let pId = "";

  const { tabId = "personal" } = useParams();
  const [currentTab, setCurrentTab] = useState(tabId);

  const menuItems = ["Personal", "Library", "Favorites", "Preferences"];

  useEffect(() => {
    setCurrentTab(tabId);
  }, [tabId]);

  return (
    <div className="grid grid-cols-9 h-screen">
      <div className="flex flex-col col-span-3 border-1 shadow-xl rounded-md m-4 p-7 h-full items-center">
        <img
          src={emptyPhoto}
          alt={"profile"}
          className="w-36 h-36 mb-2 rounded-full"
        />
        <p className="text-lg font-bold">{username}</p>
        <p className="text-lg text-gray-500 mb-5">{email}</p>
        <FilledButton text="Edit Profile" py={"py-1"} width={"w-3/4"} />
      </div>
      <div className="col-span-6 m-4 h-full">
        <div>
          <div className="grid grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`
                  py-2
                  ${
                    currentTab === item.toLocaleLowerCase() ? "menu_active" : ""
                  }
                `}
              >
                <p
                  className="
                  py-0.5
                  rounded
                  hover:cursor-pointer 
                  hover:bg-gray-400
                  hover:bg-opacity-10 
                  transition-all
                  duration-100
                  "
                  onClick={() => {
                    if (index === 0) {
                      pId = "personal";
                    } else if (index === 1) {
                      pId = "library";
                    } else if (index === 2) {
                      pId = "favorites";
                    } else if (index === 3) {
                      pId = "preferences";
                    }
                    navigate(`/user-profile/${pId}`);
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
          <hr className="user-profile-border-t-1 border-g-300" />
          <div className="mt-10">
            {currentTab === "personal" ? (
              "Personal"
            ) : currentTab === "library" ? (
              "Library"
            ) : currentTab === "favorites" ? (
              <Favorites />
            ) : (
              "Preferences"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
