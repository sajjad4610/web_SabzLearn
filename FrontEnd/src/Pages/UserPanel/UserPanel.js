import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Topbar from "../../Components/Admin/Topbar/Topbar";
import ItemUser from "../../Schema/schemaSidebarAndUserView/schemaSidebarAndUserViewUserPanel";
import Loading from "../../Components/Loading/Loading";
import userContext from "../../ContextApi/UserContextApi";
import UserPanelContextApi from "../../ContextApi/UserPanelContextApi";

import "./UserPanel.css";
import Title from "../../Components/Title/Title";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

export default function UserPanel() {
  const { userInfo, isLogin } = useContext(userContext);
  const [Users, setUsers] = useState([]);


  useEffect(() => {
    GetServises(GetApi.UsersApi).then((alluser) => {
      setUsers(alluser);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserPanelContextApi.Provider
      value={{ Users: Users.length ? Users : [], userInfo, isLogin }}
    >
      <Title text={"پنل کاربری"} />

      <div className="mt-3 ">
        {!localStorage.getItem("user") && <Navigate to="/"></Navigate>}

        {isLogin ? (
          <div className="row mt-3  flex-nowrap">
            <div className="row AdminOutlet ">
              <Sidebar Item={ItemUser} />
              <div className="col">
                <Topbar></Topbar>
                {<Outlet />}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </UserPanelContextApi.Provider>
  );
}
