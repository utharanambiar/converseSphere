import {
  GET_USER_PROFILE_FAILIURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILIURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILIURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  OTP_VERIFICATION_FAILIURE,
  OTP_VERIFICATION_SUCCESS,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: sessionStorage.getItem("AuthToken") || null,
  verified: false,
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
        user: action?.payload?.userDetails,
        loading: false,
        error: null,
        jwt: action?.payload?.data?.jwt,
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

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action?.payload,
        updateUser: true,
      };
    case FIND_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action?.payload,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action?.payload,
      };

    case OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        verified: true,
      };

    case LOGOUT:
      return initialState;

    case REGISTER_USER_FAILIURE:
    case LOGIN_USER_FAILIURE:
    case GET_USER_PROFILE_FAILIURE:
    case OTP_VERIFICATION_FAILIURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
        verified: false,
      };

    default:
      return { ...state };
  }
};
