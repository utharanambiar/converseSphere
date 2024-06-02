import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
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
} from "./ActionType";

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
