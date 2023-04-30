import { Pagination } from "antd";
import React, { useState } from "react";
import CourseBox from "../CourseBox/CourseBox";

export default function RedderCourse({ course }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const onChangePagination = (page, pageSize) => {
    setPage((page - 1) * pageSize);
    setPageSize((page - 1) * pageSize + pageSize);
  };

  return (
    <>
      <div className=" row w-100 justify-content-center align-items-center mt-1 mb-5 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
        {course.length
          ? course.slice(page, pageSize).map((e) => (
              <div className=" col " key={e._id}>
                <CourseBox
                  id={e._id}
                  isSlider="isSlider"
                  CourseImg={e.image}
                  CourseTitel={e.name}
                  CourseTeacher={e.teacher}
                  CourseUSer={e.salesnumber}
                  CoursePrice={e.cost}
                  CourseLinK={e.link}
                  CourseDiscount={e.discount}
                  section={e.section}
                  periodtime={e.periodtime}
                  courselevel={e.courselevel}
                  status={e.status}
                />
              </div>
            ))
          : ""}
      </div>

      <div className="row  justify-content-center align-items-center mb-5">
        <div
          className="col d-flex justify-content-center align-items-center "
          dir="ltr"
        >
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            total={course.length}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </>
  );
}
