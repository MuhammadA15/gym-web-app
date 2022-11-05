import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseTypes } from "..";
import './styles.scss'

const ResultCard = ({exercise, index}: {exercise: exerciseTypes, index: number}) => {
  
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div key={index} onClick={() => navigate(`/exercise/${exercise?.id}`)} className="w-11/12 bg-light-black rounded shadow-xl mb-10 flex flex-col hover:cursor-pointer">
        <img src={exercise?.gifUrl} className="h-56 w-full rounded" alt=''/>
        <div className="flex flex-row pl-2 items-center mt-4">
          <p className="bg-orange-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">{exercise?.bodyPart}</p>
          <p className="bg-green-400 rounded-full px-3 py-1 mx-1 my-1 text-capital">{exercise?.target}</p>
        </div>
        <p className="text-capital text-left font-bold text-lg p-2 pl-4">{exercise?.name}</p>
        <p className="text-left text-capital p-2 pl-4 mt-auto">{exercise?.equipment}</p>
      </div>
    </div>    
  );
};

export default ResultCard;
