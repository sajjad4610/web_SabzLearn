import React, { useState } from "react";
import CoursesFilter from "../CoursesFilter/CoursesFilter";
import RedderCourse from "../CoursesRender/CoursesRender";
import SortCourses from "../CoursesSort/CoursesSort";

export default function CoursedsMain({ FilterCourseInfoMain }) {
  // eslint-disable-next-line no-unused-vars
  const [Sort, setSort] = useState([false]);
  const [statusFilter, setStatusFilter] = useState(false);
  const [resultFilter, setResultFilter] = useState([]);

  return (
    <div>
      <CoursesFilter
        courses={FilterCourseInfoMain}
        setStatusFilter={setStatusFilter}
        setResultFilter={setResultFilter}
        type="Main"
      />
      <SortCourses
        courses={FilterCourseInfoMain}
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
            : FilterCourseInfoMain
        }
      />
    </div>
  );
}
