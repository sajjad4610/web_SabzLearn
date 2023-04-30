import React, { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";

import useContextUser from "../../ContextApi/UserContextApi";
import Swal from "sweetalert2";
import CardQuestion from "../CardQuestion/CardQuestion";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

export default function CourseQuestionBox({ FilterCourseInfo }) {
  let Url = useLocation();
  const { section } = useParams();

  const { isLogin, userInfo } = useContext(useContextUser);

  const [InputQuestion, setInputQuestion] = useState("");
  const [CourseInfo, setCourseInfo] = useState({});
  const [questionCourseMain, setquestionCourseMain] = useState([]);
  const [questionCourseSub, setquestionCourseSub] = useState([]);
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

      let questionCourseMain = filterCoursesLink.flatMap((e) => e.question);

      let filterChekedquestionCourse = questionCourseMain.filter(
        (e) => e.Stutus_question === "تایید شده"
      );
      let filterChekedquestionCourseMain = filterChekedquestionCourse.filter(
        (e) => e.type_question === "اصلی"
      );
      let filterChekedquestionCourseSub = filterChekedquestionCourse.filter(
        (e) => e.type_question === "فرعی"
      );

      setquestionCourseMain(filterChekedquestionCourseMain);
      setquestionCourseSub(filterChekedquestionCourseSub);
    });

    isLogin &&
    
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((alluser) => {
          setAvatar(alluser.avatar);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url, result, refreh]);

  const SendquestionHandler = async (event) => {
    let dataTime = moment().format("LLL");
    let data = new Date();
    const d = new Date(data);
    const dataquestionoriginal = {
      avatar: avatar,
      time: dataTime,
      id_question: `${uuidv4()}_${CourseInfo._id}`,
      id_course: CourseInfo._id,
      id_user: isLogin && userInfo.user.userid,
      name_user: isLogin && userInfo.user.username,
      name_course: CourseInfo.name,
      question: InputQuestion,
      type_question: "اصلی",
      Stutus_question:
        isLogin && userInfo.user.role === "admin"
          ? "تایید شده"
          : "در انتظار تایید",
      moment: new Intl.DateTimeFormat("fa-IR").format(d),
    };

    await fetch(
      `http://localhost:4000/v1/course/setquestioncourse/${CourseInfo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataquestionoriginal),
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

  const SendReplyquestion = async (id_question, user_name, replayquestion) => {
    let dataTime = moment().format("LLL");
    let data = new Date();
    const d = new Date(data);
    const { value: text } = await Swal.fire({
      titleText: `در جواب ${user_name}`,
      input: "textarea",
      inputLabel: replayquestion,
      inputPlaceholder: "پیغام خود را اینجا بنوسید .........",

      width: "50%",
      inputAutoTrim: true,
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (text) {
      const dataquestionReplay = {
        time: dataTime,
        id_question: `${uuidv4()}_${CourseInfo._id}`,
        id_course: CourseInfo._id,
        id_user: isLogin && userInfo.user.userid,
        name_user: isLogin && userInfo.user.username,
        name_course: CourseInfo.name,
        question: text,
        type_question: "فرعی",
        Stutus_question:
          isLogin && userInfo.user.role === "admin"
            ? "تایید شده"
            : "در انتظار تایید",
        id_questionOrginal: id_question,
        replayTo: user_name,
        replayquestion: replayquestion,
        avatar: avatar,
        moment: new Intl.DateTimeFormat("fa-IR").format(d),
      };
      await fetch(
        `http://localhost:4000/v1/course/setquestioncourse/${CourseInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataquestionReplay),
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

  return (
    <div className="row flex-column justify-content-center align-items-start  w-100">
      {questionCourseMain.map((main) => (
        <div className="p-2 m-3 pt-2 " key={main.id_question}>
          <CardQuestion
            {...main}
            getDataHandelr={SendReplyquestion}
            id_coment={main.id_question}
            numberReplay={
              questionCourseSub.filter(
                (sub) => sub.id_questionOrginal === main.id_question
              ).length
            }
            type="main"
          >
            {questionCourseSub.map(
              (sub) =>
                sub.id_questionOrginal === main.id_question && (
                  <CardQuestion
                    key={sub.id_question}
                    {...sub}
                    id_coment={main.id_question}
                    getDataHandelr={SendReplyquestion}
                  />
                )
            )}
          </CardQuestion>
        </div>
      ))}

      <div className="col">
        <div className="row flex-column justify-content-center align-items-start g-4 ">
          <div className="col">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control"
              placeholder="سوال شما"
              value={InputQuestion}
              onChange={(event) => setInputQuestion(event.target.value)}
            ></textarea>
          </div>
          <div className="col-12 d-flex justify-content-center ">
            <button
              className={`btn btn-outline-success fs-3 w-50 ${
                !InputQuestion && "disabled"
              }`}
              onClick={SendquestionHandler}
            >
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
