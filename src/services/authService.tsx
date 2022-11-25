import {
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../utils/constants/apiEndpoints";

/**
 * Login api call
 * @param data
 * @returns
 */
export const loginRequest = async (data: {
  username: string;
  password: string;
}) => {
  return await fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((data) => ({ status: res?.status, body: data }))
  );
};

/**
 * Sign up account api call
 * @param data
 * @returns
 */
export const signUpRequest = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return await fetch(SIGNUP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((data) => ({ status: res.status, body: data }))
  );
};
