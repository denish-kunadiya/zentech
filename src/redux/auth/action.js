import { LOGIN_SUCCESSFULL, LOGOUT_SUCCESSFUL } from "./type";

export const setLoginUser = (payload) => {
  // console.log("payload ser", payload);
  return {
    type: LOGIN_SUCCESSFULL,
    payload,
  };
};

export const logout = (payload) => {
  return {
    type: LOGOUT_SUCCESSFUL,
    payload,
  };
};
