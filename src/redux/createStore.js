import { createStore, compose, combineReducers } from "redux";

import {
    commonReducer
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
      common: commonReducer
  }),
  composeEnhancers()
);

export default store;
