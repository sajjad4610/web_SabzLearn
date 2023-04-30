import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import useContextUser from "../../ContextApi/UserContextApi";
import Loading from "../Loading/Loading";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

const { Panel } = Collapse;
export default function CoursesPlayer({ FilterCourseInfoShow }) {
  const { isLogin, userInfo } = useContext(useContextUser);

  const [checkCourseUser, setCheckCourseUser] = useState([]);
  const [topic, setTopic] = useState([]);
  const [info, setInfo] = useState([]);
  const token = localStorage.getItem("user");
  let Url = useLocation();
  const Params = useParams();

  const { section, name = Params["*"] } = Params;

  useEffect(() => {
    
    GetServises(GetApi.CourseApi).then((result) => {
      let filterCoursesSection = result.filter((e) => {
        return e.section === section;
      });
      let filtercoursesInfo = filterCoursesSection
        .flatMap((e) => {
          if (e._id === FilterCourseInfoShow[0].idCourse) {
            return e.Coursetopics;
          } else {
            return false;
          }
        })
        .filter((e) => e !== false);
      let getTopic = filtercoursesInfo.filter((e) => e.nameInfo === "سرفصل");
      let getInfo = filtercoursesInfo.filter((e) => e.nameInfo !== "سرفصل");
      setTopic(getTopic);
      setInfo(getInfo);

      let filterCourses = result.filter((e) => {
        return (
          e.link ===
          Url.pathname.substring(0, Url.pathname.indexOf(name) + name.length)
        );
      });
      return filterCourses;
    });

    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          let filtercheckCourseUser = result.courses.filter(
            (e) => e.courseId === FilterCourseInfoShow[0].idCourse
          );
          setCheckCourseUser(filtercheckCourseUser);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url]);
  return (
    <>
      {checkCourseUser.length ? (
        <div className="mt-5">
          <div className="row justify-content-center  ">
            <div className="col-10  ">
              <video
                src={FilterCourseInfoShow[0].infoUrl}
                controls
                className="img-thumbnail w-100 rounded-4"
                poster={FilterCourseInfoShow[0].CourseImage}
              ></video>
            </div>
            <div className="col-10  ">
              <div
                className="row m-2 justify-content-center mb-4 rounded-5 p-3"
                style={{ backgroundColor: "ActiveCaption" }}
              >
                <div className="col d-flex justify-content-center ">
                  <a
                    className="text-decoration-none text-white"
                    href={FilterCourseInfoShow[0].infoUrl}
                  >
                    {" "}
                    دانلود ویدیو
                  </a>
                </div>
              </div>
            </div>

            <div className="col-10 mb-5">
              <Collapse expandIconPosition={"end"}>
                {topic.map((tpc) => {
                  return (
                    <Panel
                      className=" fs-4  fw-bold"
                      header={tpc.topic}
                      key={tpc.id_topic}
                    >
                      {info.map(
                        (ifo) =>
                          ifo.topic === tpc.topic && (
                            <div
                              className="row justify-content-between align-items-center"
                              key={ifo.id_topic}
                            >
                              <div className="col  d-flex justify-content-start align-items-center">
                                <Link
                                  to={ifo.id_topic}
                                  className="fs-4 p-2 border-bottom fw-normal "
                                >
                                  {ifo.nameInfo}
                                </Link>
                              </div>
                            </div>
                          )
                      )}
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
