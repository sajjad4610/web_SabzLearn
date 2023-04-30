import React, { useEffect, useState } from "react";
import {   useRoutes } from "react-router-dom";

import userContext from "./ContextApi/UserContextApi";
import GetMe from "./customUse/getMe";

import routers from "./Router";

import "./App.css";
import Swal from "sweetalert2";

export default function App() {
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  let routes = useRoutes(routers);
  const login = (Info) => {
    let getTokenLocal = localStorage.getItem("user");
    if (getTokenLocal) {
      setToken(getTokenLocal);
      setIsLogin(true);
      setUserInfo(Info);
    }
  };

  const logout = () => {
    Swal.fire({
      title: 'از خروج مطمئنی؟؟',
      text: "ممنون که تا حال با ما بودی..",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'اره, من میرم !',
      cancelButtonText:'بیخیال'
      
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setToken("");
        setIsLogin(false);
        setUserInfo([]);
   
      }
    })

  };

  useEffect(() => {
    let getTokenLocal = localStorage.getItem("user");
    if (getTokenLocal) {
      GetMe(getTokenLocal, login);
    }
  }, []);
  return (
    <userContext.Provider value={{ isLogin, userInfo, token, login, logout,setIsRefresh ,isRefresh }}>
      <div  className="p-5 ">{routes}</div>
    </userContext.Provider>
  );
}
