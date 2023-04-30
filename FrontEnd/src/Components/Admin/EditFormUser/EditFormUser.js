import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Form } from "react-bootstrap";

import EditANDRegisterUserHOC from "../../HOC/EditANDRegisterUSER-Hoc/EditANDRegisterUserHOC";

import "./EditFormUser.css";

function EditFormUser({
  setFormHandeler,
  getUserValueHandler,
  getEmailValueHandler,
  getPhoneValuHandler,
  setAllValid,
  allValid,
  roleValueHandeler,
  setValueUserName,
  setValueEmail,
  setValuePhone,
  setValuePass,
  setValueCard,
  setValueCourse,
  setValueUserRole,
  ValidUserName,
  ValidEmail,
  ValidPhone,
  setValidUserName,
  setValidEmail,
  setValidPhone,
  setValidPass,
  id_EditFormUser,
  rows,
  editHandlerEnd,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [DataUser, setDataUser] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValueUserName("");
    setValueEmail("");
    setValuePhone("");
    setValuePass("");
    setValueUserRole("user");
    setValidUserName([]);
    setValidEmail([]);
    setValidPhone([]);
    setValidPass([]);
    setAllValid(true);
    editHandlerEnd();
  };
  useEffect(() => {
    if (!allValid) {
      setAnchorEl(null);
      setValueUserName("");
      setValueEmail("");
      setValuePhone("");
      setValuePass("");
      setValueUserRole("user");
      setValidUserName([]);
      setValidEmail([]);
      setValidPhone([]);
      setValidPass([]);
      setAllValid(true);
      editHandlerEnd();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValid]);

  useEffect(() => {
    let datauser = rows.filter((e) => e._id === id_EditFormUser);

    setDataUser(datauser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <i
        className="fa fa-edit fs-3 text-info"
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
        <Typography
          component={"span"}
          sx={{ p: 2 }}
          className="row justify-content-center align-items-center flex-column flex-xl-row "
        >
          {DataUser.length > 0 && (
            <>
              <div className="col-xl-4 form-floating">
                <input
                  id="1"
                  className="form-control m-2"
                  type="text"
                  defaultValue={`${DataUser[0].username}`}
                  onChange={getUserValueHandler}
                />
                <label className="ms-3 text-warning" htmlFor="1">
                  نام کاربری
                </label>
                <h6 className="text-danger ms-4 mt-3">
                  {ValidUserName.length > 0 ? ValidUserName[0].message : ""}
                </h6>
              </div>
              <div className="col-xl-4 form-floating">
                <input
                  id="2"
                  className="form-control m-2"
                  type="text"
                  defaultValue={`${DataUser[0].email}`}
                  onChange={getEmailValueHandler}
                />
                <label className="ms-3 text-warning" htmlFor="2">
                  ایمیل
                </label>
                <h6 className="text-danger ms-4 mt-3">
                  {ValidEmail.length > 0 ? ValidEmail[0].message : ""}
                </h6>
              </div>
              <div className="col-xl-4 form-floating">
                <input
                  id="3"
                  className="form-control m-2"
                  type="text"
                  defaultValue={`${DataUser[0].phone}`}
                  onChange={getPhoneValuHandler}
                />
                <label className="ms-3 text-warning" htmlFor="3">
                  تلفن
                </label>
                <h6 className="text-danger ms-4 mt-3">
                  {ValidPhone.length > 0 ? ValidPhone[0].message : ""}
                </h6>
              </div>

              <div className="col-xl-4 form-floating">
                <Form.Select
                  id="6"
                  aria-label="Default select example"
                  className="form-control m-2"
                  onChange={roleValueHandeler}
                >
                  <option
                    defaultValue={
                      DataUser[0].role === "user" ? "user" : "admin"
                    }
                  >
                    {DataUser[0].role === "user" ? "user" : "admin"}
                  </option>
                  <option
                    defaultValue={
                      DataUser[0].role === "user" ? "admin" : "user"
                    }
                  >
                    {DataUser[0].role === "user" ? "admin" : "user"}
                  </option>
                </Form.Select>
                <label className="ms-3 text-warning " htmlFor="6">
                  نوع کاربری
                </label>
              </div>
            </>
          )}
        </Typography>
        <div className="row d-flex justify-content-center">
          <div className="col  d-flex justify-content-center">
            <button
              className="m-2 pe-2 ps-2 btn btn-outline-success  w-50 fs-4 mb-4"
              onClick={setFormHandeler}
            >
              ذخیره<i className="fa fa-save fs-4 ms-3"></i>
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
export default EditANDRegisterUserHOC(EditFormUser);
