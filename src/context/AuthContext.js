import { createContext, useContext } from "react";

export const AuthContext = createContext({
  username: null,
  playlists: null, 
  token: null,
  verify: null,
  isLoading: null, 
  login: () => {},
  register: () => {},
  logout: () => {},
  verifyToken: () => {},
  fetchPlaylist: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};