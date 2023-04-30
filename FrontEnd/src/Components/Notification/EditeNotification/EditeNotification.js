import React, { useState } from "react";
import { Button, Popover, Space } from "antd";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";

export default function EditeNotification(props) {
  const [messagnot, setmessagnot] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [id, setId] = useState("");

  const token = localStorage.getItem("user");

  const changemassgeNotificatin = async (id, row) => {
    setmessagnot(row[0].message);
    setSelectUser(row[0].selectUser);
    setId(id);
  };

  const UpdateMassegeHandler = async () => {
    const data = {
      selectUser: selectUser.trim(),
      message: messagnot.trim(),
    };
    await fetch(
      `http://localhost:4000/v1/user/EditeNotification/${id.trim()}`,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        ToastMessage(result.message);
        props.refreshForEditFormHandler(result);
      });
  };
  return (
    <div>
      <Space wrap>
        <Popover
          placement="bottom"
          content={
            <>
              <textarea
                value={messagnot}
                name=""
                id=""
                cols="100"
                rows="3"
                onChange={(event) => setmessagnot(event.target.value)}
                className="form-control"
              ></textarea>
              <div className="w-100 d-flex justify-content-center">
                <button
                  className={`${
                    messagnot ? "btn-outline-success" : "disabled"
                  } btn  w-50 p-2 m-3 fs-5 `}
                  onClick={UpdateMassegeHandler}
                >
                  ارسال
                </button>
              </div>
            </>
          }
          title={`ویرایش پیغام ${props.selectUser}`}
          trigger="click"
        >
          <Button
            className="fa fa-edit fs-4 text-info"
            onClick={() =>
              changemassgeNotificatin(
                props._id,
                props.rows.filter((e) => e.idMessage === props._id)
              )
            }
          ></Button>
        </Popover>
      </Space>
    </div>
  );
}
