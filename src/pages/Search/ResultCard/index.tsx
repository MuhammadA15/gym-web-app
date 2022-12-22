import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import { BsFillStarFill, BsStar, BsThreeDotsVertical } from "react-icons/bs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../utils/utils";
// @ts-ignore
import exerciseAltImage from "../../../assets/exercise-alt-img.jpg";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";
import ResultCardMenu from "./ResultCardMenu";
import { useOutsideClickAlerter } from "../../../hooks/OutsideClickAlerter";

const ResultCard = ({
  exercise,
  index,
  favorited,
  loading,
  exLoading,
  openMenu,
  setModalIsOpen,
  setEId,
}: {
  exercise: exerciseTypes | null;
  index: number;
  favorited: boolean;
  loading: boolean;
  exLoading: boolean;
  openMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setCardMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>,
    cardMenuOpenState: boolean
  ) => void;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClickAlerter(wrapperRef, setIsOpen);

  return (
    <SkeletonTheme baseColor="#4d4f5038" highlightColor="none">
      <div className="flex">
        <div
          key={index}
          onClick={() => navigate(`/exercise/${exercise?.id}`)}
          className="w-11/12 bg-light-black rounded shadow-xl mb-10 flex flex-col hover:cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-zinc-900 transition-all duration-300"
        >
          {exLoading ? (
            <Skeleton className="max-h-40 rounded" />
          ) : (
            <>
              <img
                src={exercise?.gifUrl ? exercise?.gifUrl : exerciseAltImage}
                className="max-h-40 rounded-t"
                alt=""
              />
              <div
                className={`border-t-3 border-${
                  bodyPartColorMapper[
                    exercise?.bodyPart
                      .toLocaleLowerCase()
                      .replace(/\s/g, "") as keyof IbodyPartColorMapperTypes
                  ]
                }`}
              ></div>
            </>
          )}
          <div className="flex flex-row pl-2 items-center mt-3">
            {exLoading ? (
              <>
                <Skeleton
                  count={1}
                  className="rounded-full px-6 py-1 mx-1 my-1 mb-3"
                />
                <p className="mx-2"></p>
                <Skeleton
                  count={1}
                  className="rounded-full px-6 py-1 mx-1 my-1 mb-3"
                />
              </>
            ) : (
              <>
                <p
                  className={`bg-${
                    exercise?.bodyPart
                      ? bodyPartColorMapper[
                          exercise?.bodyPart
                            .toLocaleLowerCase()
                            .replace(
                              /\s/g,
                              ""
                            ) as keyof IbodyPartColorMapperTypes
                        ]
                      : ""
                  } rounded-full px-3 py-1 mx-1 my-1 text-capital text-xs`}
                >
                  {exercise?.bodyPart}
                </p>
                <p className="bg-green-400 rounded-full px-3 py-1 mx-1 my-1 text-capital text-xs">
                  {exercise?.target || <Skeleton count={1} />}
                </p>
              </>
            )}
            {loading ? (
              <div className="relative ml-auto mr-2 py-1.5 px-1.5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded">
                <Skeleton circle width={22} height={22} className="mb-3" />
              </div>
            ) : (
              <div
                ref={wrapperRef}
                onClick={(e) => openMenu(e, setIsOpen, isOpen)}
                className="relative ml-auto mr-2 py-1.5 px-1.5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded"
              >
                <BsThreeDotsVertical />
                <ResultCardMenu
                  isOpen={isOpen}
                  exerciseId={String(exercise?.id)}
                  setModalIsOpen={setModalIsOpen}
                  setEId={setEId}
                />
              </div>
            )}
          </div>
          {exLoading ? (
            <>
              <p className="text-left text-lg pl-2 mx-1 mb-3">
                <Skeleton count={1} width={"90%"} className="py-0.5" />
              </p>
              <p className="text-left text-lg pl-2 mx-1 mb-3">
                <Skeleton count={1} width={"50%"} className="py-0.5" />
              </p>
            </>
          ) : (
            <>
              <p className="text-capital text-left font-bold text-sm px-2 pt-2 pl-4">
                {exercise?.name}
              </p>
              <p className="text-left text-capital px-2 pt-1 pl-4 text-gray-500 text-xs">
                {exercise?.equipment}
              </p>
            </>
          )}
          <p className="ml-4 py-4 mt-auto text-left">
            {loading ? (
              <Skeleton circle width={20} height={20} className="text-left" />
            ) : favorited ? (
              <BsFillStarFill className="text-sm" color="#eac54f" />
            ) : (
              <BsStar className="text-sm" color="rgb(94 94 94)" />
            )}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ResultCard;
