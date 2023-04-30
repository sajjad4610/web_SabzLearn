import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "antd";
import useContextUser from "../../../ContextApi/UserContextApi";
import UserPurchasedCoursesBox from "../UserPurchasedCoursesBox/UserPurchasedCoursesBox";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Loading from "../../../Components/Loading/Loading";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";

export default function UserPurchasedCourses() {
  const { isLogin, userInfo, isRefresh } = useContext(useContextUser);

  const [CoursesUser, setCoursesUser] = useState([]);
  const [FuLLInfoCourse, setFuLLInfoCourse] = useState([]);
  const [timeOutLoading, setTimeOutLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const onChangePagination = (page, pageSize) => {
    setPage((page - 1) * pageSize);
    setPageSize((page - 1) * pageSize + pageSize);
  };

  const token = localStorage.getItem("user");

  useEffect(() => {
    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setCoursesUser(result.courses);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh, token, isLogin]);
  useEffect(() => {
    isLogin &&   GetServises(GetApi.CourseApi).then(result => {
      if (CoursesUser.length) {
        let FuLLInfoCourse = CoursesUser.flatMap((e) => {
          return result.filter((ee) => ee._id === e.courseId);
        });
        setFuLLInfoCourse(FuLLInfoCourse);
      }
     })
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CoursesUser]);

  return (
    <div className="">
      <div className="mb-5 mt-5 2 ">
        <SectionHeader title="دوره های خریداری شده" />
      </div>
      <div
        className=" p-3 m-3  rounded-4"
        style={{ backgroundColor: "rgba(19, 15, 64,.60)" }}
      >
        <span className="text-white fs-1 mb-5 pb-5  ">{`  تعداد دوره های شما : ${FuLLInfoCourse.length}  عدد`}</span>
        {isLogin ? (
          FuLLInfoCourse.length ? (
            FuLLInfoCourse.slice(page, pageSize).map((e) => (
              <div className="mt-3">
                <UserPurchasedCoursesBox key={e._id} {...e} />
              </div>
            ))
          ) : (
            <>
              {!timeOutLoading ? (
                <Loading
                  setTimeOutLoading={setTimeOutLoading}
                  timeDlay={500}
                  type="dlay"
                />
              ) : (
                <span className="text-center text-secondary fs-1 ">
                  {" "}
                  شما هنوز دوره ای خریداری نکردید
                </span>
              )}
            </>
          )
        ) : null}
        <div
          className="col d-flex justify-content-center align-items-center mt-3 "
          dir="ltr"
        >
          <Pagination
            className="text-bg-warning rounded-3 text-success"
            defaultCurrent={1}
            defaultPageSize={3}
            total={FuLLInfoCourse.length}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </div>
  );
}
