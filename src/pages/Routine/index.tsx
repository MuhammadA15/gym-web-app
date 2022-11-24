import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRoutineType } from "../../types/routineType";
import { FETCH_ROUTINES_BY_ID_ENDPOINT } from "../../utils/constants/apiEndpoints";

const RoutinePage = () => {
  const { routineId } = useParams();
  const userid = localStorage.getItem("id");

  const [routineData, setRoutineData] = useState<IRoutineType | null>();

  const fetchRoutines = async (id: string) => {
    await fetch(FETCH_ROUTINES_BY_ID_ENDPOINT.replace("id", id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then((data) => {
        if (data.status === 200) {
          setRoutineData(data.body);
        } else {
          // console.log()
        }
      });
  };

  useEffect(() => {
    if (userid && routineId) {
      fetchRoutines(routineId);
    }
  }, [userid, routineId]);

  return (
    <div>
      <p className="text-lg font-bold mt-4 mb-4">{routineData?.routineName}</p>
    </div>
  );
};

export default RoutinePage;
