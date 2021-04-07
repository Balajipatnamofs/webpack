import * as actionTypes from "../../components/constants/actionTypes";
import { updateObject } from "../utility";

const initState = {
  isAuth: false
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    isAuth: action.isAuth
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};
const logout = (state, action) => {
  return updateObject(state, {
    isAuth: action.isAuth
  });
};
const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.LOGIN_ERROR:
      return authFail(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default auth;
