import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Space, Image } from "antd";
import StarRater from "../StarRater/StarRater";

import "./CourseBox.css";
import CostCourses from "../CostCourses/CostCourses";
export default function CourseBox({
  isSlider,
  CourseImg,
  CourseTitel,
  CourseTeacher,
  CourseUSer,
  CoursePrice,
  CourseDiscount = 1,
  section,
  periodtime,
  courselevel,
  status,
  CourseLinK,
  type,
  id,
}) {
  const [messageRate, setMessageRate] = useState("");
  return (
    <div className={isSlider ? "SLIDER  m-3" : "col-12 m-3"}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Badge.Ribbon
          color={CourseDiscount ? "gold" : "cyan"}
          className="fs-4 "
          text={`تخفیف ${CourseDiscount} %`}
        >
          <div className="row flex-column align-items-center justify-content-center border shadow shadow-lg m-2 course-box mb-5">
            <div className="col d-flex align-items-center justify-content-center mt-2 position-relative imagCoursesBox ">
              <div className="screenCoursesBox position-absolute justify-content-evenly align-items-center ">
                <span className="text-decoration-none text-center text-white m-3 fs-5">
                  <i className="fa fa-cube fs-5 text-warning"></i> :{" "}
                  {section === "skill"
                    ? "مهارت"
                    : section === "frontend"
                    ? "فرانت اند"
                    : section === "backend"
                    ? "بک اند"
                    : "امنیت"}
                </span>
                <span className="text-decoration-none text-center text-white m-3 fs-5">
                  <i className="fa fa-cube fs-5 text-warning"></i> :{" "}
                  {courselevel}
                </span>
                <span className="text-decoration-none text-center text-white m-3 fs-5">
                  <i className="fa fa-cube fs-5 text-warning"></i> : {status}
                </span>
                <span className="text-decoration-none text-center text-white m-3 fs-5">
                  <i className="fa fa-clock-o fs-5 text-warning"></i> :{" "}
                  {periodtime}
                </span>
              </div>
              <Link
                className="text-decoration-none w-100 rounded"
                to={CourseLinK}
              >
                <Image
                  className="img-thumbnail "
                  width={"100%"}
                  src={CourseImg}
                  preview={false}
                  placeholder={
                    <Image preview={false} src={CourseImg} width={"100%"} />
                  }
                />
              </Link>
            </div>
            <div className="col d-flex align-items-center justify-content-start">
              <Link className="text-decoration-none " to={CourseLinK}>
                <span className="ms-2 text-success fs-4 fw-bolder">
                  {CourseTitel}
                </span>
              </Link>
            </div>
            {type !== "infoCourse" && (
              <div className="col d-flex align-items-center justify-content-end">
                {messageRate && (
                  <span className="fs-6 m-1 text-warning me-3 ">
                    {messageRate}
                  </span>
                )}

                <StarRater id={id} SendMessageRate={setMessageRate} />
              </div>
            )}
            {type !== "infoCourse" && (
              <div className="col d-flex align-items-center justify-content-start">
                <i className="fa fa-book  me-2 ms-2 fs-3 text-warning"></i>
                <Link
                  to={CourseLinK}
                  className="text-decoration-none text-secondary fs-4"
                >
                  {CourseTeacher}
                </Link>
              </div>
            )}

            <div
              className={`col d-flex ${
                type !== "infoCourse"
                  ? "justify-content-between"
                  : "justify-content-end "
              }  align-items-end mb-5`}
            >
              {type !== "infoCourse" ? (
                <div className="mt-5 p-3">
                  <i className="fa fa-users ms-2 fs-3 text-warning me-2"></i>
                  <Link
                    to={CourseLinK}
                    className="text-decoration-none text-secondary fs-4"
                  >
                    {CourseUSer}
                  </Link>
                </div>
              ) : null}
              <div className="d-flex justify-content-end  align-items-end g-0 mt-2 ">
                <CostCourses
                  type={type}
                  CoursePrice={CoursePrice}
                  CourseDiscount={CourseDiscount}
                />
              </div>
            </div>

            {type !== "infoCourse" && (
              <div className="col d-flex justify-content-center mb-3 btn btn-outline-light border-0 w-50 justify-content-end  align-items-center g-0 mt-2  ">
                <Link
                  to={CourseLinK}
                  className=" text-decoration-none text-info fs-4"
                >
                  مشاهده اطلاعات
                  <i className="fa fa-arrow-left ms-3 fs-2 text-info "></i>
                </Link>
              </div>
            )}
          </div>
        </Badge.Ribbon>
      </Space>
    </div>
  );
}
