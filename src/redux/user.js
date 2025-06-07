import { createSlice } from '@reduxjs/toolkit';
import queryDatabase from "../database/query";

const initalUser = sessionStorage.getItem('login_token') ? sessionStorage.getItem('username')  : null;
const initalToken = sessionStorage.getItem('login_token') ? sessionStorage.getItem('login_token') : null;
const initalCerify = sessionStorage.getItem('login_token') ? true  : false;

//playlist is going to be the index of the selected playlist that the user wants
const slice = createSlice({
    name: 'user', 
    initialState: {
        username : initalUser,
        token: initalToken,
        verify: initalCerify,
        playlist: []
    },
    reducers : {
        loginSuccess: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.verify = action.payload.isVerified;
        },
        logoutSuccess: (state, action) => {
            state.user = null;
            state.token = null;
            state.verify = false;
        },
        verifyLogin: (state, action) => {
            state.verify = action.payload.isVerified;
        }, 
        setPlaylist: (state, action) => {
            state.playlist = action.payload.playlist;
        }
    }
})

export default slice.reducer;

const {loginSuccess, logoutSuccess, verifyLogin, setPlaylist} = slice.actions;

export const getUserPlaylist = () => async (dispatch, getState) => {
    const { username } = getState().user;
    try{
        const payload = {"username": username};
        const endpoint = "http://localhost:8000/getPlaylist";
        const response = await queryDatabase(payload, endpoint);
        if(response != null){
            const data = await response.json();
            await dispatch(setPlaylist({playlist: data["result"]}));
        }else{
            return console.error("Error occured");
        }
    }catch(error){
        return console.error(error.message); 
    }
}

export const login = ({username, password}) => async dispatch => {
    try{
        const payload = {
            'username':username,
            'password':password};

        const endpoint = "http://localhost:8000/login";
        const response = await queryDatabase(payload, endpoint);
        if(response == null){
            return "Failed to connect to the server";
        }else{
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("login_token", data["auth_token"]);
                sessionStorage.setItem("username", username);
                await dispatch(loginSuccess({username:username, token: data["auth_token"], isVerified: true}));
                await dispatch(getUserPlaylist());
                return '';
            }
            else{
                return data["detail"];
            }
        };
    }catch(error){
        return console.error(error.message);
    }
}

export const logout = () => dispatch => {
    sessionStorage.removeItem("login_token");
    sessionStorage.removeItem("username");
    return dispatch(logoutSuccess());
}

export const verifyToken = () => async (dispatch) => {
    const token = sessionStorage.getItem("login_token");
    const user = sessionStorage.getItem("username");
    try{
        if(token != null){
          const payload = {
            "token":token,
            "username":user};
          const endpoint = "http://localhost:8000/verifyToken";
          const response = await queryDatabase(payload, endpoint);
          if(response != null){
            const dt = await response.json();
            await dispatch(verifyLogin({isVerified: dt["result"]}));
            await dispatch(getUserPlaylist());
          };
        };
    }catch(error){
        return console.error(error.message); 
    }
}