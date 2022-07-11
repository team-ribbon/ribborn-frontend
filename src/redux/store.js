import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import user from "./modules/user";
import post from "../modules/post";
import image from "./modules/image";

const rootReducer = combineReducers({
  user,
  post,
  image,
});

const middlewares = [thunk, logger];

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
