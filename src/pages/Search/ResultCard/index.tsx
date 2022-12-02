import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../utils/utils";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";
import { TypeOf } from "yup";

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
      <div className="flex">
        <div
          key={index}
          onClick={() => navigate(`/exercise/${exercise?.id}`)}
          className="w-11/12 bg-light-black rounded shadow-xl mb-10 flex flex-col hover:cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {exLoading ? (
            <Skeleton className="max-h-40 rounded" />
          ) : (
            <>
              <img
                src={exercise?.gifUrl}
                className="max-h-40 rounded-t"
                alt=""
              />
              <div
                className={`border-t-2 border-${
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
            <p className="ml-auto mr-4">
              {loading ? (
                <Skeleton circle width={22} height={22} className="mb-3" />
              ) : favorited ? (
                <BsFillStarFill className="text-lg" color="#eac54f" />
              ) : (
                <BsStar className="text-lg" color="rgb(94 94 94)" />
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
              <p className="text-capital text-left font-bold text-sm p-2 pl-4">
                {exercise?.name}
              </p>
              <p className="text-left text-capital p-2 pl-4 mt-auto text-gray-500 text-xs">
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
