import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
  verify: null
});

export const useAuth = () => {
  return useContext(AuthContext);
};