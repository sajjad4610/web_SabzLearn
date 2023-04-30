import { createContext } from "react";

const UserPanelContextApi = createContext({
  Users: [],
  User: [],
  userInfo: [],
  isLogin: false,
});

export default UserPanelContextApi;
