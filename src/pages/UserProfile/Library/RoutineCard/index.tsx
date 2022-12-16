import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import LoadingIcon from "../../../../components/ui/LoadingIcon/loadingIcon";
import { useOutsideClickAlerter } from "../../../../hooks/OutsideClickAlerter";
import { getRoutineExercisesCount } from "../../../../services/routineService";
import { IRoutineType } from "../../../../types/routineType";
import CardMenu from "./CardMenu";

const RoutineCard = ({
  routineData,
  navigateToRoutine,
  openMenu
}: {
  routineData: IRoutineType;
  navigateToRoutine: (routineId: number) => void;
  openMenu: (setCardMenuOpenState: React.Dispatch<React.SetStateAction<boolean>>, cardMenuOpenState: boolean) => void;
}) => {

  const wrapperRef = useRef(null);

  const [exerciseCount, setExerciseCount] = useState<number | null>(null);
  const [routineDescription, setRoutineDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat omnisex error architecto, officiis odio totam corporis tempore maxime quasimolestiae nostrum, libero similique nihil quibusdam veritatis temporaullam commodi."
  );
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClickAlerter(wrapperRef, setIsOpen);

  const makeGetRoutineExercisesCountCall = async (id: string) => {
    getRoutineExercisesCount(id).then((data) => {
      if (data?.status === 200) {
        setExerciseCount(data.body);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    if (routineData?.id) {
      makeGetRoutineExercisesCountCall(String(routineData?.id));
    }
  }, [routineData]);

  return (
    <div
      // onClick={() => navigateToRoutine(routineData?.id)}
      className=" bg-neutral-900 transition-all duration-300 rounded-md px-4 pt-4 pb-4 m-2 mb-4 text-left shadow-2xl "
    >
      <div className="flex items-center">
        <p className="font-bold text-left mb-1.5 text-sm">
          {routineData?.routineName}
        </p>
        <div
          className="relative ml-auto -mr-2 hover:bg-gray-400 hover:bg-opacity-10 hover:cursor-pointer hover:rounded py-1.5 px-1.5"
          onClick={() => openMenu(setIsOpen, isOpen)}
          ref={wrapperRef}
        >
          <BsThreeDotsVertical />
          <CardMenu isOpen={isOpen} />
        </div>
      </div>
      <p className="text-sm mb-4 text-gray-400">
        {routineDescription.length > 100
          ? routineDescription.slice(0, 100) + "..."
          : routineDescription}
      </p>
      <div className="grid grid-cols-3 gap-3 my-auto items-center">
        <div className="text-center border-r-2 border-gray-500">
          {exerciseCount !== null ? (
            <p className="text-sm mb-0.5 font-bold">{exerciseCount}</p>
          ) : (
            <LoadingIcon className={"w-5 h-5"} />
          )}
          <p className="font-bold text-xs text-gray-400">Exercises</p>
        </div>
        <div className="text-center border-r-2 border-gray-500">
          <p className="text-sm mb-0.5 font-bold">
            {exerciseCount ? exerciseCount * 3 + ":00" : "0:00"}
          </p>
          <p className="font-bold text-xs text-gray-400">Est. Duration</p>
        </div>
        <div className="text-center">
          <p className="text-sm mb-0.5 font-bold">{"0"}</p>
          <p className="font-bold text-xs text-gray-400">Times Completed</p>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
