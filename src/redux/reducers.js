import { SET_LANGUAGE } from "./actions";

export const languageReducer = (state = { code: "en" }, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, code: action.payload };
    default:
      return state;
  }
};
