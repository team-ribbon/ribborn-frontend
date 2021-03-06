import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";

import user from "./modules/user";
import post from "./modules/post";
import userPage from "./modules/userPage";
import image from "./modules/image";
import chat from "./modules/chat";

const rootReducer = combineReducers({
  user,
  post,
  userPage,
  image,
  chat,
});

const middlewares = [thunk];

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
