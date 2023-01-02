import React, { useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../../types/exerciseType";
import EntryMenu from "./EntryMenu";
import { BsFillStarFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../../utils/utils";
import { useOutsideClickAlerter } from "../../../../hooks/OutsideClickAlerter";

const FavoritesEntryCard = ({
  index,
  exercise,
  favCount,
  loading,
  setEId,
  removeFavorite,
  setModalIsOpen,
  openMenu,
}: {
  index: number;
  exercise: exerciseTypes | null;
  favCount: Map<number, number> | null;
  loading: boolean;
  removeFavorite: (userid: string, exerciseId: string) => void;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEId: React.Dispatch<React.SetStateAction<string>>;
  openMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setCardMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>,
    cardMenuOpenState: boolean
  ) => void;
}) => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClickAlerter(wrapperRef, setIsOpen);

  return (
    <SkeletonTheme baseColor="#4d4f5038" highlightColor="none">
      <div
        key={index}
        className="bg-neutral-900 rounded mb-6 flex flex-row shadow-2xl"
      >
        {loading ? (
          <Skeleton
            width={192}
            className="max-h-40 rounded-l border-r-1 h-full"
          />
        ) : (
          <img
            src={exercise?.gifUrl}
            className="h-fit max-h-44 rounded-l border-r-1"
          />
        )}
        <div className="flex flex-col mx-4 pt-2.5 pb-2.5 px-4 w-full">
          <div className="flex flex-row items-center">
            {loading ? (
              <>
                <p className="w-1/3 mr-3">
                  <Skeleton className="py-1.5 my-1 mb-2" width={""} />
                </p>
                <Skeleton className="rounded-full px-5 py-1.5 ml-3 mr-1 my-1 mb-2" />
                <p className="mx-2"></p>
                <Skeleton className="rounded-full px-5 py-1.5 ml-3 mr-1 my-1 mb-2" />
              </>
            ) : (
              <>
                <p
                  className="font-bold text-sm text-capital text-left hover:cursor-pointer hover:underline"
                  onClick={() => navigate(`/exercise/${exercise?.id}`)}
                >
                  {exercise?.name}
                </p>
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
                  } rounded-full px-3 py-0.5 ml-3 mr-1 my-1 text-capital text-xs`}
                >
                  {exercise?.bodyPart}
                </p>
                <p className="bg-green-400 rounded-full px-3 py-0.5 mx-1 my-1 text-capital text-xs">
                  {exercise?.target}
                </p>
              </>
            )}
            {!exercise || loading ? (
              <div className="ml-auto -mr-5 py-1.5 px-1.5 mb-2">
                <Skeleton className="" height={22} width={22} />
              </div>
            ) : (
              <div
                className="ml-auto -mr-5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded py-1.5 px-1.5"
                onClick={(e) => openMenu(e, setIsOpen, isOpen)}
                ref={wrapperRef}
              >
                <BsThreeDotsVertical />
                <EntryMenu
                  isOpen={isOpen}
                  removeFavorite={removeFavorite}
                  exerciseId={String(exercise?.id)}
                  setModalIsOpen={setModalIsOpen}
                  setEId={setEId}
                />
              </div>
            )}
          </div>
          {loading ? (
            <>
              <p className="text-left mb-2">
                <Skeleton width={"25%"} />
              </p>
              <p>
                <Skeleton className="text-left mb-2" count={3} />
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-capital text-left mb-2.5 text-xs">
                {exercise?.equipment}
              </p>
              <p className="text-left text-sm mb-2.5 text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione totam consectetur quam veritatis voluptatem dolorem vero
                magni consequatur eius, laudantium quod suscipit perferendis.
                Dolore, voluptas facere eaque placeat at praesentium.
              </p>
            </>
          )}
          <div className="my-auto flex flex-row items-center">
            {!exercise || loading ? (
              <Skeleton circle width={20} height={20} />
            ) : (
              <>
                <BsFillStarFill className="text-sm" color="#eac54f" />
                <p className="mx-2 text-sm">
                  {!exercise ? "" : favCount?.get(exercise?.id)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default FavoritesEntryCard;
