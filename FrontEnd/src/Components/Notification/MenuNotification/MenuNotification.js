import React, { useContext, useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "react-bootstrap";
import userContext from "../../../ContextApi/UserContextApi";


export default function MenuNotification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setnotification] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const {userInfo} = useContext(userContext)

  const token = localStorage.getItem("user");

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  useEffect(() => {
    fetch("http://localhost:4000/v1/user/getnotification", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((alluser) => {
        setnotification(alluser);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);


  const removeMessageHandler= async(event) => {
  
    
    let datanotification={
      idMessage:event.target.parentElement.nextElementSibling.lastElementChild.innerText,
      Message:event.target.parentElement.nextElementSibling.firstElementChild.innerText,
      email:userInfo.user.email,
      username:userInfo.user.username,
      
    }
  
    await fetch("http://localhost:4000/v1/user/removenotificationbell", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datanotification),
      })
        .then((res) => res.json())
        .then((result) => {
          result.acknowledged===true && setrefresh(prev=>!prev)
   


        })

    
  }

  return (
    <Badge
      badgeContent={notification.length}
      color="secondary"
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <div>

        <i
          className="fa fa-bell fs-2 text-warning TopbarBell bg-body shadow-none border-0 p-0 m-0"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        ></i>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        
        >
        {notification.map(e=>
          <Typography sx={{ p: 1}} key={uuidv4()}  component={'span'}>
        
            <Toast className="m-1" show={true} onClose={removeMessageHandler}>
              <Toast.Header>
                <strong className="me-auto text-success">فرستنده : {e.sender}</strong>
                <small className="text-info">{e.moment}</small>
              </Toast.Header>
              <Toast.Body>
              <span className="fs-5 text-secondary">{e.message.trim()}</span>
              <span className="visually-hidden">{e.idMessage}</span>
              </Toast.Body>
            </Toast>
          </Typography>


        )}
          {notification.length===0 && <Typography sx={{ p: 2 }}>
          هیچ پبغامی ندارید
          </Typography>}

        </Popover>
      </div>
    </Badge>
  );
}
