import { Breadcrumb, Select } from "antd";
import React, { useContext, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {
  department,
  priority,
  type,
} from "../../Schema/SchemaTiket/SchemaTiket";
import DatePickerRengData from "../DatePickerRengData/DatePickerRengData";
import useContextUser from "../../ContextApi/UserContextApi";
import { Fab } from "@mui/material";

export default function FilterTiket({ allTiket, setFilterTikets, Course }) {
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [StatusFilter, setStatusFilter] = useState(false);
  const [Department, setDepartment] = useState("");
  const [Type, setType] = useState("");
  const [Priority, setPriority] = useState("");
  const [Response, setResponse] = useState("");
  const [SelectCourse, setSelectCourse] = useState("");
  const [GetDatePickerRengData, setGetDatePickerRengData] = useState([]);
  const [resultFilter, setResultFilter] = useState([]);

  const { userInfo } = useContext(useContextUser);
  let DatePickerReng = GetDatePickerRengData.flatMap((date) => date.format());

  const showFilterformHandler = () => {
    setShowFilterForm((prev) => !prev);
  };

  const DepartmentHandler = (value) => {
    setType("");
    setSelectCourse("");
    setDepartment(value);
  };
  const searchTiketHandler = () => {
    let arrayFilter = [];
    let TiketMain = allTiket.filter((main) => main.post_type === "Main");
    let TiketSub = allTiket.filter((main) => main.post_type === "Sub");

    let filterDepartmentMain = TiketMain.filter(
      (e) => e.department === Department
    );
    let filterTypeMain = TiketMain.filter((e) => e.type === Type);
    let filterPriorityMain = TiketMain.filter((e) => e.level === Priority);
    let filterSelectCourseMain = TiketMain.filter(
      (e) => e.cours_name && e.cours_name === SelectCourse
    );
    let filterSelectResponse = TiketMain.map((main) => {
      if (Response === "پاسخ داده ها" && Response) {
        return TiketSub.filter((sub) => sub.main_id === main._id).length
          ? main
          : false;
      } else if (Response === "بدون پاسخ ها" && Response) {
        return !TiketSub.filter((sub) => sub.main_id === main._id).length
          ? main
          : false;
      } else {
        return false;
      }
    }).filter((e) => e !== false);


    let filterMomentMain = DatePickerReng.flatMap((e) => {
      return allTiket.filter(
        (ee) => ee.post_type === "Main" && ee.moment === e
      );
    });


    arrayFilter.push(
      Department
        ? filterDepartmentMain.length
          ? filterDepartmentMain
          : []
        : false,
      Type ? (filterTypeMain.length ? filterTypeMain : []) : false,
      Priority ? (filterPriorityMain.length ? filterPriorityMain : []) : false,
      SelectCourse
        ? filterSelectCourseMain.length
          ? filterSelectCourseMain
          : []
        : false,
      Response
        ? filterSelectResponse.length
          ? filterSelectResponse
          : []
        : false,
      DatePickerReng.length
        ? filterMomentMain.length
          ? filterMomentMain
          : []
        : false
    );
 

    arrayFilter = arrayFilter.filter((e) => e !== false);

    let result =
      arrayFilter.length > 0 &&
      arrayFilter.shift().filter((next) => {
        return arrayFilter.every((prev) => {
          return prev.indexOf(next) !== -1;
        });
      });

    let filterMainTiketOnUser = result.filter(
      (e) => e.post_type === "Main" && e.sender_id === userInfo.user.userid
    );
    setFilterTikets(
      userInfo.user.role === "admin" ? result : filterMainTiketOnUser
    );
    setResultFilter(
      userInfo.user.role === "admin" ? result : filterMainTiketOnUser
    );
    setStatusFilter(true);
    setTimeout(() => {
      setStatusFilter(false);
    }, 5000);
  };

  const RemoveFilterHandler = () => {
    setStatusFilter(false);
    setDepartment("");
    setType("");
    setPriority("");
    setResponse("");
    setSelectCourse("");
    setGetDatePickerRengData([]);
    setResultFilter([]);
    setFilterTikets([]);
    DatePickerReng = [];
  };
  return (
    <>
      <Fab
        color="warning"
        title="فیلتر"
        size="small"
        aria-label="edit"
        onClick={showFilterformHandler}
        sx={{ zIndex: 10, marginRight: "1rem" }}
      >
        <FilterAltIcon />
      </Fab>
      {showFilterForm ? (
        <div
          className=" mt-5 p-2 border rounded-5 shadow "
          style={{ backgroundColor: "rgba(241, 242, 246,1.0)" }}
        >
          <div className="row justify-content-between  align-items-baseline  ">
            <div className="col">
              <Breadcrumb className="fs-3 m-2" separator="">
                <Breadcrumb.Item className=" fs-2 text-warning m-2">
                  فیلتر{" "}
                </Breadcrumb.Item>
                <Breadcrumb.Separator>:</Breadcrumb.Separator>
                {Department && (
                  <>
                    <Breadcrumb.Item>{Department}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {Type && (
                  <>
                    <Breadcrumb.Item>{Type}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {Priority && (
                  <>
                    <Breadcrumb.Item>{Priority}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {Response && (
                  <>
                    <Breadcrumb.Item>{Response}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {SelectCourse && (
                  <>
                    <Breadcrumb.Item>{SelectCourse}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {DatePickerReng.length ? (
                  <>
                    <Breadcrumb.Item>تاریخ</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                ) : (
                  ""
                )}
              </Breadcrumb>
            </div>

            <div className="col-1 d-flex p-3 justify-content-end">
              <i
                className="fa fa-trash fs-1 border-0 btn btn-outline-warning"
                title="خذف فیلتر"
                onClick={RemoveFilterHandler}
              ></i>
            </div>
          </div>

          <div className="row m-3 pb-3">
            <div className="col d-flex justify-content-center position-relative">
              {StatusFilter ? (
                !resultFilter.length ? (
                  <span className=" text-danger fs-3 position-absolute ">
                    نتیجه ای یافت نشد
                  </span>
                ) : (
                  <span className=" text-end text-success fs-3  position-absolute">{`${resultFilter.length} مورد یافت شد `}</span>
                )
              ) : null}
            </div>
          </div>

          <div className="row justify-content-evenly align-items-center p-5 pt-3 m-0 mt-0 row-cols-1 row-cols-lg-4">
            <div className="col">
              <label htmlFor="" className="fs-5 m-2 text-info">
                دپارتمان :
              </label>

              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="دپارتمان را مشخص کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={DepartmentHandler}
                options={department.map((label) => ({
                  label: label.value,
                  value: label.value,
                }))}
                allowClear={true}
                value={Department}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="fs-5 m-2 text-info">
                نوع :
              </label>

              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder=" نوع را مشخص کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setType(value)}
                options={
                  Department
                    ? type
                        .filter((e) => e.type === Department)
                        .map((label) => ({
                          label: label.value,
                          value: label.value,
                        }))
                    : null
                }
                allowClear={true}
                value={Type}
              />
            </div>
            {Type === "پشتیبانی دوره ها" ? (
              <div className="col">
                <>
                  <label htmlFor="" className="fs-5 m-2 text-info">
                    دوره ها :
                  </label>

                  <Select
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
                    onChange={(value) => setSelectCourse(value)}
                    options={Course.map((label) => ({
                      label: label.name,
                      value: label.name,
                    }))}
                    allowClear={true}
                    value={SelectCourse}
                  />
                </>
              </div>
            ) : null}
            <div className="col">
              <label htmlFor="" className="fs-5 m-2 text-info">
                وضعیت پاسخ :
              </label>

              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder=" وضعیت پاسخ را مشخص کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setResponse(value)}
                options={["پاسخ داده ها", "بدون پاسخ ها"].map((label) => ({
                  label: label,
                  value: label,
                }))}
                allowClear={true}
                value={Response}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="fs-5 m-2 text-info">
                اولویت :
              </label>

              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="اولویت را مشخص کنید"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(value) => setPriority(value)}
                options={priority.map((label) => ({
                  label: label,
                  value: label,
                }))}
                allowClear={true}
                value={Priority}
              />
            </div>
          </div>
          <div className="row pb-5">
          <div className="col">

            <DatePickerRengData
              setGetDatePickerRengData={setGetDatePickerRengData}
            />
          </div>
          </div>
          <div className="row justify-content-center ">
            <button
              className="btn btn-outline-info fs-3 m-4 w-50"
              onClick={searchTiketHandler}
            >
              {" "}
              جستجو
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
