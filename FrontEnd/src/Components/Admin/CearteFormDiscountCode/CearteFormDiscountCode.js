import React, { useContext, useEffect, useState } from "react";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";

import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaDiscountCode/schemaDiscountCode";
import DataTable from "../../DataTable/DataTable";
import SectionHeader from "../../SectionHeader/SectionHeader";

import useContextUser from "../../../ContextApi/UserContextApi";
import { Select } from "antd";
import GetServises from "../../../Servises/GetServises";
import { GetApi } from "../../../Servises/Api";

export default function CearteFormDiscountCode({ type, refreshByTabs }) {
  const { userInfo } = useContext(useContextUser);

  const [codeValue, setCodeValue] = useState("");
  const [percentValue, setPercentValue] = useState("");
  const [fewTimesValue, setFewTimesValue] = useState("");
  const [selectCoursesValue, setSelectCoursesValue] = useState("");
  const [selectDiscountCodeValueEdite, setSelectDiscountCodeValueEdite] =
    useState("");
  const [getAllCourses, setGetAllCourses] = useState([]);
  const [getAllDiscountCode, setGetAllDiscountCode] = useState([]);
  const [FiltergetDiscountCode, setFilterGetDiscountCode] = useState([]);

  const [refresh, setRafresh] = useState(false);
  const token = localStorage.getItem("user");

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };
  const regex = /(^[0-9]+$)/;

  let checkValid = false;

  let dataDiscountCode = {
    codeValue,
    percentValue: regex.test(percentValue) ? Number(percentValue) : 0,
    fewTimesValue: regex.test(fewTimesValue) ? Number(fewTimesValue) : 0,
    Coursesname: selectCoursesValue,
    Coursesid: getAllCourses
      .map((e) => e.name === selectCoursesValue && e._id)
      .filter((e) => e !== false)[0],

    CreateUserEmeil: userInfo.user.email,
    UseUserEmeil: [],
  };

  type !== "edite"
    ? dataDiscountCode.codeValue &&
      dataDiscountCode.fewTimesValue &&
      dataDiscountCode.percentValue &&
      dataDiscountCode.Coursesname
      ? (checkValid = true)
      : (checkValid = false)
    : dataDiscountCode.codeValue &&
      dataDiscountCode.fewTimesValue &&
      dataDiscountCode.percentValue &&
      dataDiscountCode.Coursesname &&
      selectDiscountCodeValueEdite
    ? (checkValid = true)
    : (checkValid = false);

  useEffect(() => {
    GetServises(GetApi.DiscountcodeApi).then((result) => {
      setGetAllDiscountCode(result);
      let filterAllDiscountCode = result.filter(
        (e) => e.codeValue === selectDiscountCodeValueEdite
      );
      setFilterGetDiscountCode(filterAllDiscountCode);
      if (filterAllDiscountCode.length > 0) {
        setCodeValue(filterAllDiscountCode[0].codeValue);
        setPercentValue(filterAllDiscountCode[0].percentValue);
        setFewTimesValue(filterAllDiscountCode[0].fewTimesValue);
        setSelectCoursesValue(filterAllDiscountCode[0].Coursesname);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, selectDiscountCodeValueEdite, refreshByTabs]);

  useEffect(() => {
    
    GetServises(GetApi.CourseApi).then((result) => {
      let filterCostCourses = result.flatMap((e) => e.cost !== 0 && e.name);
      filterCostCourses = filterCostCourses.filter((e) => e && e);
      filterCostCourses.push("all");
      filterCostCourses.reverse();
      setGetAllCourses(filterCostCourses);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshByTabs]);

  const sendFatherDiscountCodeHandler = async () => {
    await fetch(
      type !== "edite"
        ? `http://localhost:4000/v1/discountcode/insertdiscountcode`
        : `http://localhost:4000/v1/discountcode/updatadiscountcode/${FiltergetDiscountCode[0]._id}`,

      {
        method: type !== "edite" ? "post" : "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataDiscountCode),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        ToastMessage(result.message, result.error);

        setRafresh((prev) => !prev);
        setSelectDiscountCodeValueEdite("");
      });
  };

  return (
    <div className="mt-5">
      <SectionHeader
        title={type === "edite" ? "ویرایش کد تخفیف" : "ایجاد کد تخفیف"}
      ></SectionHeader>

      {type === "edite" && (
        <div className="col">
          <label className="fa fa-code fs-3 text-info me-3" htmlFor="4"></label>
          <select
            id="4"
            className="border-0 border-bottom mt-5 me2 bg-body"
            name=""
            value={selectDiscountCodeValueEdite}
            onChange={(event) =>
              setSelectDiscountCodeValueEdite(event.target.value)
            }
          >
            <option value="">لطفا یک کد تخفیف را انتخاب کنید</option>

            {getAllDiscountCode.map((e) => (
              <option key={e._id} value={e.codeValue}>
                {e.codeValue}
              </option>
            ))}
          </select>
          <div className="col m-1">
            {!selectDiscountCodeValueEdite && (
              <span className="text-danger fs-6 ms-5">این فیلد اجباری است</span>
            )}
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-12 col-md-6">
          <label className="fa fa-book fs-3 text-info me-3" htmlFor="4"></label>

          <Select
            className="border-0 border-bottom"
            showSearch
            style={{
              width: "90%",
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
            onChange={(value) => setSelectCoursesValue(value)}
            value={selectCoursesValue}
            options={getAllCourses.map((label) => ({
              label: label,
              value: label,
            }))}
          />
          <div className="col m-1">
            {!selectCoursesValue && (
              <span className="text-danger fs-6 ms-5">این فیلد اجباری است</span>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center align-items-center mt-3 row-cols-1 row-cols-md-3">
        <div className="col">
          <label className="fa fa-code fs-3 text-info me-3" htmlFor="1"></label>
          <input
            id="1"
            className="border-0 border-bottom mt-5  me2"
            placeholder="کد تخفیف را وارد کنید"
            type="text"
            value={codeValue}
            onChange={(event) => setCodeValue(event.target.value)}
          />
          <div className="col m-1">
            {!codeValue && (
              <span className="text-danger fs-6 ms-5">این فیلد اجباری است</span>
            )}
          </div>
        </div>
        <div className="col">
          <label
            className="fa fa-percent fs-3 text-info me-3"
            htmlFor="2"
          ></label>
          <input
            id="2"
            className="border-0 border-bottom mt-5 me2"
            placeholder="درصد کد تخفیف را وارد کنید"
            type="text"
            value={percentValue}
            onChange={(event) => setPercentValue(event.target.value)}
          />
          <div className="col m-1">
            {!regex.test(percentValue) && (
              <span className="text-danger fs-6 ms-5">فقط عدد وارد کنید</span>
            )}
          </div>
        </div>
        <div className="col">
          <label
            className="fa fa-users fs-3 text-info me-3"
            htmlFor="3"
          ></label>
          <input
            id="3"
            className="border-0 border-bottom mt-5  me2"
            placeholder=" حداکثر استفاده از کد را وارد کنید"
            value={fewTimesValue}
            type="text"
            onChange={(event) => setFewTimesValue(event.target.value)}
          />
          <div className="col m-1">
            {!regex.test(fewTimesValue) && (
              <span className="text-danger fs-6 ms-5">فقط عدد وارد کنید</span>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center   m-5">
        <div className="col d-flex justify-content-center mt-5">
          <button
            className={`btn btn-outline-info p-2 w-25 ${
              !checkValid && "disabled text-secondary"
            }`}
            onClick={sendFatherDiscountCodeHandler}
          >
            ارسال کد تخفیف
          </button>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <SectionHeader title={"جدول کد تخفیف"}></SectionHeader>
      </div>
      <DataTable
        refreshByTabs={refreshByTabs}
        refreshTrashHandler={refreshTrashHandler}
        refreshTrash={refresh}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/discountcode/getDiscountCode"
        apiRemove={"http://localhost:4000/v1/DiscountCode/remove"}
        methodRemove={"Delete"}
        messageTrash="آیا از حذف این کد تخفیف مطمئن هستید؟"
      ></DataTable>
    </div>
  );
}
