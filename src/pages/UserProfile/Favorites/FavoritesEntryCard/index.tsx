import React, { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../../types/exerciseType";
import EntryMenu from "../EntryMenu";
import { BsFillStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { useMultiMenuOutsideClickAlerter } from "../hooks/MultiMenuOutsideClickAlerter";

const FavoritesEntryCard = ({
  index,
  exercise,
  isOpenList,
  favCount,
  loading,
  setEId,
  openDetailsMenu,
  setIsOpenList,
  removeFavorite,
  setModalIsOpen,
}: {
  index: number;
  exercise: exerciseTypes | null;
  isOpenList: Map<number, boolean>;
  favCount: Map<number, number> | null;
  loading: boolean;
  openDetailsMenu: (exerciseId: number) => void;
  removeFavorite: (userid: string, exerciseId: string) => void;
  setIsOpenList: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  
  useMultiMenuOutsideClickAlerter(
    wrapperRef,
    isOpenList,
    Number(exercise?.id),
    setIsOpenList
  );

  return (
    <SkeletonTheme baseColor="#4d4f5038" highlightColor="none">
      <div
        key={index}
        className="border-1 rounded mb-6 flex flex-row shadow-xl"
      >
        {loading ? (
          <Skeleton width={192} className="rounded-l border-r-1 h-full" />
        ) : (
          <img
            src={exercise?.gifUrl}
            className="h-fit max-h-48 rounded-l border-r-1"
          />
        )}
        <div className="flex flex-col mx-4 pt-4 px-4 w-full">
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
                  className="font-bold text-capital text-left hover:cursor-pointer hover:underline"
                  onClick={() => navigate(`/exercise/${exercise?.id}`)}
                >
                  {exercise?.name}
                </p>
                <p className="bg-orange-400 rounded-full px-3 py-0.5 ml-3 mr-1 my-1 text-capital text-sm">
                  {exercise?.bodyPart}
                </p>
                <p className="bg-green-400 rounded-full px-3 py-0.5 mx-1 my-1 text-capital text-sm">
                  {exercise?.target}
                </p>
              </>
            )}
            {!exercise || loading ? (
              <div className="ml-auto -mr-5 py-1.5 px-1.5 mb-2">
                <Skeleton className="" height={25} width={25} />
              </div>
            ) : (
              <div
                className="ml-auto -mr-5 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded py-1.5 px-1.5"
                onClick={() => openDetailsMenu(exercise?.id)}
                ref={isOpenList?.get(exercise?.id) ? wrapperRef : null}
              >
                <BsThreeDotsVertical />
                <EntryMenu
                  isOpen={isOpenList?.get(exercise?.id)}
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
              <p className="text-gray-500 text-capital text-left mb-2">
                {exercise?.equipment}
              </p>
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione totam consectetur quam veritatis voluptatem dolorem vero
                magni consequatur eius, laudantium quod suscipit perferendis.
                Dolore, voluptas facere eaque placeat at praesentium.
              </p>
            </>
          )}
          <div className="mt-auto mb-2 flex flex-row items-center">
            {!exercise || loading ? (
              <Skeleton circle width={20} height={20} />
            ) : (
              <>
                <BsFillStarFill className="text-sm" color="#eac54f" />
                <p className="mx-2">
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
