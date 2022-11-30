import {
  ADD_EXERCISE_FAVORITES_ENDPOINT,
  CREATE_EXERCISE_ENDPOINT,
  FETCH_ALL_EXERCISES_ENDPOINT,
  FETCH_EXERCISE_BY_ID_ENDPOINT,
  FETCH_EXERCISE_BY_USERID_ENDPOINT,
  GET_EXERCISE_RECOMMENDATIONS_ENDPOINT,
  GET_FAVORITES_COUNT_ENDPOINT,
  GET_FAVORITES_ENDPOINT,
  REMOVE_EXERCISE_FAVORITES_ENDPOINT,
} from "../utils/constants/apiEndpoints";

/**
 * Create exercise api call
 * @param data
 * @returns
 */
export const createExercise = async (data: any) => {
  return await fetch(CREATE_EXERCISE_ENDPOINT, {
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
 * Fetch all exercises api call
 * @returns
 */
export const fetchAllExercises = async () => {
  return await fetch(FETCH_ALL_EXERCISES_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Fetch exercise by id api call
 * @param exerciseId
 * @returns
 */
export const fetchExercise = async (exerciseId: string) => {
  return await fetch(FETCH_EXERCISE_BY_ID_ENDPOINT?.replace("id", exerciseId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Fetch exercises by author id
 * @param userid
 * @returns
 */
export const fetchExerciseByAuthor = async (userid: string) => {
  return await fetch(FETCH_EXERCISE_BY_USERID_ENDPOINT.replace("id", userid), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};

/**
 * Fetch all user favorites api call
 * @param userId
 * @returns
 */
export const fetchFavorites = async (userId: string) => {
  return await fetch(GET_FAVORITES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userId,
  }).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Fetch favorited count of exercise api call
 * @param exerciseId
 * @returns
 */
export const fetchFavCount = async (exerciseId: string) => {
  return await fetch(GET_FAVORITES_COUNT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseId),
  }).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Add exercise to favorites api call
 * @param userId
 * @param exerciseId
 * @returns
 */
export const addFavorite = async (userId: string, exerciseId: string) => {
  const data = { userId, exerciseId };

  return await fetch(
    ADD_EXERCISE_FAVORITES_ENDPOINT?.replace("id", exerciseId),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Remove exercise from favorites api call
 * @param userId
 * @param exerciseId
 * @returns
 */
export const removeFavorite = async (userId: string, exerciseId: string) => {
  const data = { userId, exerciseId };

  return await fetch(
    REMOVE_EXERCISE_FAVORITES_ENDPOINT?.replace("id", exerciseId),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Get Exercise Recommendations api call
 * @param userId 
 * @returns 
 */
export const getRecommendations = async (userId: string) => {
  return await fetch(
    GET_EXERCISE_RECOMMENDATIONS_ENDPOINT,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userId,
    }
  ).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};