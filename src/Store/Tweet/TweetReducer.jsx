import {
  FIND_TWEETS_BY_ID_REQUEST,
  LIKE_TWEETS_REQUEST,
  RETWEET_REQUEST,
  TWEETS_LIKED_BY_USER_BY_ID_REQUEST,
  TWEET_CREATE_REQUEST,
  TWEET_DELETE_REQUEST,
  FIND_TWEETS_BY_ID_FAILIURE,
  LIKE_TWEETS_FAILIURE,
  RETWEET_FAILIURE,
  TWEETS_LIKED_BY_USER_BY_ID_FAILIURE,
  TWEET_CREATE_FAILIURE,
  TWEET_DELETE_FAILIURE,
  TWEET_CREATE_SUCCESS,
  GET_ALL_TWEETS_SUCCESS,
  GET_USER_TWEETS_SUCCESS,
  TWEETS_LIKED_BY_USER_BY_ID_SUCCESS,
  GET_TWEET_LIKED_BY_USER_SUCCESS,
  TWEET_DELETE_SUCCESS,
  RETWEET_SUCCESS,
  FIND_TWEETS_BY_ID_SUCCESS,
  REPLY_TO_TWEET_SUCCESS,
  LIKE_TWEETS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  data: null,
  tweets: [],
  tweet: null,
};
export const TweetReducer = (state = initialState, action) => {
  switch (action?.type) {
    case TWEET_CREATE_REQUEST:
    case TWEET_DELETE_REQUEST:
    case TWEETS_LIKED_BY_USER_BY_ID_REQUEST:
    case LIKE_TWEETS_REQUEST:
    case RETWEET_REQUEST:
    case FIND_TWEETS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case TWEET_CREATE_FAILIURE:
    case TWEET_DELETE_FAILIURE:
    case TWEETS_LIKED_BY_USER_BY_ID_FAILIURE:
    case LIKE_TWEETS_FAILIURE:
    case RETWEET_FAILIURE:
    case FIND_TWEETS_BY_ID_FAILIURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };

    case TWEET_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tweets: [action?.payload, ...state.tweets],
      };

    case GET_ALL_TWEETS_SUCCESS:
    case GET_USER_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tweets: action?.payload,
      };

    case LIKE_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action?.payload,
      };

    case GET_TWEET_LIKED_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedTweet: action?.payload,
      };

    case TWEET_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tweets: state.tweets.filter((tweet) => tweet.id !== action?.payload),
      };

    case RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        retweet: action?.payload,
      };

    case FIND_TWEETS_BY_ID_SUCCESS:
    case REPLY_TO_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tweet: action?.payload,
      };

    default:
      return state;
  }
};
