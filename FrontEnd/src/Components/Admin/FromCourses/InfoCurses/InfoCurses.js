import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  columnsInfo,
  selectBoxSearchInfo,
} from "../../../../Schema/schemaTabel/schemaCourses/schemaInfoTableCourses";
import Loading from "../../../../Components/Loading/Loading";
import SectionHeader from "../../../SectionHeader/SectionHeader";
import DataTable from "../../../DataTable/DataTable";
import ToastMessage from "../../../../customUse/ToastMessage/ToastMessage";
import UPloader from "../../../Uploader/UPloader";
import { Select } from "antd";
import { UseUpLoader } from "../../../../customUse/UseUpLoader/UseUpLoader";
import { GetApi } from "../../../../Servises/Api";
import GetServises from "../../../../Servises/GetServises";

export default function InfoCurses({ type, refreshByTabs }) {
  const [videoloading, setUploadedLoading] = useState(false);
  const [refresh, setRafresh] = useState(false);

  const [allCoursesName, setAllcoursesName] = useState([]);

  const [FilterTopic, setFilterTopic] = useState([]);
  const [GetSelectCourseInfo, setGetSelectCourseInfo] = useState([]);
  const [GetSelectCourse, setGetSelectCourse] = useState([]);

  const [getVideoUrl, setGetVideoUrl] = useState("");

  const [inputValueTopic, setInputValueTopic] = useState("");
  const [inputSelectCourse, setinputSelectCourse] = useState("");
  const [inputSelectCourseInfo, setinputSelectCourseInfo] = useState("");
  const [inputValueNameInfo, setInputValueNameInfo] = useState("");
  const [inputSelectTopic, setinputSelectTopic] = useState("");
  const [DataUPloader, setDataUPloader] = useState("");

  const token = localStorage.getItem("user");

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };

  useEffect(() => {
    GetServises(GetApi.CourseApi).then((result) => {
      let CoursName = result.flatMap((e) => e.name);
      setAllcoursesName(CoursName);

      let GetSelectCourse = result.filter((e) => e.name === inputSelectCourse);
      setGetSelectCourse(GetSelectCourse);

      let GetSelectCourseInfo = result.filter(
        (e) => e.name === inputSelectCourseInfo
      );
      setGetSelectCourseInfo(GetSelectCourseInfo);
      let GetTopicForInfo = GetSelectCourseInfo.flatMap(
        (e) => e.Coursetopics
      ).filter((e) => e.nameInfo === "سرفصل");
      setFilterTopic(GetTopicForInfo);

      return result;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSelectCourse, inputSelectCourseInfo, refresh, refreshByTabs]);

  let DatainfoTopicCourses = {
    id_topic: uuidv4(),
    namecourse: inputSelectCourse,
    topic: inputValueTopic,
    infoUrl: "__",
    nameInfo: "سرفصل",
    idCourse: GetSelectCourse.length ? GetSelectCourse[0]._id : "",
    CourseImage: GetSelectCourse.length ? GetSelectCourse[0].image : "",
  };

  const sendInfoCoursesTopicHandler = async () => {
    if (GetSelectCourse.length) {
      setUploadedLoading(true);

      await fetch(
        `http://localhost:4000/v1/course/setinfocourse/${GetSelectCourse[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(DatainfoTopicCourses),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setUploadedLoading(false);
          ToastMessage("سر فصل دوره با موفقیت ارسال شد");

          refreshTrashHandler();
        });
    }
  };

  let DatainfoCourses = {
    id_topic: uuidv4(),
    namecourse: inputSelectCourseInfo,
    nameInfo: inputValueNameInfo,
    topic: inputSelectTopic,
    infoUrl: getVideoUrl,
    idCourse: GetSelectCourseInfo.length ? GetSelectCourseInfo[0]._id : "",
    CourseImage: GetSelectCourseInfo.length ? GetSelectCourseInfo[0].image : "",
  };

  const sendInfoCoursesHandler = async () => {
    if (GetSelectCourseInfo.length) {
      setUploadedLoading(true);
      DataUPloader &&
        (await UseUpLoader(
          DataUPloader,
          `http://localhost:4000/v1/course/uploadvideo`
        )
          .then((ResultUploadUse) => {
            setGetVideoUrl(ResultUploadUse);
            DatainfoCourses.infoUrl = ResultUploadUse;
            return ResultUploadUse;
          })
          .then(async (VlueUPloader) => {
            if (DatainfoCourses.infoUrl && VlueUPloader) {
              await fetch(
                `http://localhost:4000/v1/course/setinfocourse/${GetSelectCourseInfo[0]._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(DatainfoCourses),
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((result) => {
                  setUploadedLoading(false);
                  ToastMessage(" محتوا  با موفقیت ارسال شد");

                  refreshTrashHandler();
                });
            }
          }));
    }
  };

  return (
    <div>
      {videoloading && <Loading />}
      <div className="row mt-5 mb-5 ">
        <SectionHeader title="ایجاد فصل جدید"></SectionHeader>
      </div>
      <div className="row mb-5 row-cols-1 g-5 row-cols-sm-2 ">
        <div className="col ">
          <label
            htmlFor="inputSelect"
            className="fa fa-square-o fs-2 text-info me-3 "
          ></label>

          <Select
            allowClear={true}
            className="border-0 border-bottom"
            showSearch
            style={{
              width: "85%",
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
            options={allCoursesName.map((label) => ({
              label: label,
              value: label,
            }))}
          />
        </div>
        <div className="col">
          <label
            htmlFor="input"
            className="fa fa-object-group fs-2 text-info me-3"
          ></label>
          <input
            className="border-0 border-bottom p-2  w-75 "
            id="input"
            type="text"
            placeholder="سر فصل مشخص کنید"
            value={inputValueTopic}
            onChange={(event) => setInputValueTopic(event.target.value)}
          />
        </div>
      </div>
      <div className="row justify-content-center ">
        <button
          className={` ${
            DatainfoTopicCourses.topic && DatainfoTopicCourses.namecourse
              ? "btn btn-outline-info mb-5 fs-3 mt-5 w-50 p-1"
              : "btn mb-5 mt-5 w-50 disabled p-1 fs-3"
          }`}
          onClick={sendInfoCoursesTopicHandler}
        >
          {" "}
          ارسال سرفصل
        </button>
      </div>

      <div className="row mt-5 mb-5">
        <SectionHeader title="ایجاد محتوا برای سر فصل"></SectionHeader>
      </div>
      <div className="row mt-5 mb-5 align-items-center row-cols-1 g-5 row-cols-sm-2  ">
        <div className="col order-1 order-sm-0  align-items-center  ">
          <div className="col mt-5 mb-5">
            <label
              htmlFor="inputSelect"
              className="fa fa-square-o fs-2 text-info me-3"
            ></label>

            <Select
              allowClear={true}
              className="border-0 border-bottom"
              showSearch
              style={{
                width: "75%",
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
              onChange={(value) => setinputSelectCourseInfo(value)}
              options={allCoursesName.map((label) => ({
                label: label,
                value: label,
              }))}
            />
          </div>
          <div className="col mt-5 mb-5">
            <label
              htmlFor="inputSelect"
              className="fa fa-object-group fs-2 text-info me-3"
            ></label>

            <Select
              allowClear={true}
              className="border-0 border-bottom"
              showSearch
              style={{
                width: "74%",
              }}
              placeholder="لطفا یکی از سرفصل ها را انتخاب کنید"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => setinputSelectTopic(value)}
              options={
                FilterTopic.length
                  ? FilterTopic.map((label) => {
                      return { label: label.topic, value: label.topic };
                    })
                  : []
              }
            />
          </div>
          <div className="col mt-5 mb-5">
            <label
              htmlFor="input"
              className="fa fa-pencil fs-2 text-info me-3"
            ></label>
            <input
              className="border-0 border-bottom p-2  w-75 "
              id="input"
              type="text"
              placeholder="اسم محتوا را مشخص کنید"
              value={inputValueNameInfo}
              onChange={(event) => setInputValueNameInfo(event.target.value)}
            />
          </div>
        </div>
        <div className="col order-0 order-sm-1  d-flex justify-content-center align-items-center ">
          <UPloader
            appendName="video"
            VlueUPloader={getVideoUrl}
            setVlueUPloader={setGetVideoUrl}
            setDataUPloader={setDataUPloader}
            type="Video"
            size="madium"
          />
        </div>
      </div>
      <div className="row justify-content-center  mt-5 mb-5">
        <button
          className={` ${
            DatainfoCourses.topic &&
            DatainfoCourses.namecourse &&
            DatainfoCourses.infoUrl &&
            DatainfoCourses.nameInfo
              ? "btn btn-outline-info mt-3 w-50 p-1 fs-3"
              : "btn  mt-3 w-50 disabled p-1 fs-3"
          }`}
          onClick={sendInfoCoursesHandler}
        >
          {" "}
          ارسال محتوا
        </button>
      </div>
      <div className="mt-5 mb-5">
        <DataTable
          refreshTrash={refresh}
          refreshByTabs={refreshByTabs}
          refreshTrashHandler={refreshTrashHandler}
          refreshByValidform={videoloading}
          columns={[...columnsInfo]}
          selectBox={[...selectBoxSearchInfo]}
          apiData="http://localhost:4000/v1/course/getcourseInfo"
          apiRemove={"http://localhost:4000/v1/course/removecourseInfo"}
          methodRemove={"PUT"}
          messageTrash="آیا از حذف این سر فصل مطمئن هستید؟"
          messageRemove=" محتوا با موفقیت حذف شد"
        ></DataTable>
      </div>
    </div>
  );
}
