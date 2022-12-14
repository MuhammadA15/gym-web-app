import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeExerciseFromRoutine } from "../../../services/routineService";
import { exerciseTypes } from "../../../types/exerciseType";
import {
  bodyPartColorMapper,
  IbodyPartColorMapperTypes,
} from "../../../utils/utils";

const ExerciseEntry = ({
  exercise,
  color,
  routineId,
  makeRemoveExerciseFromRoutineCall,
}: {
  exercise: exerciseTypes;
  color: string;
  routineId: string;
  makeRemoveExerciseFromRoutineCall: (
    routineId: string,
    exerciseId: string
  ) => void;
}) => {
  const [showTags, setShowTags] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`mb-4 mt-4 text-left p-4 ${color} rounded-lg`}>
      <div className="grid grid-cols-12">
        <div className="col-span-2 text-capital text-md">
          <p
            className="text-sm hover:underline hover:cursor-pointer"
            onClick={() => navigate(`/exercise/${exercise?.id}`)}
          >
            {exercise?.name}
          </p>
          <p className="text-gray-500 text-sm">{exercise?.equipment}</p>
        </div>
        <div className="col-span-9">
          <p className="text-sm text-gray-400 pl-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
            perspiciatis sed doloremque nam. Doloribus minus eligendi quae
            aspernatur praesentium amet cum, rerum, ipsum earum obcaecati at,
            ducimus debitis illo dolor!
          </p>
        </div>
        <div className="pl-4">
          <p
            onClick={() => setShowTags(!showTags)}
            className="mb-1 text-xs text-blue-700 hover:text-blue-900 hover:underline hover:cursor-pointer"
          >
            {showTags ? "Hide tags" : "Show tags"}
          </p>
          <p className="mb-1 text-xs text-blue-700 hover:text-blue-900 hover:underline hover:cursor-pointer">
            View
          </p>
          <p
            className="text-xs text-blue-700 hover:text-blue-900 hover:underline hover:cursor-pointer"
            onClick={() =>
              makeRemoveExerciseFromRoutineCall(routineId, String(exercise?.id))
            }
          >
            Remove
          </p>
        </div>
      </div>
      {showTags && (
        <>
          <hr className="border-t-2 mt-4 mb-2 border-gray-500" />
          <div className="flex flex-row items-center">
            <p
              className={`bg-${
                bodyPartColorMapper[
                  exercise?.bodyPart
                    .toLocaleLowerCase()
                    .replace(/\s/g, "") as keyof IbodyPartColorMapperTypes
                ]
              } rounded-full px-3 py-1 mr-1 mt-1 text-capital text-center text-xs`}
            >
              {exercise.bodyPart}
            </p>
            <p className="bg-green-400 rounded-full px-3 py-1 mx-1 mt-1 text-capital text-center text-xs">
              {exercise.target}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseEntry;
