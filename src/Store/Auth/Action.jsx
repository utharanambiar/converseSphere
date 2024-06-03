import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_FAILIURE,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILIURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILIURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  OTP_VERIFICATION_FAILIURE,
  OTP_VERIFICATION_SUCCESS,
  REGISTER_USER_FAILIURE,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAILIURE,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./ActionType";
import { api } from "../../config/api";
import { FIND_TWEETS_BY_ID_FAILIURE } from "../Tweet/ActionType";

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    if (data?.jwt) {
      localStorage.setItem("AuthToken", data?.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    console.log("user signed up:", data);
  } catch (error) {
    console.error(error);
    dispatch({ type: REGISTER_USER_FAILIURE, payload: error?.message });
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST, payload: true });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data?.jwt) {
      localStorage.setItem("AuthToken", data?.jwt);
    }
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { data: data, userDetails: loginData },
    });
    console.log("user logged in:", data);
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_USER_FAILIURE, payload: error?.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(data);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_USER_PROFILE_FAILIURE, payload: error?.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("AuthToken");
  dispatch({ type: LOGOUT, payload: null });
};

export const verifyOtp = (verifyOtpData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/verify?email=${verifyOtpData?.email}&otp=${verifyOtpData?.otp}`
    );
    dispatch({ type: OTP_VERIFICATION_SUCCESS, payload: true });
    console.log("user logged in:", data);
  } catch (error) {
    console.error(error);
    dispatch({ type: OTP_VERIFICATION_FAILIURE, payload: error?.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    console.log("User data:", data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: FIND_TWEETS_BY_ID_FAILIURE, payload: e?.message });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log("Updated user data:", data);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: UPDATE_USER_PROFILE_FAILIURE, payload: e?.message });
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("Followed user", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: FOLLOW_USER_FAILIURE, payload: e?.message });
  }
};
