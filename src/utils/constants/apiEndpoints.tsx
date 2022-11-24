/**
 * API Base Url
 */

export const BASE_URL = 'http://localhost:8080';

/**
 * Endpoints
 */

export const SIGNUP_ENDPOINT = BASE_URL + '/auth/users';
export const LOGIN_ENDPOINT = BASE_URL + '/auth/login';
export const FETCH_ALL_EXERCISES_ENDPOINT = BASE_URL + '/exercises/published';
export const FETCH_EXERCISE_BY_ID_ENDPOINT = BASE_URL + '/exercises/id';
export const FETCH_EXERCISE_BY_USERID_ENDPOINT = BASE_URL + '/exercises/user/id';
export const ADD_EXERCISE_FAVORITES_ENDPOINT = BASE_URL + '/exercises/id/add-favorite';
export const GET_FAVORITES_ENDPOINT = BASE_URL + '/exercises/getFavorites';
export const GET_FAVORITES_COUNT_ENDPOINT = BASE_URL + '/exercises/getFavoritesCount';
export const REMOVE_EXERCISE_FAVORITES_ENDPOINT = BASE_URL + '/exercises/id/remove-favorite';
export const CREATE_EXERCISE_ENDPOINT = BASE_URL + '/exercises/create';
export const CREATE_ROUTINE_ENDPOINT = BASE_URL + '/routines/create';
export const FETCH_ROUTINES_ENDPOINT = BASE_URL + '/routines';
export const FETCH_ROUTINES_BY_ID_ENDPOINT = BASE_URL + '/routines/id';
export const ADD_EXERCISE_TO_ROUTINE_ENDPOINT = BASE_URL + '/routines/add';
export const FETCH_ROUTINE_EXERCISE_BY_EXERCISE_ID = BASE_URL + '/routines/id/exercises/eid';
export const REMOVE_ROUTINE_EXERCISE_BY_EXERCISE_ID = BASE_URL + '/routines/id/exercises/eid';
