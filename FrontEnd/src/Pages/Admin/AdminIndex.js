import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../../ContextApi/UserContextApi";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Item } from "../../Components/Sidebar/Schema";
import Loading from "../../Components/Loading/Loading";
import Topbar from "../../Components/Admin/Topbar/Topbar";

import Footer from "../../Components/Footer/Footer";
import Title from "../../Components/Title/Title";
import "./AdminIndex.css";
export default function AdminIndex() {
  const { isLogin, userInfo } = useContext(userContext);
  const [avatar, setAvatar] = React.useState("");

  let token = localStorage.getItem("user");
  useEffect(() => {
    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((alluser) => {
          setAvatar(alluser.avatar);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  let role = "";
  if (userInfo.user) {
    role = userInfo.user.role;
  }

  return (
    <>
      <Title text={"ادمین"} />

      {!localStorage.getItem("user") && <Navigate to="/"></Navigate>}

      {role === "admin" ? (
        <div
          className="row  flex-nowrap"
          style={{ backgroundColor: "rgba(223, 249, 251,.10)" }}
        >
          <div className="row AdminOutlet  ">
            <Sidebar
              Item={Item}
              logo={"/images/logo/Logo.png"}
              col="col-2"
              avatar={avatar}
              nameUser={userInfo.user.username}
              breckPoint="lg"
              iconSize={"fs-2"}
              iconSizeChild={"fs-4"}
              fontsize={"fs-4"}
              fontsizeChild={"fs-5"}
            />
            <div className="col">
              <Topbar />
              {<Outlet />}
            </div>
            <div className="mt-1">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {role === "user" && <Navigate to="/"></Navigate>}
    </>
  );
}
