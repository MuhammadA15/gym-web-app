import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "../../../types/exerciseType";

const RecommendationCard = ({ exercise }: { exercise: exerciseTypes }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/exercise/${exercise?.id}`)}
      className="col-span-1 mx-auto w-11/12 bg-light-black rounded shadow-xl flex flex-col hover:cursor-pointer"
    >
      <img src={exercise.gifUrl} className="rounded-t max-h-44" />
      <div className="flex flex-row pl-2 items-center mt-3">
        <p className="bg-orange-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">
          {exercise.bodyPart}
        </p>
        <p className="bg-green-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">
          {exercise.target}
        </p>
      </div>
      <p className="p-2 pl-4 text-left text-capital font-bold text-lg">
        {exercise.name}
      </p>
      <p className="text-left text-capital p-2 pl-4 mt-auto text-gray-500">
        {exercise?.equipment}
      </p>
    </div>
  );
};

export default RecommendationCard;
