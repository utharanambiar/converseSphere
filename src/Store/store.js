import { combineReducers, legacy_createStore,applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { authReducer } from "./Auth/AuthReducer";

const rootReducers = combineReducers({
    auth: authReducer,
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));