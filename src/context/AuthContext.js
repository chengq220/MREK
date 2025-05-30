import { createContext, useContext } from "react";

export const AuthContext = createContext({
  username: null,
  playlists: null, 
  preferences: null,
  token: null,
  verify: null,
  isLoading: null, 
  login: () => {},
  logout: () => {},
  verifyToken: () => {},
  triggerUpdate: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};