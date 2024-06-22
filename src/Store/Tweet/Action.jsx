import { api } from "../../config/api";
import {
  FIND_TWEETS_BY_ID_FAILIURE,
  FIND_TWEETS_BY_ID_SUCCESS,
  GET_ALL_REPLIES_BY_USER_FAILIURE,
  GET_ALL_REPLIES_BY_USER_SUCCESS,
  GET_ALL_TWEETS_FAILIURE,
  GET_ALL_TWEETS_SUCCESS,
  GET_TWEET_LIKED_BY_USER_FAILIURE,
  GET_TWEET_LIKED_BY_USER_SUCCESS,
  GET_USER_TWEETS_FAILIURE,
  GET_USER_TWEETS_SUCCESS,
  LIKE_TWEETS_FAILIURE,
  LIKE_TWEETS_SUCCESS,
  REPLY_TO_TWEET_FAILIURE,
  REPLY_TO_TWEET_SUCCESS,
  RETWEET_FAILIURE,
  RETWEET_SUCCESS,
  SEARCH_FAILIURE,
  SEARCH_SUCCESS,
  TWEET_CREATE_FAILIURE,
  TWEET_CREATE_SUCCESS,
  TWEET_DELETE_FAILIURE,
  TWEET_DELETE_SUCCESS,
} from "./ActionType";

export const getAllTweets = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/tweet/");
    console.log("get all tweets:", data);
    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: GET_ALL_TWEETS_FAILIURE, payload: e?.message });
  }
};

export const getUsersTweet = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweet/user/${userId}`);
    console.log("get all tweets by user:", data);
    dispatch({ type: GET_USER_TWEETS_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: GET_USER_TWEETS_FAILIURE, payload: e?.message });
  }
};

export const getTweetsLikedByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweet/user/${userId}/likes`);
    console.log("get all tweets liked by user:", data);
    dispatch({ type: GET_TWEET_LIKED_BY_USER_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: GET_TWEET_LIKED_BY_USER_FAILIURE, payload: e?.message });
  }
};

export const findTweetsById = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweet/${tweetId}`);
    console.log("get tweet by id:", data);
    dispatch({ type: FIND_TWEETS_BY_ID_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: FIND_TWEETS_BY_ID_FAILIURE, payload: e?.message });
  }
};

export const createTweet = (tweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/tweet/create`, tweetData);
    console.log("created tweet:", data);
    dispatch({ type: TWEET_CREATE_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: TWEET_CREATE_FAILIURE, payload: e?.message });
  }
};

export const createTweetReply = (replyTweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/tweet/reply`, replyTweetData);
    console.log("created tweet reply:", data);
    dispatch({
      type: REPLY_TO_TWEET_SUCCESS,
      payload: { replyTweet: data, replyFor: data?.id },
    });
  } catch (e) {
    console.error(e);
    dispatch({ type: REPLY_TO_TWEET_FAILIURE, payload: e?.message });
  }
};

export const createReTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/tweet/${tweetId}/retweet`);
    console.log("Retweet:", data);
    dispatch({ type: RETWEET_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: RETWEET_FAILIURE, payload: e?.message });
  }
};

export const likeTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${tweetId}/like`);
    console.log("Liked tweet:", data);
    dispatch({ type: LIKE_TWEETS_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: LIKE_TWEETS_FAILIURE, payload: e?.message });
  }
};

export const deleteTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/tweet/${tweetId}`);
    console.log("Deleted tweet:", data);
    dispatch({ type: TWEET_DELETE_SUCCESS, payload: tweetId });
  } catch (e) {
    console.error(e);
    dispatch({ type: TWEET_DELETE_FAILIURE, payload: e?.message });
  }
};

export const getRepliesByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/tweet/replies/user/${userId}`);
    console.log("get all replies by user:", data);
    dispatch({ type: GET_ALL_REPLIES_BY_USER_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({ type: GET_ALL_REPLIES_BY_USER_FAILIURE, payload: e?.message });
  }
};

export const searchQuery = (query) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/search?query=${query}`);
    console.log("search results", [data?.tweets, data?.users]);
    dispatch({ type: SEARCH_SUCCESS, payload: [data?.tweets, data?.users] });
  } catch (e) {
    console.error(e);
    dispatch({ type: SEARCH_FAILIURE, payload: e?.message });
  }
};
