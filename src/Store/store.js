import { combineReducers, legacy_createStore,applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { authReducer } from "./Auth/AuthReducer";
import { TweetReducer } from "./Tweet/TweetReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    tweet: TweetReducer
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));