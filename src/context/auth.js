import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {

  const [token, changeToken] = useState(() => {
    return sessionStorage.getItem("login_token");
  });
  const [verify, setVerified] = useState(false)

  const login = async (username, password) => {
      if (username == "" || password == "") {
          return 102; //error for empty username or password
      }
      try {
          const userInfo = {
              'username':username,
              'password':password
          }
          const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userInfo)
          })

          const data = await response.json();
          if (response.ok) {
            sessionStorage.setItem("login_token", data["auth_token"])
            sessionStorage.setItem("username", userInfo["username"])
            changeToken(data["auth_token"])
            return 1;
          }
          else if(response.status == 101){
              return 101; // Error for unknown username/password
          }
      }
      catch (error){
          return 103; // other errors such as failing to connect to server
      }
  };

  const logout = () => {
    changeToken(null);
    setVerified(false);
    sessionStorage.removeItem("login_token");
    sessionStorage.removeItem("username")
  };

  useEffect(() => {
    if (token) {
      setVerified(true);
    }else{
      setVerified(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};