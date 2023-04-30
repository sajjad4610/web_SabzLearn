import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";

import userContext from "../../ContextApi/UserContextApi";
import { Link } from "react-router-dom";

import "./UserView.css";

export default function UserView({ ItemAdimn, ItemUser  }) {
  const { userInfo, logout ,isLogin  } = useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState('');

let token=localStorage.getItem('user')

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogoutHandler = () => {
    setAnchorEl(null);
    logout();
  };

  useEffect(() => {
    fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((alluser) => {
       
        setAvatar(alluser.avatar)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  return (
    <>
      <div className="row justify-content-end align-items-center w-100 ">
        <div className="col d-flex justify-content-end">
          <div className="row">
            <div className="col d-flex justify-content-end me-2">
              <Button
                className="fs-5 BtnUserViwe"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <i className="fa fa-angle-down me-3 fw-bolder fs-4 "></i>
                {userInfo.user.username}
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <div className="d-flex flex-column text-secondary ">
                   {isLogin && userInfo.user.role === "user"
                    ? ItemUser.map((e) => (
                        <Link key={uuidv4()}
                          className="pe-5 me-5 mt-2 mb-2 ms-3 fs-5 text-decoration-none  text-black LinKUserView"
                          to={`/p-user/${e.link}`}
                        >
                          {e.name}
                        </Link>
                      ))
                    : ItemAdimn.map((e) => (
                        <Link key={uuidv4()}
                          className="pe-5 me-5 mt-2 mb-2 ms-3 fs-5 text-decoration-none  text-black LinKUserView"
                          to={`/p-admin/${e.link}`}
                        >
                          {e.name}
                        </Link>
                      ))}
                </div>

                <MenuItem
                  className=" fs-3 mt-2 pt-2 text-danger border-top border-3"
                  onClick={LogoutHandler}
                >
                  خروج
                </MenuItem>
              </Menu>
            </div>

            <div className="col">
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
