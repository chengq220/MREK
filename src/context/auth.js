import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import queryDatabase from "../database/query";

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [token, changeToken] = useState("");
  const [verify, setVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (username, password) => {
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
        sessionStorage.setItem("username", payload["username"]);
        changeToken(data["auth_token"]);
        setUser(payload["username"]);
        await fetchPlaylist();
        setIsLoading(false);
        return '';
      }else{
        return data["detail"];
      };
    };
  };

  const register = async (username, password, confPassword) =>{
    if(password != confPassword){
      return "Password not the same";
    }
    const payload = {
      'username':username,
      'password':password};

    const endpoint = "http://localhost:8000/register";
    const response = await queryDatabase(payload, endpoint);
    if(response == null){
      return "Error occured";
    }else{
      return '';
    }
  };

  const logout = () => {
    setIsLoading(true);
    changeToken(null);
    setVerified(false);
    sessionStorage.removeItem("login_token");
    sessionStorage.removeItem("username");
    setIsLoading(false);
  };

  const fetchPlaylist = async() =>{
    const payload = {
        "username": user,
        "playlist_name" : "best_playlist"};

    const endpoint = "http://localhost:8000/getPlaylistItems";
    const response = await queryDatabase(payload, endpoint);
    if(response != null){
        const data = await response.json();
        setPlaylist(data["result"]);
    }else{
      console.log("Error occured");
    }
  }

  const verifyToken = async () =>{
    setIsLoading(true);
    const tk = sessionStorage.getItem("login_token");
    const us = sessionStorage.getItem("username");
    if(tk != null){
      const payload = {
        "token":tk,
        "username":us};
      const endpoint = "http://localhost:8000/verifyToken";
      const response = await queryDatabase(payload, endpoint);
      if(response != null){
        const dt = await response.json();
        const vfy = dt["result"];
        if(vfy){
          setUser(sessionStorage.getItem("username"));
          changeToken(tk);
          setVerified(true);
          await fetchPlaylist();
        }else{
          setVerified(false);
        }
      }
    }else{
      setVerified(false);
    }    
    setIsLoading(false);
  }

  useEffect(() => {
    setUser(sessionStorage.getItem("username"));
    changeToken(sessionStorage.getItem("login_token"));
  }, [])

  return (
    <AuthContext.Provider value={{ user, playlist, token, verify, isLoading, login, logout, register, verifyToken, fetchPlaylist }}>
      {children}
    </AuthContext.Provider>
  );
};