import React from "react";
import MenuNotification from "../../Notification/MenuNotification/MenuNotification";


import "./Topbar.css";
import ItemUser from "../../../Schema/schemaSidebarAndUserView/schemaSidebarAndUserViewUserPanel";
import ItemAdmin from "../../../Schema/schemaSidebarAndUserView/schemaSidebarAndUserViewAdminPanel";
import UserView from "../../UserView/UserView";
export default function Topbar({avatar}) {
  
  return (
    
    <div className=" row  flex-sm-row justify-content-start  align-items-center mb-3 ms-5   ">
      <div className="col">
        <div className="row align-items-center">
          <div className="col-10 ">
            <input className="form-control" placeholder="جستجو" type="text" />
          </div>
          <div className="col-2">
            <MenuNotification></MenuNotification>
          </div>
        </div>
      </div>
      <div className="col d-none d-lg-flex ">
        <UserView  ItemAdimn={ItemAdmin} ItemUser={ItemUser}/>
      </div>
    </div>
  );
}
