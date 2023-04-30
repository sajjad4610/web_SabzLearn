import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../Components/DataTable/DataTable";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/SchemaBillUserPanel/SchemaBillUserPanel";
import UserPanelContextApi from "../../../ContextApi/UserPanelContextApi";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Loading from "../../../Components/Loading/Loading";

export default function UserBill() {
  const [CourseUser, setCourseUser] = useState([]);
  const [timeOutLoading, setTimeOutLoading] = useState(false);
  let {  isLogin, userInfo } = useContext(UserPanelContextApi);
  const token = localStorage.getItem("user");

  useEffect(() => {
  
      fetch(
        `http://localhost:4000/v1/user/onegetUserCoure/${userInfo.user.userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(async(result) => {
         setCourseUser(result);
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" p-1 mt-5">
      <div className=" mb-5">
        <SectionHeader title="صورت حساب دوره های خریداری شده" />
      </div>
      {isLogin ? CourseUser.length ? (
        <DataTable
          columns={[...columns]}
          selectBox={[...selectBoxSearch]}
          apiData={`http://localhost:4000/v1/user/onegetUserCoure/${userInfo.user.userid}`}
        ></DataTable>
      ) : (
        <>
       
        {!timeOutLoading ? <Loading setTimeOutLoading={setTimeOutLoading} timeDlay={500} type="dlay"/>: <span className="text-center text-secondary fs-1 ">
          {" "}
          شما هنوز دوره ای خریداری نکردید
        </span>}
        </>
      ) : null}
    </div>
  );
}
