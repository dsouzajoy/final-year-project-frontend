import { SET_LANGUAGE, SET_LOADER, SET_COMMISSIONER_AUTH } from "./actions";

export const commonReducer = (state = { languageCode: "en", isLoggedIn: true }, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, languageCode: action.payload };
    case SET_LOADER:
      return { ...state, showLoader: action.payload };
    case SET_COMMISSIONER_AUTH:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};
