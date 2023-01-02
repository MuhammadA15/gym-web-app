import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../utils/utils";
// @ts-ignore
import exerciseAltImage from "../../../assets/exercise-alt-img.jpg";
import { addFavorite, fetchFavCount, removeFavorite } from "../../../services/exerciseService";
import { BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import CardMenu from "./CardMenu";
import { useOutsideClickAlerter } from "../../../hooks/OutsideClickAlerter";

const RecommendationCard = ({
  exercise,
  openMenu,
  setModalIsOpen,
  setEId,
}: {
  exercise: exerciseTypes;
  openMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setCardMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>,
    cardMenuOpenState: boolean
  ) => void;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const [favCount, setFavCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [IsFav, setIsFav] = useState(false);

  const wrapperRef = useRef(null);

  useOutsideClickAlerter(wrapperRef, setIsOpen);

  const makeFetchFavCountCall = (exerciseId: string) => {
    fetchFavCount(exerciseId).then((data) => {
      if (data?.status === 200) {
        setFavCount(data?.body);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    if (exercise?.id) {
      makeFetchFavCountCall(String(exercise?.id));
    }
  }, [exercise?.id]);

  /**
   * Add exercise to favorites
   */
   const makeAddFavoriteCall = async (userId: string, exerciseId: string) => {
    addFavorite(userId, exerciseId).then((data) => {
      if (data?.status === 200) {
        setIsFav(true);
        setFavCount((prev) => {
          const nextState = prev + 1;
          return nextState;
        });
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  const makeRemoveFavoriteCall = async (userId: string, exerciseId: string) => {
    removeFavorite(userId, exerciseId).then((data) => {
      if (data?.status === 200) {
        setIsFav(false);
        setFavCount((prev) => {
          const nextState = prev - 1;
          return nextState;
        });
      } else {
        // setErrorMsg(data?.body?.msg);
      }
    });
  };

  return (
    <div
      onClick={() => navigate(`/exercise/${exercise?.id}`)}
      className="col-span-1 w-11/12 bg-light-black rounded shadow-xl flex flex-col hover:cursor-pointer hover:bg-zinc-900 transition-all duration-300"
    >
      <img
        src={exercise.gifUrl ? exercise.gifUrl : exerciseAltImage}
        className="rounded-t max-h-40"
      />
      <div
      // className={`border-t-3 border-${
      //   bodyPartColorMapper[
      //     exercise?.bodyPart
      //       .toLocaleLowerCase()
      //       .replace(/\s/g, "") as keyof IbodyPartColorMapperTypes
      //   ]
      // }`}
      ></div>
      <div className="flex flex-row pl-2 items-center mt-3">
        <p
          className={`bg-${
            bodyPartColorMapper[
              exercise?.bodyPart
                .toLocaleLowerCase()
                .replace(/\s/g, "") as keyof IbodyPartColorMapperTypes
            ]
          } rounded-full px-3 py-1 mx-1 my-1 text-capital text-center text-xs`}
        >
          {exercise.bodyPart}
        </p>
        <p className="bg-green-400 rounded-full px-3 py-1 mx-1 my-1 text-capital text-center text-xs">
          {exercise.target}
        </p>
        <div
          ref={wrapperRef}
          onClick={(e) => openMenu(e, setIsOpen, isOpen)}
          className="relative ml-auto mr-2 py-1.5 px-1.5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded"
        >
          <BsThreeDotsVertical />
          <CardMenu
            isOpen={isOpen}
            exerciseId={String(exercise?.id)}
            setModalIsOpen={setModalIsOpen}
            setEId={setEId}
            makeAddFavoriteCall={makeAddFavoriteCall}
            makeRemoveFavoriteCall={makeRemoveFavoriteCall}
            isFav={IsFav}
          />
        </div>
      </div>
      <p className="p-2 pl-4 text-left text-capital font-bold text-sm">
        {exercise.name}
      </p>
      <p className="text-left text-capital px-2 pb-2 pl-4 text-gray-500 text-xs">
        {exercise?.equipment}
      </p>
      <div className="flex text-left p-2 pl-4 text-xs items-center mt-auto">
        <BsStarFill className="text-xs mr-1" color="#eac54f" />
        <p className="text-xs">{favCount}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;
