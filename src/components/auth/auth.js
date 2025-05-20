import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {
  const [token, changeToken] = useState(() => {
    return sessionStorage.getItem("login_token");
  });
  
  const [user, changeUser] = useState('')
  const [verify, setVerified] = useState(false)

  const login = (newToken) => {
    changeToken(newToken);
    changeUser("Cheng");
    sessionStorage.setItem("login_token", newToken);
  };

  const logout = () => {
    changeUser("");
    changeToken(null);
    setVerified(false);
    sessionStorage.removeItem("login_token");
  };
  useEffect(() => {
    const access_token = sessionStorage.getItem("login_token")
    if(token){
      if (access_token == token) {
        setVerified(true);
      }else{
        setVerified(false);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};