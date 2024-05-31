import {
  GET_USER_PROFILE_FAILIURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILIURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILIURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action?.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: action?.payload, error: null };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action?.payload?.jwt,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action?.payload?.jwt,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action?.payload,
      };

    case REGISTER_USER_FAILIURE:
    case LOGIN_USER_FAILIURE:
    case GET_USER_PROFILE_FAILIURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };

    default:
      return state;
  }
};
