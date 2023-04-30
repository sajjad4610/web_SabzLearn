import React, { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export default function Trash({
  message,
  apiRemove,
  methodRemove,
  refreshTrashHandler,
  type,
  id_Tarsh,
}) {
  const token = localStorage.getItem("user");
  useState(false);

  const handleShow = (id_Tarsh) => {
    Swal.fire({
      title: "هشدار !!!",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله , حذف کن !",
      cancelButtonText: "خیر , حذف نکن !",
      input: type === "notification" ? "select" : "",
      inputOptions: {
        false: "فقط یک پیغام",
        true: "همه ی کامنت های مشابه حذف شوند",
      },

      inputAttributes: {
        title: "همه ی کامنت های مشابه حذف شوند",
        id: "notification",
        default: "false",
      },

      // inputValue: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiRemove}/${id_Tarsh.trim()}/${result.value}`, {
          method: `${methodRemove}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
            }
          })
          .then(async (result) => {
            if (result.type === "courses") {
              await fetch(
                `http://localhost:4000/v1/user/removeSimilarCard/${result.idcourse}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((res) => {});

              await fetch(
                `http://localhost:4000/v1/user/removeSimilarcousesUser/${result.idcourse}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((res) => {});
            }
            if (result.type === "remove_course_user") {
              await fetch(
                `http://localhost:4000/v1/course/SalesNumber/minus/${result.idcourse}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ salesnumberdata: 1 }),
                }
              )
                .then((res) => res.json())
                .then((result) => {});
            }

            refreshTrashHandler();
            Swal.fire("حذف شد !", `${result.message}`, "success");
          })
          .catch((err) => {});
      }
    });
  };

  return (
    <div>
      <i
        className="fa fa-trash fs-3 text-danger"
        onClick={() => handleShow(id_Tarsh)}
        key={uuidv4()}
      ></i>
    </div>
  );
}
