import React, { useContext, useState } from "react";
import {  Drawer } from "antd";
import userContext from "../../../ContextApi/UserContextApi";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import "./Sidebar.css";
const Sidebar = ({ Item }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(userContext);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="col-3 col-xxl-2 d-none d-xl-flex ">
        <div className="row d-flex flex-column w-100  ">
          <div id="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-logo">
                <Link to="/">
                  <img src="/images/logo/Logo.png" alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="sidebar-menu">
              <ul className="">
                {Item.map((e) => (
                  <li key={uuidv4()} className="">
                    <Link to={e.link}>
                      <span>{e.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link onClick={() => logout()} to="/">
                    <span>خروج</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="d-xl-none">
        <Fab
          size="small"
          color="secondary"
          className="m-3"
          onClick={showDrawer}
        >
          <i className="fa fa-bars fs-1"></i>
        </Fab>
        <Drawer
          className="sidebar"
          headerStyle={{
            // display:"none",
            backgroundColor: "#17203f",
            color: "white",
          }}
          bodyStyle={{
            backgroundColor: "#17203f",
            overflow: "hidden",
          }}
          //   title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
          zIndex={100000}
        >
          <div className="row d-flex flex-column  ">
            <div id="sidebar">
              <div className="sidebar-header">
                <div className="sidebar-logo">
                  <Link to="/">
                    <img src="/images/logo/Logo.png" alt="Logo" />
                  </Link>
                </div>
              </div>

              <div className="sidebar-menu">
                <ul className="">
                  {Item.map((e) => (
                    <li key={uuidv4()} className="">
                      <Link onClick={() => setOpen(false)} to={e.link}>
                        <span>{e.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link onClick={() => logout()} to="/">
                      <span>خروج</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
