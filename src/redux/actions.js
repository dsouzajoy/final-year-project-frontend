export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_LOADER = "SET_LOADER";
export const SET_COMMISSIONER_AUTH = "SET_COMMISSIONER_AUTH";

export const setLanguage = payload => {
    return {
        type: SET_LANGUAGE,
        payload
    }
}

export const setLoader = payload => {
    return {
        type: SET_LOADER,
        payload
    }
}

export const setCommissionerAuth = payload => {
    return {
        type: SET_COMMISSIONER_AUTH,
        payload
    }
}