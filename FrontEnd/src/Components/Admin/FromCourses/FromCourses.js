import React, { useEffect, useReducer, useState } from "react";

import InputFormCourse from "./InputFormCourse/InputFormCourse";
import SelectorFormCouses from "./SelectorFormCouses/SelectorFormCouses";

import UPloader from "../../Uploader/UPloader";
import Loading from "../../Loading/Loading";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import DataTable from "../../DataTable/DataTable";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaCourses/schemaTableCourses";

import "./FromCourses.css";
import { Select } from "antd";
import { UseUpLoader } from "../../../customUse/UseUpLoader/UseUpLoader";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";

export default function FromCourses({ api, method, type, refreshByTabs }) {
  const regexrCourseTime = /^([0-9])+(:)+([0-9])+$/;
  const regexrCost = /^([0-9])+$/;
  let check = false;
  const [ValidImage, setValidUploaded] = useState("");
  const [linkchild, setlinkchild] = useState([]);
  const [videoloading, setUploadedLoading] = useState(false);
  const [allCourse, setAllcourses] = useState([]);
  const [filterCourse, setFiltercourses] = useState([]);
  const [inputSelectCourse, setinputSelectCourse] = useState("");
  const [refresh, setRafresh] = useState(false);
  const [validForm, setValidForm] = useState([]);
  const [VlueUPloader, setVlueUPloader] = useState("");
  const [DataUPloader, setDataUPloader] = useState("");

  const token = localStorage.getItem("user");

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };

  const [cousesInput, dispatche] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "InputValueName": {
          return {
            ...state,
            courseName: action.ValueName,
          };
        }
        case "InputValueTitel": {
          return {
            ...state,
            courseTitel: action.ValueTitel,
          };
        }

        case "InputValueTime": {
          return {
            ...state,
            courseTime: action.ValueTime,
          };
        }
        case "InputValueReferences": {
          return {
            ...state,
            courseReferences: action.ValueReferences,
          };
        }
        case "InputValueTeacher": {
          return {
            ...state,
            courseTeacher: action.ValueTeacher,
          };
        }
        case "InputValueCVTeacher": {
          return {
            ...state,
            CVTeacher: action.ValueCVTeacher,
          };
        }
        case "InputValueCost": {
          return {
            ...state,
            courseCost: action.ValueCost,
          };
        }
        case "InputValueDiscount": {
          return {
            ...state,
            courseDiscount: action.ValueDiscount,
          };
        }

        case "InputValueLink": {
          return {
            ...state,
            courseLink: action.ValueLink,
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
        case "InputValueDissection": {
          return {
            ...state,
            courseDissection: action.ValueDissection,
          };
        }

        default: {
          return "";
        }
      }
    },

    {
      courseName: "",
      courseTitel: "",
      courseTime: "",
      courseReferences: "",
      courseTeacher: "",
      CVTeacher: "",
      courseCost: undefined,
      courseDiscount: undefined,
      courseSection: "فرانت اند",
      courselevel: "مقدماتی",
      courseStatus: "پیش فروش",
      courseTypeCost: "رایگان",
      courseDissection: "",
      courseLink: "",
    }
  );

  useEffect(() => {
    GetServises(GetApi.MenuseApi).then((result) => {
      // let filterFather = result.filter((e) => e.parent === "__");
      let filterChild = result.filter((e) => e.parent !== "__");
      let filterChildArticles = filterChild.filter(
        (e) => e.parent !== "مقالات" && e.parent !== "درباره ما"
      );

      filterChild.length > 0 && setlinkchild(filterChildArticles);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let courseData = {
    name: cousesInput.courseName,
    titel: cousesInput.courseTitel,
    image: VlueUPloader,
    periodtime: regexrCourseTime.test(cousesInput.courseTime)
      ? cousesInput.courseTime
      : "",
    references: cousesInput.courseReferences,
    teacher: cousesInput.courseTeacher,
    cvteacher: cousesInput.CVTeacher,
    link: cousesInput.courseLink,
    cost:
      cousesInput.courseTypeCost !== "رایگان"
        ? regexrCost.test(cousesInput.courseCost)
          ? Number(cousesInput.courseCost)
          : ""
        : 0,
    discount:
      cousesInput.courseTypeCost !== "رایگان"
        ? regexrCost.test(cousesInput.courseDiscount)
          ? Number(cousesInput.courseDiscount)
          : ""
        : 0,
    section: cousesInput.courseSection,
    courselevel: cousesInput.courselevel,
    status: cousesInput.courseStatus,
    typecost: cousesInput.courseTypeCost,
    dissection: cousesInput.courseDissection,
  };

  const inputValueNameHandler = (event) => {
    dispatche({
      type: "InputValueName",
      ValueName: event.target.value,
    });
  };
  const inputValueTitelHandler = (event) => {
    dispatche({
      type: "InputValueTitel",
      ValueTitel: event.target.value,
    });
  };
  const inputValuePeriodtimeHandler = (event) => {
    dispatche({
      type: "InputValueTime",
      ValueTime: event.target.value,
    });
  };
  const inputValueReferencesHandler = (event) => {
    dispatche({
      type: "InputValueReferences",
      ValueReferences: event.target.value,
    });
  };
  const inputValueTeacherHandler = (event) => {
    dispatche({
      type: "InputValueTeacher",
      ValueTeacher: event.target.value,
    });
  };
  const inputValueCvteacherHandler = (event) => {
    dispatche({
      type: "InputValueCVTeacher",
      ValueCVTeacher: event.target.value,
    });
  };
  const inputValueCostHandler = (event) => {
    dispatche({
      type: "InputValueCost",
      ValueCost: event.target.value,
    });
  };
  const inputValueDiscountHandler = (event) => {
    dispatche({
      type: "InputValueDiscount",
      ValueDiscount: event.target.value,
    });
  };
  const inputValuelinkHandler = (event) => {
    dispatche({
      type: "InputValueLink",
      ValueLink: event.target.value,
    });
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

  const sendDataCourseHandler = async (event) => {
    DataUPloader &&
      (await UseUpLoader(
        DataUPloader,
        "http://localhost:4000/v1/course/uploadImage"
      )
        .then((ResultUploadUse) => {
          setVlueUPloader(ResultUploadUse);
          courseData.image = ResultUploadUse;
          return ResultUploadUse;
        })
        .then(async (VlueUPloader) => {
          if (courseData.image && VlueUPloader) {
            setUploadedLoading(true);
            await fetch(type === "edit" ? `${api}/${filterCourse._id}` : api, {
              method: method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(courseData),
            })
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                setValidForm(result);

                ToastMessage(result.message);
                setUploadedLoading(false);
              })
              .then((validForm) => {
                setValidUploaded("");
              });
          } else {
            setValidUploaded("لطفا اول عکس را ارسال کنید");
          }
        }));
    !DataUPloader &&
      (await fetch(type === "edit" ? `${api}/${filterCourse._id}` : api, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setValidForm(result);

          ToastMessage(result.message);
          setUploadedLoading(false);
        })
        .then((validForm) => {
          setValidUploaded("");
        }));
  };
  if (
    (courseData.cost || courseData.cost === 0) &&
    (courseData.discount || courseData.discount === 0) &&
    courseData.cvteacher &&
    courseData.link &&
    courseData.periodtime &&
    courseData.teacher &&
    courseData.titel &&
    courseData.name &&
    courseData.references &&
    courseData.dissection
  ) {
    check = true;
  } else {
    check = false;
  }

  useEffect(() => {
    GetServises(GetApi.CourseApi)
      .then((result) => {
        setAllcourses(result);
        let filercourse = result.filter((e) => {
          return e.name === inputSelectCourse;
        });

        return filercourse;
      })
      .then((filercourse) => {
        if (filercourse.length) {
          setFiltercourses(filercourse[0]);

          dispatche({
            type: "InputValueName",
            ValueName: type === "edit" ? filercourse[0].name : "",
          });

          dispatche({
            type: "InputValueTitel",
            ValueTitel: type === "edit" ? filercourse[0].titel : "",
          });
          dispatche({
            type: "InputValueTime",
            ValueTime: type === "edit" ? filercourse[0].periodtime : "",
          });
          dispatche({
            type: "InputValueReferences",
            ValueReferences: type === "edit" ? filercourse[0].references : "",
          });
          dispatche({
            type: "InputValueTeacher",
            ValueTeacher: type === "edit" ? filercourse[0].teacher : "",
          });
          dispatche({
            type: "InputValueLink",
            ValueLink: type === "edit" ? filercourse[0].link : "",
          });
          dispatche({
            type: "InputValueCVTeacher",
            ValueCVTeacher: type === "edit" ? filercourse[0].cvteacher : "",
          });
          dispatche({
            type: "InputValueCost",
            ValueCost:
              type === "edit" || filercourse[0].cost === 0
                ? filercourse[0].cost
                : "",
          });
          dispatche({
            type: "InputValueDiscount",
            ValueDiscount:
              type === "edit" || filercourse[0].discount === 0
                ? filercourse[0].discount
                : "",
          });
          dispatche({
            type: "InputValueStatus",
            ValueStatus: type === "edit" ? filercourse[0].status : "پیش فروش",
          });
          dispatche({
            type: "InputValueSection",
            ValueSection:
              type === "edit" ? filercourse[0].section : "فرانت اند",
          });
          dispatche({
            type: "InputValueCourselevel",
            ValueCourselevel:
              type === "edit" ? filercourse[0].courselevel : "مقدماتی",
          });
          dispatche({
            type: "InputValueTypeCost",
            ValueTypeCost: type === "edit" ? filercourse[0].typecost : "رایگان",
          });
          dispatche({
            type: "InputValueDissection",
            ValueDissection: type === "edit" ? filercourse[0].dissection : "",
          });

          setVlueUPloader(type === "edit" ? filercourse[0].image : "");
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSelectCourse, validForm, refreshByTabs, refresh]);

  return (
    <>
      {videoloading && <Loading />}

      {ValidImage && <h5 className="text-danger">{ValidImage}</h5>}
      {validForm.length > 0 && (
        <h5 className="text-danger">پر کردن فیلد های قرمز اجباری هستند</h5>
      )}
      {type === "edit" && (
        <div>
          <Select
            allowClear={true}
            className="border-0 border-bottom"
            showSearch
            style={{
              width: "35%",
              marginTop: "1.5rem",
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
          />
        </div>
      )}

      <UPloader
        appendName="photo"
        VlueUPloader={VlueUPloader}
        setVlueUPloader={setVlueUPloader}
        setDataUPloader={setDataUPloader}
        size="madium"
      />

      <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-lg-4 justify-content-center align-items-center">
          <InputFormCourse
            value={cousesInput.courseName}
            defaultValue={cousesInput.courseName}
            icon="fa-book"
            inputValueHandler={inputValueNameHandler}
            courseData={courseData.name}
            placeholder={"نام دوره را وارد کنید"}
          ></InputFormCourse>
          <InputFormCourse
            value={cousesInput.courseTitel}
            defaultValue={cousesInput.courseTitel}
            icon="fa-flag"
            inputValueHandler={inputValueTitelHandler}
            courseData={courseData.titel}
            placeholder={"عنوان دوره را وارد کنید"}
          ></InputFormCourse>
          <InputFormCourse
            value={cousesInput.courseTime}
            defaultValue={cousesInput.courseTime}
            icon="fa-clock-o"
            inputValueHandler={inputValuePeriodtimeHandler}
            regexr={regexrCourseTime.test(cousesInput.courseTime)}
            courseData={courseData.periodtime}
            placeholder={"مدت زمان دوره را وارد کنید"}
          ></InputFormCourse>
          <InputFormCourse
            value={cousesInput.courseReferences}
            defaultValue={cousesInput.courseReferences}
            icon="fa-info"
            inputValueHandler={inputValueReferencesHandler}
            courseData={courseData.references}
            placeholder={"منبع دوره را وارد کنید"}
          ></InputFormCourse>
          <InputFormCourse
            value={cousesInput.courseTeacher}
            defaultValue={cousesInput.courseTeacher}
            icon="fa-graduation-cap"
            inputValueHandler={inputValueTeacherHandler}
            courseData={courseData.teacher}
            placeholder={"نام مدرس دوره را وارد کنید"}
          ></InputFormCourse>
          <InputFormCourse
            value={cousesInput.CVTeacher}
            defaultValue={cousesInput.CVTeacher}
            icon="fa-vcard "
            inputValueHandler={inputValueCvteacherHandler}
            courseData={courseData.cvteacher}
            placeholder={"رزومه مدرس دوره را وارد کنید"}
          ></InputFormCourse>
          {cousesInput.courseTypeCost !== "رایگان" ? (
            <InputFormCourse
              value={cousesInput.courseCost}
              defaultValue={cousesInput.courseCost}
              icon="fa-money"
              inputValueHandler={inputValueCostHandler}
              courseData={courseData.cost}
              placeholder={"قیمت دوره را وارد کنید"}
              regexr={regexrCost.test(cousesInput.courseCost)}
            ></InputFormCourse>
          ) : null}
          {cousesInput.courseTypeCost !== "رایگان" ? (
            <InputFormCourse
              value={cousesInput.courseDiscount}
              defaultValue={cousesInput.courseDiscount}
              icon="fa-tags"
              inputValueHandler={inputValueDiscountHandler}
              courseData={courseData.discount}
              placeholder={"تخفیف دوره را وارد کنید"}
              regexr={regexrCost.test(cousesInput.courseDiscount)}
            ></InputFormCourse>
          ) : null}
          <InputFormCourse
            idDataList="link"
            value={cousesInput.courseLink}
            defaultValue={cousesInput.courseLink}
            icon="fa-link"
            inputValueHandler={inputValuelinkHandler}
            courseData={courseData.link}
            placeholder={"لینک دوره را وارد کنید"}
          ></InputFormCourse>
          <datalist id="link">
            {linkchild.length > 0 &&
              linkchild.map((e) => {
                return <option key={e._id}>{e.linkchild}</option>;
              })}
          </datalist>
        </div>

        <div className="row  justify-content-center mt-5 w-100 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          <SelectorFormCouses
            inputValueHandler={inputValueStatusHandler}
            option={[
              { value: "پیش فروش", name: "پیش فروش" },
              { value: "در حال برگزاری", name: "در حال برگزاری" },
              { value: "اتمام دوره", name: "اتمام دوره" },
            ]}
            defaultValue={cousesInput.courseStatus}
            value={cousesInput.courseStatus}
            label="وضعیت دوره"
          />
          <SelectorFormCouses
            inputValueHandler={inputValueCourselevelHandler}
            option={[
              { value: "مقدماتی", name: "مقدماتی" },
              { value: "متوسط", name: "متوسط" },
              { value: "پیشرفته", name: "پیشرفته" },
            ]}
            defaultValue={cousesInput.courselevel}
            value={cousesInput.courselevel}
            label="سطح دوره"
          />
          <SelectorFormCouses
            inputValueHandler={inputValueSectionHandler}
            option={[
              { name: "فرانت اند", value: "frontend" },
              { name: "بک اند", value: "backend" },
              { name: "امنیت", value: "security" },
              { name: "مهارت", value: "skill" },
            ]}
            defaultValue={cousesInput.courseSection}
            value={cousesInput.courseSection}
            label="بخش دوره"
          />
          <SelectorFormCouses
            inputValueHandler={inputValueTypecostHandler}
            option={[
              { value: "رایگان", name: "رایگان" },
              { value: "پولی", name: "پولی" },
            ]}
            defaultValue={cousesInput.courseTypeCost}
            value={cousesInput.courseTypeCost}
            label="نوع دوره"
          />
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-12 d-flex justify-content-center">
            <textarea
              value={cousesInput.courseDissection}
              // defaultValue={cousesInput.courseDissection}
              onChange={(event) =>
                dispatche({
                  type: "InputValueDissection",
                  ValueDissection: event.target.value,
                })
              }
              name=""
              id=""
              cols="175"
              rows="10"
              placeholder="توضیحات دوره"
              className={`w-100 ${
                courseData.dissection
                  ? " border-success "
                  : "text-danger border-danger"
              }`}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center  mb-5">
        <div className="col d-flex justify-content-center mb-5">
          <button
            className={`btn btn-outline-success w-50 p-2 mb-5 ${
              !check && "disabled w-50 p-2 mb-5 btn"
            }`}
            onClick={sendDataCourseHandler}
          >
            ارسال
          </button>
        </div>
      </div>
      <div className=" mb-5 mt-5">
        <DataTable
          refreshByTabs={refreshByTabs}
          refreshTrash={refresh}
          refreshByValidform={validForm}
          refreshTrashHandler={refreshTrashHandler}
          columns={[...columns]}
          selectBox={[...selectBoxSearch]}
          apiData="http://localhost:4000/v1/course/getcourse"
          apiRemove={"http://localhost:4000/v1/course/remove"}
          methodRemove={"Delete"}
          messageTrash="آیا از حذف این دوره مطمئن هستید؟"
          // type="coursesEdit"
        ></DataTable>
      </div>
    </>
  );
}
