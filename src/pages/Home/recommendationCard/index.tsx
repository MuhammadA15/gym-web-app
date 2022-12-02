import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../utils/utils";

const RecommendationCard = ({ exercise }: { exercise: exerciseTypes }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/exercise/${exercise?.id}`)}
      className="col-span-1 mx-auto w-11/12 bg-light-black rounded shadow-xl flex flex-col hover:cursor-pointer hover:bg-zinc-900 transition-all duration-300"
    >
      <img src={exercise.gifUrl} className="rounded-t max-h-40" />
      <div
        className={`border-t-2 border-${
          bodyPartColorMapper[
            exercise?.bodyPart
              .toLocaleLowerCase()
              .replace(/\s/g, "") as keyof IbodyPartColorMapperTypes
          ]
        }`}
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
      </div>
      <p className="p-2 pl-4 text-left text-capital font-bold text-sm">
        {exercise.name}
      </p>
      <p className="text-left text-capital p-2 pl-4 mt-auto text-gray-500 text-xs">
        {exercise?.equipment}
      </p>
    </div>
  );
};

export default RecommendationCard;
