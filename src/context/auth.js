import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [token, changeToken] = useState("");
  const [verify, setVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (username, password) => {
      setIsLoading(true)
      if (username == "" || password == "") {
          setIsLoading(false)
          return 102; //error for empty username or password
      }
      try {
          const userInfo = {
              'username':username,
              'password':password
          };
          const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userInfo)
          });

          const data = await response.json();
          if (response.ok) {
            sessionStorage.setItem("login_token", data["auth_token"]);
            sessionStorage.setItem("username", userInfo["username"]);
            changeToken(data["auth_token"]);
            setUser(userInfo["username"]);
            await fetchPlaylist();
            setIsLoading(false)
            return 1;
          }
          else if(response.status == 101){
              setIsLoading(false)
              return 101; // Error for unknown username/password
          };
      }
      catch (error){
        logout()
        setIsLoading(false)
        return 103; // other errors such as failing to connect to server
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
    try{
      const payload = {
            "username" : user,
            "playlist_name" : "best_playlist"
      };
      const res = await fetch("http://localhost:8000/getPlaylistItems", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
      })
      if(res.ok){
          const data = await res.json();
          setPlaylist(data["result"]);
      }
    }catch(error){
      console.log("error occured")
    }
  }

  const verifyToken = async () =>{
    setIsLoading(true);
    const tk = sessionStorage.getItem("login_token");
    const us = sessionStorage.getItem("username");
    if(tk != null){
      const payload = {
        "token":tk,
        "username":us
      }
      try{
        const res = await fetch("http://localhost:8000/verifyToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if(res.ok){
          const dt = await res.json();
          const vfy = dt["result"];
          if(vfy){
            setUser(sessionStorage.getItem("username"));
            changeToken(tk);
            setVerified(true);
            await fetchPlaylist();
          }else{
            setVerified(false);
          }
          setIsLoading(false);
          return vfy;
        }
      }catch(error){}
    }    
    setIsLoading(false);
    setVerified(false);
    return false;
  }

  const updatePlaylist = async () => {
    setIsLoading(true);
    await fetchPlaylist;
    setIsLoading(false);
  }

  useEffect(() => {
    setUser(sessionStorage.getItem("username"))
    changeToken(sessionStorage.getItem("login_token"));
  }, [])

  return (
    <AuthContext.Provider value={{ user, playlist, token, verify, isLoading, login, logout, verifyToken, updatePlaylist }}>
      {children}
    </AuthContext.Provider>
  );
};