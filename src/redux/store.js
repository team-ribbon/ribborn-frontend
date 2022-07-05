import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// import user from "./modules/user";
import post from "../modules/post";
import UserPage from "../modules/UserPage";

const rootReducer = combineReducers({
  // user,
  post,
  UserPage,
});

const middlewares = [thunk, logger];

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
