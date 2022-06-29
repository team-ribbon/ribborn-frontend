import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import user from "./modules/user";

const rootReducer = combineReducers({
  user,
});

const middlewares = [thunk, logger];

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
