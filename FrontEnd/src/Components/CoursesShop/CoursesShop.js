import React, { useState } from "react";

import RedderCourse from "../CoursesRender/CoursesRender";

import "./CoursesShop.css";
import SortCourses from "../CoursesSort/CoursesSort";
import CoursesFilter from "../CoursesFilter/CoursesFilter";

export default function CoursesShop({ FilterCourseInfoShop }) {
  // eslint-disable-next-line no-unused-vars
  const [Sort, setSort] = useState([false]);
  const [statusFilter, setStatusFilter] = useState(false);
  const [resultFilter, setResultFilter] = useState([]);

  return (
    <>
      <CoursesFilter
        courses={FilterCourseInfoShop}
        setStatusFilter={setStatusFilter}
        setResultFilter={setResultFilter}
      />

      <SortCourses
        courses={FilterCourseInfoShop}
        cousesFilter={resultFilter}
        setSort={setSort}
      />

      {statusFilter && !resultFilter.length && (
        <div className="row justify-content-center w-100 m-5">
          <span className="fs-2 fw-bolder text-dark text-center ">
            {" "}
            هیچ نتیجه ای یافت نشد!!!
          </span>
        </div>
      )}
      <RedderCourse
        course={
          statusFilter
            ? !resultFilter.length
              ? ""
              : resultFilter
            : FilterCourseInfoShop
        }
      />
    </>
  );
}
