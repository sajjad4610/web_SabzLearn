import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { Form } from "react-bootstrap";
import EditANDRegisterUserHOC from "../../HOC/EditANDRegisterUSER-Hoc/EditANDRegisterUserHOC";

import "./CearteFormUser.css";
function CearteFormUser({
  setFormHandeler,
  getUserValueHandler,
  getEmailValueHandler,
  getPhoneValuHandler,
  getPassValueHandler,
  setAllValid,
  roleValueHandeler,
  setValueUserName,
  setValueEmail,
  setValuePhone,
  setValuePass,
  setValueUserRole,
  ValidUserName,
  ValidEmail,
  ValidPhone,
  ValidPass,
  setValidUserName,
  setValidEmail,
  setValidPhone,
  setValidPass,
  refresh,
  setRefresh,
  HandlerInsertdata,
  valueUserName,
  valueEmail,
  valuePhone,
  valuePass,
  valueUserRole,
}) {
  const [showInsert, setShowInsert] = useState(false);

  const InsertRowHandeler = () => {
    setShowInsert((prev) => !prev);
    if (!showInsert) {
      setValueUserName("");
      setValueEmail("");
      setValuePhone("");
      setValuePass("");
      setValueUserRole("user");
      setValidUserName([]);
      setValidEmail([]);
      setValidPhone([]);
      setValidPass([]);
      setRefresh((prev) => !prev);
      setAllValid(true);
    }
  };

  useEffect(() => {
    HandlerInsertdata(refresh);
  }, [HandlerInsertdata, refresh]);

  return (
    <div div className="mb-5 position-relative">
     
        <Fab
          size="small"
          color="info"
          aria-label="add"
          onClick={InsertRowHandeler}
        >
          <AddIcon />
        </Fab>


      {showInsert ? (
        <div>
          <div className="row justify-content-evenly alingi align-items-center m-3 row-cols-1 row-cols-sm-3  row-cols-md-4 row-cols-lg-5 ">
            <div className="col   m-3 mb-4">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa fa-user mb-3 fs-4 text-info"></i>
                <TextField
                  id="input-with-sx"
                  label="نام کاربری"
                  variant="standard"
                  onChange={getUserValueHandler}
                  className="ms-2 w-100"
                  value={valueUserName}
                />
              </Box>
              <h6 className="text-danger ms-4 mt-3">
                {ValidUserName.length > 0 ? ValidUserName[0].message : ""}
              </h6>
            </div>
            <div className="col m-3 mb-4">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa fa-envelope mb-3 fs-4 text-warning"></i>
                <TextField
                  id="input-with-sx"
                  label="ایمیل"
                  variant="standard"
                  onChange={getEmailValueHandler}
                  className="ms-2 w-100 "
                  value={valueEmail}
                />
              </Box>{" "}
              <h6 className="text-danger ms-4 mt-3">
                {ValidEmail.length > 0 ? ValidEmail[0].message : ""}
              </h6>
            </div>
            <div className="col   m-3 mb-4">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa fa-phone mb-3 fs-4 text-success"></i>
                <TextField
                  id="input-with-sx"
                  label=" شماره تلفن"
                  variant="standard"
                  onChange={getPhoneValuHandler}
                  className="ms-2 w-100 "
                  value={valuePhone}
                />
              </Box>
              <h6 className="text-danger ms-4 mt-3">
                {ValidPhone.length > 0 ? ValidPhone[0].message : ""}
              </h6>
            </div>

            <div className="col   m-3 mb-4">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa fa-key mb-3 fs-4 text-primary"></i>
                <TextField
                  id="input-with-sx"
                  label="رمز عبور"
                  variant="standard"
                  onChange={getPassValueHandler}
                  className="ms-2 w-100 "
                  value={valuePass}
                />
              </Box>{" "}
              <h6 className="text-danger ms-4 mt-3">
                {ValidPass.length > 0 ? ValidPass[0].message : ""}
              </h6>
            </div>
            <div className="col-2  m-3 mb-0">
              <Form.Select
                size="sm"
                className="border-0 border-bottom border-1 border-dark shadow-none"
                onChange={roleValueHandeler}
                value={valueUserRole}
              >
                <option value="user">کاربر عادی</option>
                <option value="admin">ادمین</option>
              </Form.Select>
            </div>
          </div>
          <div className="row justify-content-center align-items-center mt-5">
            <div className="col d-flex justify-content-center">
              <button
                className="btn btn-outline-success w-25 p-2"
                onClick={setFormHandeler}
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      ):null}
    </div>
  );
}
export default EditANDRegisterUserHOC(CearteFormUser);
