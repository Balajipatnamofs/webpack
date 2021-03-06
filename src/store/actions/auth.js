import * as actionTypes from "../../components/constants/actionTypes";

export const loginSuccess = (isAuth) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    isAuth: isAuth
  };
};
export const loginError = (error) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    error: error
  };
};
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch(loginSuccess(false));
    return {
      type: actionTypes.LOGOUT
    };
  };
};
export const loginUser = () => {
  return (dispatch) => {
    localStorage.setItem("auth", true);
    dispatch(loginSuccess(true));
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("auth");
    if (token) {
      dispatch(loginSuccess(true));
    } else {
      dispatch(logout());
    }
  };
};
