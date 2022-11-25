import {
  ADD_EXERCISE_TO_ROUTINE_ENDPOINT,
  CREATE_ROUTINE_ENDPOINT,
  FETCH_ROUTINES_BY_ID_ENDPOINT,
  FETCH_ROUTINES_ENDPOINT,
  FETCH_ROUTINE_EXERCISE_BY_EXERCISE_ID,
  REMOVE_ROUTINE_EXERCISE_BY_EXERCISE_ID,
} from "../utils/constants/apiEndpoints";

/**
 * Create routine api call
 * @param data
 * @returns
 */
export const createRoutine = async (data: any) => {
  return await fetch(CREATE_ROUTINE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * Fetch routine by routine id api call
 * @param routineid
 * @returns
 */
export const fetchRoutine = async (routineid: string) => {
  return await fetch(FETCH_ROUTINES_BY_ID_ENDPOINT.replace("id", routineid), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * fetch all routines for user api call
 * @param userid
 * @returns
 */
export const fetchUserRoutines = async (userid: string) => {
  return await fetch(FETCH_ROUTINES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userid,
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * Fetch routine exercise by routine id and exercise id
 * @param routineid
 * @param eId
 * @returns
 */
export const fetchRoutineExercise = async (routineid: string, eId: string) => {
  return await fetch(
    FETCH_ROUTINE_EXERCISE_BY_EXERCISE_ID.replace("id", routineid).replace(
      "eid",
      eId
    ),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * Save exercise to routine api call
 * @param routineid 
 * @param eId 
 * @returns 
 */
export const saveExerciseToRoutine = async (routineid: number, eId: string) => {
  const data = {
    exerciseid: eId,
    routineid: routineid,
  };

  return await fetch(ADD_EXERCISE_TO_ROUTINE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * Remove exercise from routine api call
 * @param routineid 
 * @param eId 
 * @returns 
 */
export const removeExerciseFromRoutine = async (routineid: string, eId: string) => {
  return await fetch(
    REMOVE_ROUTINE_EXERCISE_BY_EXERCISE_ID.replace("id", routineid).replace(
      "eid",
      eId
    ),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) =>
      res.json().then((data) => ({ status: res.status, body: data }))
    )
}
