import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";

import useContextUser from "../../ContextApi/UserContextApi";
import CourseCommentBox from "../CourseCommentBox/CourseCommentBox";
import CourseQuestionBox from "../CourseQuestionBox/CourseQuestionBox";

export default function CourseComment({ FilterCourseInfo, checkCourseUser }) {
  const { isLogin } = useContext(useContextUser);


  return (
    <div className="m-2 mt-5 mb-5">
      <Tabs
        defaultActiveKey="دیدگاه شما"
        id="uncontrolled-tab-example"
        className="mb-3 "
      >
        <Tab eventKey="دیدگاه شما" title="دیدگاه شما">
          {isLogin ? (
            <CourseCommentBox />
          ) : (
            <div className="d-flex justify-content-center  p-4 m-2">
              <span className="text-center fs-2 text-warning">
                لطفا اول وارد شوید
              </span>
            </div>
          )}
        </Tab>

        <Tab eventKey="پرسش و پاسخ" title="پرسش و پاسخ">
          {isLogin ? (
            !checkCourseUser.length ? (
              <div className="d-flex justify-content-center  p-4 m-2">
                <span className="text-center fs-2 text-danger">
                  لطفا اول در دوره ثبت نام کنید
                </span>
              </div>
            ) : (
              <CourseQuestionBox />
            )
          ) : (
            <div className="d-flex justify-content-center  p-4 m-2">
              <span className="text-center fs-2 text-warning">
                لطفا اول وارد شوید
              </span>
            </div>
          )}
        </Tab>
        <Tab eventKey="اطلاعیه" title="اطلاعیه"></Tab>
      </Tabs>
    </div>
  );
}
