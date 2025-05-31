import { createContext, useContext } from "react";

export const AuthContext = createContext({
  username: null,
  playlists: null, 
  token: null,
  verify: null,
  isLoading: null, 
  login: () => {},
  logout: () => {},
  verifyToken: () => {},
  updatePlaylist: () => {},
  setPlaylist: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};