import { createContext } from "react";

export const DataContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  list: [],
  addToList: () => {},
  login: () => {},
  logout: () => {},
  adminIn: () => {},
  adminOut: () => {},
});
