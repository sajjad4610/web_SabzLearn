import React, { useContext} from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import useContextUser from "../../../ContextApi/UserContextApi";

export default function CheckedComment({
  setCheckComment,
  Stutus_comment,
  id_Comment,
  apiPass,
  apiSend,
  id_course,
  name_course,
  name_user,
  id_Orginal,
  replay,
  comment,
  typeData,
  type_comment,
  
}) {
  const { isLogin, userInfo } = useContext(useContextUser);

  const token = localStorage.getItem("user");

  const checkCommentHandler = (id_Comment) => {
 

    Swal.fire({
      title:
        '<strong className=" text-success fs-2" > آیا این کامنت را تایید میکنید</strong>',
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,

      confirmButtonText:
        '<i className="fa fa-thumbs-up  me-3"></i> <span className=" fs-5 text-white"> تایید کامنت</span> ',

      cancelButtonText: ' <span className=" fs-5 text-white"> بیخیال </span>  ',

      confirmButtonColor: "#badc58",
      cancelButtonColor: "#ff7979",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiPass}/${id_Comment}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ check_comment: true }),
        })
          .then((res) => res.json())
          .then((result) => {
            setCheckComment(result);
            Swal.fire({
              position: "center",
              icon: "success",
              title: result.message,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  };

  const ReplayCommentHandler = async (
    id_Comment,
    id_course,
    name_course,
    name_user,
    id_Orginal,
    replay,
    comment,
    type_comment,
  ) => {
    let data = new Date();
    const d = new Date(data);
    isLogin &&  await   fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((alluser) => {
       
        return alluser.avatar
      }).then(async avatar=>{


        const { value: text } = await Swal.fire({
          titleText: `در جواب ${name_user}`,
          input: "textarea",
          inputLabel: comment,
          inputPlaceholder: "پیغام خود را اینجا بنوسید .........",
    
          width: "50%",
          inputAutoTrim: true,
          showCancelButton: true,
          allowOutsideClick: false,
        });
    
        if (text) {
          const dataquestionReplay = {
            moment: new Intl.DateTimeFormat("fa-IR").format(d),
            avatar:avatar,
            id_question: `${uuidv4()}_${id_course}`,
            id_course: id_course,
            id_user: isLogin && userInfo.user.userid,
            name_user: isLogin && userInfo.user.username,
            name_course: name_course,
            question: text,
            type_question: "فرعی",
            Stutus_question:
              isLogin && userInfo.user.role === "admin"
                ? "تایید شده"
                : "در انتظار تایید",
            id_questionOrginal:type_comment==='فرعی' ? id_Orginal : id_Comment,
            replayTo: name_user,
            replayquestion: comment,
          };
          const dataCommentReplay = {
            moment: new Intl.DateTimeFormat("fa-IR").format(d),
            avatar:avatar,
            id_Comment: `${uuidv4()}_${id_course}`,
            id_course: id_course,
            id_user: isLogin && userInfo.user.userid,
            name_user: isLogin && userInfo.user.username,
            name_course: name_course,
            comment: text,
            type_comment: "فرعی",
            Stutus_comment:
              isLogin && userInfo.user.role === "admin"
                ? "تایید شده"
                : "در انتظار تایید",
            id_CommentOrginal: type_comment==='فرعی' ? id_Orginal : id_Comment ,
            replayTo: name_user,
            replayComment: comment,
          };
          await fetch(`${apiSend}/${id_course}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
              typeData === "comment" ? dataCommentReplay : dataquestionReplay
            ),
          })
            .then((res) => res.json())
            .then((result) => {
              setCheckComment(result);
      
              Swal.fire({
                position: "center",
                icon: "success",
                title: `پاسج شما یه ${name_user} ثبت شد`,
                showConfirmButton: false,
                timer: 2000,
              });
            });
        }

      })
 
  };
  return (
    <>
      {Stutus_comment === "تایید شده" ? (
        <i
          className="fa fa-reply fs-3 text-success"
          key={uuidv4()}
          onClick={() =>
            ReplayCommentHandler(
              id_Comment,
              id_course,
              name_course,
              name_user,
              id_Orginal,
              replay,
              comment,
              type_comment,
            )
          }
        ></i>
      ) : (
        <span
          className="fs-5 text-info "
          style={{ cursor: "pointer" }}
          onClick={() => checkCommentHandler(id_Comment)}
          key={uuidv4()}
        >
          check
        </span>
      )}
    </>
  );
}
