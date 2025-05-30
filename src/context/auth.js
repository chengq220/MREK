import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [preference, setPreference] = useState('');
  const [token, changeToken] = useState("");
  const [verify, setVerified] = useState(false);
  const [update, triggerUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
            await fetchUserData();
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
    changeToken(null);
    setVerified(false);
    sessionStorage.removeItem("login_token");
    sessionStorage.removeItem("username")
  };

  const fetchUserData = async() => {
    try{
      const userinfo = {'user': user};
      const response = await fetch("http://localhost:8000/getPref", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userinfo)
      })
      if(response.ok){
          let data = await response.json();
          if( data["res"].length > 0){
              setPreference(data["res"][0]);
          }
      }
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
    setIsLoading(true)
    if(token){
      const payload = {
        "token":sessionStorage.getItem("login_token"),
        "username":sessionStorage.getItem("username") 
      }
      const res = await fetch("http://localhost:8000/verifyToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
      });
      if(res.ok){
        const dt = await res.json();
        setVerified(dt);
        setUser(sessionStorage.getItem("username"));
        await fetchUserData();
        setIsLoading(false);
        return dt["result"];
      }
    }
    setIsLoading(false);
    return false;
  }

  return (
    <AuthContext.Provider value={{ user, playlist, preference, token, verify, login, isLoading, logout, verifyToken, triggerUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};