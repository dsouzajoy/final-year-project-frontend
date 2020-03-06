import { createStore, compose, combineReducers } from "redux";

import {
    languageReducer
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
      language: languageReducer
  }),
  composeEnhancers()
);

export default store;
