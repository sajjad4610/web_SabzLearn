/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaAddCourseUser/schemaAddCourseUser";
import DataTable from "../../DataTable/DataTable";
import { Select } from "antd";
import GetServises from "../../../Servises/GetServises";
import { GetApi } from "../../../Servises/Api";

export default function AddUserCourse({ refreshByTabs }) {
  const [inputSelectCourse, setinputSelectCourse] = useState("");
  const [selectUserEmail, setSelectUserEmail] = useState("");
  const [allCourse, setAllcourses] = useState([]);
  const [OneUser, setOneUser] = useState([]);
  const [All, setAll] = useState([]);
  const [validForm, setVlidForm] = useState("");
  const [refresh, setRafresh] = useState(false);

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };

  const token = localStorage.getItem("user");
  useEffect(() => {
    GetServises(GetApi.CourseApi)
      .then((result) => {
        setAllcourses(result);
        let getOneCourse = result.filter((e) => e.name === inputSelectCourse);
        return getOneCourse;
      })

      .then(async (getOneCourse) => {
        getOneCourse.length &&
          (await GetServises(GetApi.UsersApi).then((alluser) => {
            let UserHaveNOTCourse = alluser.filter(
              (e) =>
                !e.courses.find((ee) => ee.courseName === inputSelectCourse)
            );
            setAll(UserHaveNOTCourse);

            let onuser = UserHaveNOTCourse.filter(
              (e) => e.email === selectUserEmail
            );
            setOneUser(onuser);
          }));
      });
  }, [inputSelectCourse, refreshByTabs, selectUserEmail, validForm, refresh]);

  const AddCoureseHandler = async (event) => {
    let dataTime = moment().format();

    if (selectUserEmail && inputSelectCourse) {
      const filtercourse = allCourse.filter((e) => {
        return e.name === inputSelectCourse;
      });
      const dataCoursesAdd = {
        courseId: filtercourse[0]._id,
        courseName: filtercourse[0].name,
        courseCost: filtercourse[0].cost,
        courseDiscount: filtercourse[0].discount,
        courseStatus: filtercourse[0].status,
        courseLink: filtercourse[0].link,
        selectUserEmail,
        dataTime,
        courseImg: filtercourse[0].image,
        DiscountCodePercent: 0,
        userId: OneUser.length ? OneUser[0]._id : "",
        userName: OneUser.length ? OneUser[0].username : "",
        idAddCourse: `${OneUser[0]._id}_${filtercourse[0]._id}`,
      };

      await fetch("http://localhost:4000/v1/user/addcousesUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataCoursesAdd),
      })
        .then((res) => res.json())
        .then((result) => {
          ToastMessage(result.message);
          setVlidForm(result.message);
          setinputSelectCourse("");
          setSelectUserEmail("");
        });

      await fetch(
        `http://localhost:4000/v1/course/SalesNumber/add/${filtercourse[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ salesnumberdata: 1 }),
        }
      )
        .then((res) => res.json())
        .then((result) => {});
    } else {
    }
  };

  return (
    <div>
      <div className="row justify-content-between align-items-center row-cols-1 row-cols-md-2">
        <div className="col  d-flex flex-column justify-content-center ">
          <label htmlFor="Corses" className="text-info fs-3 ">
            دورها :
          </label>
          <Select
            id="Corses"
            allowClear={true}
            className="border-0 border-bottom"
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="لطفا یکی ار دورها را انتخاب کنید"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            onChange={(value) => setinputSelectCourse(value)}
            options={allCourse.map((label) => ({
              label: label.name,
              value: label.name,
            }))}
            value={inputSelectCourse}
          />
        </div>
        <div className="col d-flex justify-content-center  align-items-center   ">
          <div className="row flex-column justify-content-center align-items-center g-0 w-100">
            <div className="col  d-flex flex-column justify-content-center ">
              <label htmlFor="user" className="text-info fs-3 ">
                کاربرها :
              </label>

              <Select
                id="user"
                className="border-0 border-bottom"
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder={
                  inputSelectCourse
                    ? "کاربر را انتخاب کنید"
                    : "لطفا اول یکی ار دورها را انتخاب کنید"
                }
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setSelectUserEmail(value)}
                options={All.map((label) => ({
                  label: label.email,
                  value: label.email,
                }))}
                value={selectUserEmail}
                allowClear={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <button
          className={
            All.length && inputSelectCourse && selectUserEmail
              ? "btn btn-outline-info fs-3 m-5 w-50"
              : "btn btn-outline-info fs-3 m-5 w-50 disabled"
          }
          onClick={AddCoureseHandler}
        >
          <i className="fa fa-send fs-4  me-3 "></i> ارسال
        </button>
      </div>
      <DataTable
        refreshTrash={refresh}
        refreshTrashHandler={refreshTrashHandler}
        refreshByTabs={refreshByTabs}
        refreshByValidform={validForm}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/user/allgetUserCoure"
        apiRemove={"http://localhost:4000/v1/user/removeSimilarcousesUser"}
        methodRemove={"put"}
        messageTrash="آیا از حذف این دوره مطمئن هستید؟"
      ></DataTable>
    </div>
  );
}
