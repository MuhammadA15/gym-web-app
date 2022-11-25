import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoutine } from "../../services/routineService";
import { IRoutineType } from "../../types/routineType";

const RoutinePage = () => {
  const { routineId } = useParams();
  const userid = localStorage.getItem("id");

  const [routineData, setRoutineData] = useState<IRoutineType | null>();

  const makeFetchRoutineCall = async (routineid: string) => {
    fetchRoutine(routineid).then((data) => {
      if (data.status === 200) {
        setRoutineData(data.body);
      } else {
        // console.log()
      }
    });
  };

  useEffect(() => {
    if (userid && routineId) {
      makeFetchRoutineCall(routineId);
    }
  }, [userid, routineId]);

  return (
    <div>
      <p className="text-lg font-bold mt-4 mb-4">{routineData?.routineName}</p>
    </div>
  );
};

export default RoutinePage;
