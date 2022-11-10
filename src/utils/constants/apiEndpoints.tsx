/**
 * API Base Url
 */

export const BASE_URL = 'http://localhost:8080';

/**
 * Endpoints
 */

export const SIGNUP_ENDPOINT = BASE_URL + '/auth/users';
export const LOGIN_ENDPOINT = BASE_URL + '/auth/login';
export const FETCH_ALL_EXERCISES_ENDPOINT = BASE_URL + '/exercises';
export const FETCH_EXERCISE_BY_ID_ENDPOINT = BASE_URL + '/exercises/id';
export const ADD_EXERCISE_FAVORITES_ENDPOINT = BASE_URL + '/exercises/id/add-favorite';
export const GET_FAVORITES_ENDPOINT = BASE_URL + '/exercises/getFavorites';
export const GET_FAVORITES_COUNT_ENDPOINT = BASE_URL + '/exercises/getFavoritesCount';
export const REMOVE_EXERCISE_FAVORITES_ENDPOINT = BASE_URL + '/exercises/id/remove-favorite';
