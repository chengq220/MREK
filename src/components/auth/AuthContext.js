import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  verify: null
});

export const useAuth = () => {
  return useContext(AuthContext);
};