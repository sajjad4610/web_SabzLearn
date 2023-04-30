import { Breadcrumb } from "antd";
import React, { useReducer, useState } from "react";
import { Fab } from "@mui/material";

import SelectorFormCouses from "../Admin/FromCourses/SelectorFormCouses/SelectorFormCouses";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function CoursesFilter({
  courses,
  setStatusFilter,
  setResultFilter,
  type
}) {
  const [showFilterForm, setShowFilterForm] = useState(false);

  const [cousesInput, dispatche] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "InputValueName": {
          return {
            ...state,
            courseName: action.ValueName,
          };
        }

        case "InputValueTeacher": {
          return {
            ...state,
            courseTeacher: action.ValueTeacher,
          };
        }

        case "InputValueCost": {
          return {
            ...state,
            courseCost: action.ValueCost,
          };
        }

        case "InputValueSection": {
          return {
            ...state,
            courseSection: action.ValueSection,
          };
        }
        case "InputValueCourselevel": {
          return {
            ...state,
            courselevel: action.ValueCourselevel,
          };
        }
        case "InputValueStatus": {
          return {
            ...state,
            courseStatus: action.ValueStatus,
          };
        }
        case "InputValueTypeCost": {
          return {
            ...state,
            courseTypeCost: action.ValueTypeCost,
          };
        }

        default: {
          return "";
        }
      }
    },

    {
      courseName: "",
      courseTeacher: "",
      courseCost: undefined,
      courseSection: "",
      courselevel: "",
      courseStatus: "",
      courseTypeCost: "",
    }
  );

  const showFilterformHandler = () => {
    setShowFilterForm((prev) => !prev);
  };

  const inputValueStatusHandler = (event) => {
    dispatche({
      type: "InputValueStatus",
      ValueStatus: event.target.value,
    });
  };
  const inputValueSectionHandler = (event) => {
    dispatche({
      type: "InputValueSection",
      ValueSection: event.target.value,
    });
  };
  const inputValueCourselevelHandler = (event) => {
    dispatche({
      type: "InputValueCourselevel",
      ValueCourselevel: event.target.value,
    });
  };
  const inputValueTypecostHandler = (event) => {
    dispatche({
      type: "InputValueTypeCost",
      ValueTypeCost: event.target.value,
    });
  };
  const inputValueTeacherHandler = (event) => {
    dispatche({
      type: "InputValueTeacher",
      ValueTeacher: event.target.value,
    });
  };

  const searchCousesShopHandler = () => {
    let arrayFilter = [];
    let filterSection = courses.filter(
      (e, index) => e.section === cousesInput.courseSection
    );

    let filterCourselevel = courses.filter(
      (e, index) => e.courselevel === cousesInput.courselevel
    );

    let filterStatus = courses.filter(
      (e, index) => e.status === cousesInput.courseStatus
    );

    let filterTypecost = courses.filter(
      (e, index) => e.typecost === cousesInput.courseTypeCost
    );

    let filterTeacher = courses.filter(
      (e, index) => e.teacher === cousesInput.courseTeacher
    );

    arrayFilter.push(
      filterSection.length > 0 && filterSection,
      filterCourselevel.length > 0 && filterCourselevel,
      filterStatus.length > 0 && filterStatus,
      filterTypecost.length > 0 && filterTypecost,
      filterTeacher.length > 0 && filterTeacher
    );

    arrayFilter = arrayFilter.filter((e) => e !== false);

    let result =
      arrayFilter.length > 0 &&
      arrayFilter.shift().filter((next) => {
        return arrayFilter.every((prev) => {
          return prev.indexOf(next) !== -1;
        });
      });

    setResultFilter(result);

    if (result.length === 0) {
      dispatche({
        type: "InputValueStatus",
        ValueStatus: "",
      });
      dispatche({
        type: "InputValueSection",
        ValueSection: "",
      });
      dispatche({
        type: "InputValueCourselevel",
        ValueCourselevel: "",
      });
      dispatche({
        type: "InputValueTypeCost",
        ValueTypeCost: "",
      });
      dispatche({
        type: "InputValueTeacher",
        ValueTeacher: "",
      });
    }
    setStatusFilter(true);
  };

  const RemoveFilterHandler = () => {
    setStatusFilter(false);
    dispatche({
      type: "InputValueStatus",
      ValueStatus: "",
    });
    dispatche({
      type: "InputValueSection",
      ValueSection: "",
    });
    dispatche({
      type: "InputValueCourselevel",
      ValueCourselevel: "",
    });
    dispatche({
      type: "InputValueTypeCost",
      ValueTypeCost: "",
    });
    dispatche({
      type: "InputValueTeacher",
      ValueTeacher: "",
    });
    setResultFilter([]);
  };
  return (
    <div>
      <div className="row justify-content-start   mt-5 ">
        <div className="col">
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
        </div>
      </div>
      {showFilterForm ? (
        <div className="row  justify-content-center  mt-2  border   border-success rounded-5 shadow boxFilter_coureseShop">
          <div className="row justify-content-between align-items-center mt-2 ">
            <div className="col">
              <Breadcrumb separator="">
                <Breadcrumb.Item className="text-warning ">
                  فیلتر{" "}
                </Breadcrumb.Item>
                <Breadcrumb.Separator>:</Breadcrumb.Separator>
                {cousesInput.courseSection && (
                  <>
                    <Breadcrumb.Item>
                      {cousesInput.courseSection}
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {cousesInput.courselevel && (
                  <>
                    <Breadcrumb.Item>{cousesInput.courselevel}</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {cousesInput.courseStatus && (
                  <>
                    <Breadcrumb.Item>
                      {cousesInput.courseStatus}
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {cousesInput.courseTeacher && (
                  <>
                    <Breadcrumb.Item>
                      {cousesInput.courseTeacher}
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
                {cousesInput.courseTypeCost && (
                  <>
                    <Breadcrumb.Item>
                      {cousesInput.courseTypeCost}
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                  </>
                )}
              </Breadcrumb>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                className=" fs-5 t btn btn-outline-warning "
                onClick={RemoveFilterHandler}
              >
                حذف فیلتر
              </button>
            </div>
          </div>
          <div className="row justify-content-evenly m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 ">
            <SelectorFormCouses
              inputValueHandler={inputValueStatusHandler}
              option={[
                { value: "", name: "وضعیت دوره" },
                { value: "پیش فروش", name: "پیش فروش" },
                { value: "در حال برگزاری", name: "در حال برگزاری" },
                { value: "اتمام دوره", name: "اتمام دوره" },
              ]}
              value={cousesInput.courseStatus}
              label="وضعیت دوره"
            />
            <SelectorFormCouses
              inputValueHandler={inputValueCourselevelHandler}
              option={[
                { value: "", name: "سطح دوره" },
                { value: "مقدماتی", name: "مقدماتی" },
                { value: "متوسط", name: "متوسط" },
                { value: "پیشرفته", name: "پیشرفته" },
              ]}
              value={cousesInput.courselevel}
              label="سطح دوره"
            />
          {type!=="Main" &&   <SelectorFormCouses
              inputValueHandler={inputValueSectionHandler}
              option={[
                { value: "", name: "بخش دوره" },
                { name: "فرانت اند", value: "frontend" },
                { name: "بک اند", value: "backend" },
                { name: "امنیت", value: "security" },
                { name: "مهارت", value: "skill" },
              ]}
              value={cousesInput.courseSection}
              label="بخش دوره"
            />}
            <SelectorFormCouses
              inputValueHandler={inputValueTypecostHandler}
              option={[
                { value: "", name: "نوع دوره" },
                { value: "رایگان", name: "رایگان" },
                { value: "پولی", name: "پولی" },
              ]}
              value={cousesInput.courseTypeCost}
              label="نوع دوره"
            />
            <SelectorFormCouses
              inputValueHandler={inputValueTeacherHandler}
              option={courses.map((e) => {
                return { name: e.teacher, value: e.teacher };
              })}
              optionDefualt={{ name: "نام مدرس", value: "" }}
              value={cousesInput.courseTeacher}
              label="نام مدرس"
            />
          </div>
          <div className="row justify-content-center">
            <button
              className="btn btn-outline-info fs-3 w-50 m-3"
              onClick={searchCousesShopHandler}
            >
              {" "}
              جستجو{" "}
            </button>
          </div>
        </div>
      ):null}
    </div>
  );
}
