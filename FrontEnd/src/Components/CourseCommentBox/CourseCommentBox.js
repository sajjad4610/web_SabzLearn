import React, { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";

import useContextUser from "../../ContextApi/UserContextApi";
import Swal from "sweetalert2";
import CardComment from "../CardComment/CardComment";
import GetServises from "../../Servises/GetServises";
import { GetApi } from "../../Servises/Api";

export default function CommentBox({ FilterCourseInfo }) {
  let Url = useLocation();
  const { section } = useParams();

  const { isLogin, userInfo } = useContext(useContextUser);

  const [InputQuestion, setInputQuestion] = useState("");
  const [CourseInfo, setCourseInfo] = useState({});
  const [commentCourseMain, setCommentCourseMain] = useState([]);
  const [commentCourseSub, setCommentCourseSub] = useState([]);
  const [result, setResult] = useState("");
  const [refreh, setRefresh] = useState(false);
  const [avatar, setAvatar] = useState("");

  const token = localStorage.getItem("user");

  useEffect(() => {
    GetServises(GetApi.CourseApi).then((result) => {
      let filterCoursesSection = result.filter((e) => {
        return e.section === section;
      });

      let filterCoursesLink = filterCoursesSection.filter((e) => {
        return e.link === Url.pathname;
      });
      setCourseInfo(filterCoursesLink[0]);

      let commentCourseMain = filterCoursesLink.flatMap((e) => e.comment);

      let filterChekedCommentCourse = commentCourseMain.filter(
        (e) => e.Stutus_comment === "تایید شده"
      );
      let filterChekedCommentCourseMain = filterChekedCommentCourse.filter(
        (e) => e.type_comment === "اصلی"
      );
      let filterChekedCommentCourseSub = filterChekedCommentCourse.filter(
        (e) => e.type_comment === "فرعی"
      );

      setCommentCourseMain(filterChekedCommentCourseMain);
      setCommentCourseSub(filterChekedCommentCourseSub);
    });

    isLogin &&
    GetServises(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`).then((alluser) => {
      setAvatar(alluser.avatar);
    });
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url, result, refreh]);

  const SendCommentHandler = async (event) => {
    let data = new Date();
    const d = new Date(data);
    const dataCommentoriginal = {
      moment: new Intl.DateTimeFormat("fa-IR").format(d),
      id_Comment: `${uuidv4()}_${CourseInfo._id}`,
      id_course: CourseInfo._id,
      id_user: isLogin && userInfo.user.userid,
      name_user: isLogin && userInfo.user.username,
      avatar: avatar,
      name_course: CourseInfo.name,
      comment: InputQuestion,
      type_comment: "اصلی",

      Stutus_comment:
        isLogin && userInfo.user.role === "admin"
          ? "تایید شده"
          : "در انتظار تایید",
    };

    await fetch(
      `http://localhost:4000/v1/course/setcommentcourse/${CourseInfo._id}`,
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
    let data = new Date();
    const d = new Date(data);

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
      const dataCommentReplay = {
        moment: new Intl.DateTimeFormat("fa-IR").format(d),
        id_Comment: `${uuidv4()}_${CourseInfo._id}`,
        id_course: CourseInfo._id,
        id_user: isLogin && userInfo.user.userid,
        name_user: isLogin && userInfo.user.username,
        avatar: avatar,
        name_course: CourseInfo.name,
        comment: text,
        type_comment: "فرعی",
        Stutus_comment:
          isLogin && userInfo.user.role === "admin"
            ? "تایید شده"
            : "در انتظار تایید",
        id_CommentOrginal: id_Comment,
        replayTo: user_name,
        replayComment: comment,
      };
      await fetch(
        `http://localhost:4000/v1/course/setcommentcourse/${CourseInfo._id}`,
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
            userInfo.user.role !== "admin" &&
            Toast.fire({
              icon: "info",
              title: result.message,
            });
          setResult(result.message);
          setRefresh((prev) => !prev);
        });
    }
  };

  const RemoveHandler = async (id_Box, id_user) => {
    let dataDeleted = {
      id_Box,
      id_user,
    };
    Swal.fire({
      title: " مطمئنی؟؟؟؟؟",
      text: "میخوای پیغام حذف کنی!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "اره, حذف کن !",
      cancelButtonText: "بیخیال",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(
          `http://localhost:4000/v1/course/removecomment/${id_Box}/false`,
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
            setRefresh((prev) => !prev);

            Swal.fire(result.message);
          });
      }
    });
  };
  return (
    <div className="row flex-column justify-content-center align-items-start  w-100">
      {commentCourseMain.map((main) => (
        <div className="p-2 m-3 pt-2 " key={main.id_Comment}>
          <CardComment
            {...main}
            getDataHandelr={SendReplyComment}
            id_coment={main.id_Comment}
            id_Box={main.id_Comment}
            numberReplay={
              commentCourseSub.filter(
                (sub) => sub.id_CommentOrginal === main.id_Comment
              ).length
            }
            RemoveHandler={RemoveHandler}
            type="main"
          >
            {commentCourseSub.map(
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

      <div className="col ">
        <div className="row flex-column justify-content-center align-items-center g-4 ">
          <div className="col-11 d-flex  justify-content-center align-items-center">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control"
              placeholder="دیدگاه شما"
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
