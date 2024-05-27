const { combineReducers, legacy_createStore, applyMiddleware } = require("redux");
import { authReducer } from "./Auth/AuthReducer";

const rootReducers = combineReducers({
    auth: authReducer,
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));