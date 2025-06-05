import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const reducers = combineReducers({

});

const userStore = configureStore({
    reducers,
});

export default userStore;