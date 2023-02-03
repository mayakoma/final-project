import { createContext } from "react";

export const DataContext = createContext({
  isLoggedIn: false,
  userId: "",
  isAdmin: false,
  list: [],
  isChange: false,
  setIsChange: () => {},
  setGender: () => {},
  setArea: () => {},
  userGender: "",
  userArea: "",
  addToList: () => {},
  login: () => {},
  logout: () => {},
  adminIn: () => {},
  adminOut: () => {},
  setUserId: () => {},
});
