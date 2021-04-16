import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default (initialState) =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));
