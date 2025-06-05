import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from "./user";

const reducer = combineReducers({
    user,
});

const userStore = configureStore({
    reducer,
});

export default userStore;