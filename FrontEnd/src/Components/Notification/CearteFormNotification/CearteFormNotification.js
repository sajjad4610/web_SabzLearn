import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import userContext from "../../../ContextApi/UserContextApi";

import DataTable from "../../DataTable/DataTable";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaTabelUser/schemaTabelNotification";

import "./CearteFormNotification.css";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import { Select } from "antd";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";

export default function CearteFormNotification({ refreshByTabs }) {
  const [AllEmail, setAllEmail] = useState([]);
  const [selectUser, setselectUser] = useState("");
  const [messagnot, setmessagnot] = useState("");
  const [refresh, setRafresh] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [refreshForEditForm, setrefreshForEditForm] = useState([]);

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };

  const { userInfo } = useContext(userContext);

  const token = localStorage.getItem("user");

  useEffect(() => {
    GetServises (GetApi.UsersApi).then((alluser) => {
      let allEmail = alluser.flatMap((e) => e.email);
      allEmail.push("All", "All User", "All Admin");
      allEmail.reverse();
      setAllEmail(allEmail);
    });
    
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshByTabs]);

  const messagnotUserHandler = (event) => {
    setmessagnot(event.target.value);
  };

  const sendNotificationHandler = async (event) => {
    let dataTime = moment().format("LLLL");
    const dataNotific = {
      selectUser: selectUser,
      message: messagnot.trim(),
      sender: userInfo.user.username,
      email: userInfo.user.email,
      role: userInfo.user.role,
      dataTime: dataTime,
      idMessage: uuidv4(),
    };
    if (selectUser && messagnot) {
      await fetch("http://localhost:4000/v1/user/insertnotification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataNotific),
      })
        .then((res) => res.json())
        .then((result) => {
          setValidForm((prev) => !prev);
          if (
            result.result.acknowledged === true &&
            result.result.matchedCount > 0 &&
            result.result.modifiedCount > 0
          ) {
            ToastMessage(result.message);
          } else {
          }
        });
    } else {
    }
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-12 m-2">
          <div className="row mt-3">
            <div className="col-sm-6 col-md-5 col-lg-4 mb-3  ">
              <Select
                allowClear={true}
                className="border-0 border-bottom"
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="کاربر را مشخص کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setselectUser(value)}
                options={AllEmail.map((label) => ({
                  label: label,
                  value: label,
                }))}
              />
            </div>
          </div>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          ></FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="پیغام خود را بنویسید"
            className={!messagnot ? "text-danger" : "text-success"}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={messagnotUserHandler}
            />
          </FloatingLabel>
        </div>
        <div className="col-12 d-flex justify-content-center disabled ">
          <button
            className={`btn btn-outline-info fs-3 m-5 w-50 ${
              (!selectUser || !messagnot) && "disabled"
            }`}
            onClick={sendNotificationHandler}
          >
            <i className="fa fa-send fs-4  me-3 "></i> ارسال
          </button>
        </div>
      </div>

      <DataTable
        refreshForEditForm={refreshForEditForm}
          refreshForEditFormHandler={setrefreshForEditForm}
        refreshTrashHandler={refreshTrashHandler}
        refreshByTabs={refreshByTabs}
        refreshTrash={refresh}
        refreshByValidform={validForm}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/user/allgetnotification"
        apiRemove={"http://localhost:4000/v1/user/removenotificationtabel"}
        methodRemove={"PUT"}
        messageTrash="آیا از حذف این پیغام مطمئن هستید؟"
        type="notification"
      ></DataTable>
    </>
  );
}
