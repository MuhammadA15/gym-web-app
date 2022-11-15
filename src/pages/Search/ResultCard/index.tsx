import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";

const ResultCard = ({
  exercise,
  index,
  favorited,
  loading,
  exLoading,
}: {
  exercise: exerciseTypes | null;
  index: number;
  favorited: boolean;
  loading: boolean;
  exLoading: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <SkeletonTheme baseColor="#4d4f5038" highlightColor="none">
      <div className="flex justify-center">
        <div
          key={index}
          onClick={() => navigate(`/exercise/${exercise?.id}`)}
          className="w-11/12 bg-light-black rounded shadow-xl mb-10 flex flex-col hover:cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {exLoading ? (
            <Skeleton className="h-56 w-full rounded" />
          ) : (
            <img
              src={exercise?.gifUrl}
              className="h-56 w-full rounded"
              alt=""
            />
          )}
          <div className="flex flex-row pl-2 items-center mt-4">
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
                <p className="bg-orange-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">
                  {exercise?.bodyPart}
                </p>
                <p className="bg-green-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">
                  {exercise?.target || <Skeleton count={1} />}
                </p>
              </>
            )}
            <p className="ml-auto mr-4">
              {loading ? (
                <Skeleton circle width={25} height={25} className="mb-3" />
              ) : favorited ? (
                <BsFillStarFill className="text-xl" color="#eac54f" />
              ) : (
                <BsStar className="text-xl" color="rgb(94 94 94)" />
              )}
            </p>
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
              <p className="text-capital text-left font-bold text-lg p-2 pl-4">
                {exercise?.name}
              </p>
              <p className="text-left text-capital p-2 pl-4 mt-auto">
                {exercise?.equipment}
              </p>
            </>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ResultCard;
