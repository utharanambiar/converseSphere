import axios from "axios";
import { api } from "../../config/api";
import { GET_ALL_TWEETS_FAILIURE, GET_ALL_TWEETS_SUCCESS } from "./ActionType";

const getAllTweets = async (dispatch) => {
  try {
    const { data } = await api.get("/api/tweet");
    console.log("get all tweets:", data);
    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: GET_ALL_TWEETS_FAILIURE, payload: e?.message });
  }
};
