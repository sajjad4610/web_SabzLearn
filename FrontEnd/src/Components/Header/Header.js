import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";

import userContext from "../../ContextApi/UserContextApi";
import ItemAdmin from "../../Schema/schemaSidebarAndUserView/schemaSidebarAndUserViewAdminPanel";
import ItemUser from "../../Schema/schemaSidebarAndUserView/schemaSidebarAndUserViewUserPanel";
import UserView from "../UserView/UserView";
import BoxLoginRegister from "./BoxLoginRegister/BoxLoginRegister";
import "./Header.css";
import Loading from "../Loading/Loading";
export default function Header() {
  const [timeOutLoading, setTimeOutLoading] = useState(false);

  const { isLogin } = useContext(userContext);
  return (
    <Alert variant="success" className="m-0 b img_header">
      <div className="fs-4 text-secondary row text-center justify-content-end align-items-center order-lg-2">
        <div className="col d-flex justify-content-srart">
          {/* <TimeClock /> */}
        </div>
        <div className="col d-flex justify-content-end">
          {isLogin ? (
            <UserView ItemAdimn={ItemAdmin} ItemUser={ItemUser} />
          ) : (
            <>
            
              {!timeOutLoading ? (
                <Loading type={"dlay"} setTimeOutLoading={setTimeOutLoading} model='spin'/>
              ) : (
                <BoxLoginRegister></BoxLoginRegister>
              )}
            </>
          )}
        </div>
      </div>
    </Alert>
  );
}
