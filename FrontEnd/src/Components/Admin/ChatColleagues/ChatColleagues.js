import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

import useContextUser from "../../../ContextApi/UserContextApi";
import Swal from "sweetalert2";
import CardComment from "../../CardComment/CardComment";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";
export default function ChatColleagues() {
  let Url = useLocation();

  const { isLogin, userInfo } = useContext(useContextUser);

  const [InputQuestion, setInputQuestion] = useState("");
  const [chatUsersMain, setCommentUsersMain] = useState([]);
  const [chatUsersSub, setCommentUsersSub] = useState([]);
  const [result, setResult] = useState("");
  const [refreh, setRefresh] = useState(false);
  const [avatar, setAvatar] = useState("");

  const token = localStorage.getItem("user");

  useEffect(() => {
    GetServises(GetApi.UsersApi).then(result=>{
      if (isLogin) {
        let Avatar = result.filter((e) => e._id === userInfo.user.userid);
        setAvatar(Avatar[0].avatar);
      }
      let chatUsers = result.flatMap((e) => e.chat);
  
      let filterChekedCommentUsersMain = chatUsers.filter(
        (e) => e.type_chat === "اصلی"
      );
      let filterChekedCommentUsersSub = chatUsers.filter(
        (e) => e.type_chat === "فرعی"
      );
  
      setCommentUsersMain(filterChekedCommentUsersMain);
      setCommentUsersSub(filterChekedCommentUsersSub);
    })
    


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url, result, refreh]);

  const SendCommentHandler = async (event) => {
    let data = new Date();
    const d = new Date(data);
    const dataCommentoriginal = {
        moment: new Intl.DateTimeFormat("fa-IR").format(d),
      id_Comment: uuidv4(),
      id_user: isLogin && userInfo.user.userid,
      name_user: isLogin && userInfo.user.username,
      avatar: avatar,
      comment: InputQuestion,
      type_chat: "اصلی",
    };


    await fetch(
      `http://localhost:4000/v1/user/insertchat/${userInfo.user.userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataCommentoriginal),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        const Toast = Swal.mixin({
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 7000,
          timerProgressBar: true,
          background: "#D6A2E8",
        });
        isLogin &&
          userInfo.user.role !== "admin" &&
          Toast.fire({
            icon: "info",
            title: result.message,
          });
        setResult(result.message);
        setRefresh((prev) => !prev);
      });
  };

  const SendReplyComment = async (id_Comment, user_name, comment) => {
    const { value: text } = await Swal.fire({
      titleText: `در جواب ${user_name}`,
      input: "textarea",
      inputLabel: comment,
      inputPlaceholder: "پیغام خود را اینجا بنوسید .........",
      width: "50%",
      inputAutoTrim: true,
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (text) {
      let data = new Date();
      const d = new Date(data);
      const dataCommentReplay = {
        moment: new Intl.DateTimeFormat("fa-IR").format(d),
        id_Comment: uuidv4(),
        id_user: isLogin && userInfo.user.userid,
        name_user: isLogin && userInfo.user.username,
        avatar: avatar,
        comment: text,
        type_chat: "فرعی",
        id_CommentOrginal: id_Comment,
        replayTo: user_name,
        replayComment: comment,
      };
      await fetch(
        `http://localhost:4000/v1/user/insertchat/${userInfo.user.userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataCommentReplay),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          const Toast = Swal.mixin({
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 7000,
            timerProgressBar: true,
            background: "#D6A2E8",
          });
          isLogin &&
            Toast.fire({
              icon: "info",
              title: result.message,
            });
          setResult(result.message);
          setRefresh((prev) => !prev);
        });
    }
  };

const RemoveHandler= async(id_Box ,id_user) => {
    let dataDeleted={
        id_Box,
        id_user
       }
    Swal.fire({
        title: ' مطمئنی؟؟؟؟؟',
        text: "میخوای پیغام حذف کنی!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'اره, حذف کن !',
        cancelButtonText:'بیخیال'
        
      }).then(async(result) => {
        if (result.isConfirmed) {

            await fetch(
                `http://localhost:4000/v1/user/removecommentchat`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(dataDeleted),
                }
              )
                .then((res) => res.json())
                .then((result) => {
                    setRefresh(prev=>!prev)
                    Swal.fire(
                    result.message
                    )

                })


        }
      })
}


  return (
    
    <div className="row flex-column justify-content-start align-items-center mt-5 pt-5   " style={{backgroundColor:'rgba(255, 255, 255,0.40)'}}>


    <div className="col-12 overflow-scroll  h-50  p-3 rounded-5" style={{backgroundColor:'rgba(236, 204, 104,.10)'}}>
      {chatUsersMain.map((main) => (
        <div className="p-2 m-3 pt-2 " key={main.id_Comment}>
          <CardComment
            {...main}
            getDataHandelr={SendReplyComment}
            id_coment={main.id_Comment}
            id_Box={main.id_Comment}
            RemoveHandler={RemoveHandler}
            numberReplay={
              chatUsersSub.filter(
                (sub) => sub.id_CommentOrginal === main.id_Comment
              ).length
            }
            type="main"
          >
            {chatUsersSub.map(
              (sub) =>
                sub.id_CommentOrginal === main.id_Comment && (
                  <CardComment
                    key={sub.id_Comment}
                    {...sub}
                    id_coment={main.id_Comment}
                    id_Box={sub.id_Comment}
                    getDataHandelr={SendReplyComment}
                    RemoveHandler={RemoveHandler}
                  />
                )
            )}
          </CardComment>
        </div>
      ))}

    </div>



      <div className="col-10 mt-5 mb-5 pb-5">
        <div className="row flex-column justify-content-center align-items-center g-4 ">
          <div className=" col-11 d-flex  justify-content-center align-items-center">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control"
              placeholder="حرف شما"
              value={InputQuestion}
              onChange={(event) => setInputQuestion(event.target.value)}
            ></textarea>
          </div>
          <div className="col-12 d-flex justify-content-center ">
            <button
              className={`btn btn-outline-success fs-3 w-50 ${
                !InputQuestion && "disabled"
              }`}
              onClick={SendCommentHandler}
            >
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
