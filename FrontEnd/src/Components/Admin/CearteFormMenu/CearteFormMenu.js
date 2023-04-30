import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaMenuse/schemaMenuse";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import DataTable from "../../DataTable/DataTable";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { Select } from "antd";
import GetServises from "../../../Servises/GetServises";
import { GetApi } from "../../../Servises/Api";

export default function CearteFormMenu({ type, refreshByTabs }) {
  const [namefather, setNameFather] = useState("");
  const [linkfather, setLinkeFather] = useState("");
  const [parent, setParent] = useState("");
  const [namechild, setNameChild] = useState("");
  const [linkchild, setLinkeChild] = useState("");
  const [AllMenuseFather, setAllMenuseFather] = useState([]);
  const [filterLink, setfilterLink] = useState([]);
  const [refresh, setRafresh] = useState(false);
  const [CourseInfo, setCourseInfo] = useState([]);
  const [refreshForEditForm, setrefreshForEditForm] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const showformHandler = () => {
    setShowForm((prev) => !prev);
  };
  const token = localStorage.getItem("user");

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };
  let checkFatherInputse = false;
  let checkChidrenInputse = false;

  let datafather = {
    namefather,
    linkfather: `/${linkfather}/Main`,
    parent: "__",
    namechild: "__",
    linkchild: "__",
  };

  let dataChild = {
    parent,
    namefather: parent,
    linkfather: filterLink.length > 0 && filterLink[0].linkfather,
    namechild,
    linkchild: ` ${
      filterLink.length > 0 &&
      filterLink[0].linkfather.substr(
        0,
        filterLink[0].linkfather.search("Main") - 1
      )
    }/${linkchild}`,
  };

  useEffect(() => {
    GetServises(GetApi.MenuseApi).then((result) => {
      let filterFather = result.filter((e) => e.parent === "__");
      setAllMenuseFather(filterFather);
      let getfilterLink = AllMenuseFather.filter((e) => {
        return e.namefather === parent;
      });
      setfilterLink(getfilterLink);
    });

    GetServises(GetApi.CourseApi).then((result) => {
      setCourseInfo(result);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshByTabs, refresh, parent]);

  const sendFatherMenueHandler = async () => {
    await fetch(`http://localhost:4000/v1/menuse/insertfathermenue`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datafather),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        ToastMessage(result.message);

        setRafresh((prev) => !prev);
      });
  };
  const sendChildMenueHandler = async () => {
    await fetch(`http://localhost:4000/v1/menuse/insertchildmenue`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataChild),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        ToastMessage(result.message);

        setRafresh((prev) => !prev);
      });
  };

  if (namefather && linkfather) {
    checkFatherInputse = true;
  } else {
    checkFatherInputse = false;
  }
  if (parent && namechild && linkchild) {
    checkChidrenInputse = true;
  } else {
    checkChidrenInputse = false;
  }

  return (
    <div>
      <Fab
        color="warning"
        title="فیلتر"
        size="small"
        aria-label="edit"
        onClick={showformHandler}
        sx={{ zIndex: 10, marginRight: "1rem" }}
      >
        <AddIcon />
      </Fab>
      {showForm ? (
        <div className="row flex-column justify-content-center align-items-center mt-5">
          <SectionHeader title={"ایجاد منوی پدر"}></SectionHeader>

          <div className="col d-flex flex-column align-items-center justify-content-center w-100 mt-5 mb-5">
            <div className="row row-cols-1 row-cols-md-2 w-100 mt-5 mb-5 justify-content-md-center">
              <div className="col d-flex justify-content-md-center align-items-center">
                <label className=" text-info fs-4 " htmlFor="inputFaderMenue">
                  منوی پدر :
                </label>
                <input
                  value={namefather}
                  // defaultValue={type === "edite" ? datafather.namefather : ""}
                  id="inputFaderMenue"
                  className="border-0 border-bottom m-3  p-2"
                  placeholder="اسم منوی اصلی را وارد کنید"
                  type="text"
                  onChange={(event) => setNameFather(event.target.value)}
                />
              </div>
              <div className="col d-flex justify-content-md-center align-items-center">
                <label className=" text-info fs-4 " htmlFor="inputFaderlink">
                  لینک پدر :
                </label>
                <input
                  dir="ltr"
                  value={linkfather}
                  // defaultValue={type === "edite" ? datafather.linkfather : ""}
                  id="inputFaderlink"
                  className="border-0 border-bottom m-3   p-2"
                  placeholder="لینک منوی اصلی را وارد کنید"
                  type="text"
                  onChange={(event) => setLinkeFather(event.target.value)}
                />
              </div>
            </div>
            <div className={`w-100 d-flex justify-content-center `}>
              <button
                className={`${
                  checkFatherInputse ? "btn-outline-success" : "disabled"
                } btn  w-50 p-2 mb-5 fs-4 `}
                onClick={sendFatherMenueHandler}
              >
                ارسال
              </button>
            </div>
          </div>

          <SectionHeader title={"ایجاد منوی فرزند"}></SectionHeader>

          <div className="col d-flex flex-column align-items-center justify-align-content-between mt-5 mb-5">
            <div className="row justify-content-center ">
              <div className="col-12 mt-5 d-flex  justify-content-md-center mb-5 align-items-center">
                <label
                  className="text-info fs-4 me-2"
                  htmlFor="inputFaderSelect"
                >
                  منوی پدر :
                </label>
                <Select
                  allowClear={true}
                  className=""
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="یک منوی پدر را انتخاب کنید"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  value={parent}
                  onChange={(value) => setParent(value)}
                  options={AllMenuseFather.map((label) => ({
                    label: label.namefather,
                    value: label.namefather,
                  }))}
                />
              </div>
              <div className="col-12 w-100 mb-5">
                <div className="row row-cols-1 row-cols-md-2">
                  <div className="col d-flex justify-content-md-center align-items-center ">
                    <label
                      className=" text-info fs-4 me-2"
                      htmlFor="inputChildMenue"
                    >
                      منوی فرزند :
                    </label>
                    <input
                      list="nameCourse"
                      name="nameCourse"
                      value={namechild}
                      id="inputChildMenue"
                      // defaultValue={type === "edite" ? dataChild.namechild : ""}
                      className="border-0 border-bottom mb-5 mb-md-0 "
                      placeholder="اسم منوی فرزند را وارد کنید"
                      type="text"
                      onChange={(event) => setNameChild(event.target.value)}
                    />
                    <datalist id="nameCourse">
                      {CourseInfo.length > 0 &&
                        CourseInfo.map((e) => {
                          return <option key={e._id}>{e.name}</option>;
                        })}
                    </datalist>
                  </div>
                  <div className="col d-flex justify-content-md-center align-items-center ">
                    <label
                      className=" text-info fs-4 me-2"
                      htmlFor="inputChildLinkMenue"
                    >
                      لینک فرزند :
                    </label>
                    <input
                      value={linkchild}
                      id="inputChildLinkMenue"
                      // defaultValue={type === "edite" ? dataChild.linkchild : ""}
                      dir="ltr"
                      className=" border-0 border-bottom   "
                      placeholder="لینک منوی فرزند را وارد کنید"
                      type="text"
                      onChange={(event) => setLinkeChild(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              className={`${
                checkChidrenInputse ? "btn-outline-success" : "disabled"
              } btn  w-50 p-2 mb-5 fs-4 `}
              onClick={sendChildMenueHandler}
            >
              ارسال
            </button>
          </div>
        </div>
      ) : null}

      <>
        <div className="mt-5 mb-5">
          <SectionHeader title="جدول"></SectionHeader>
        </div>
        <DataTable
          refreshForEditForm={refreshForEditForm}
          refreshForEditFormHandler={setrefreshForEditForm}
          refreshTrashHandler={refreshTrashHandler}
          refreshByTabs={refreshByTabs}
          refreshTrash={refresh}
          columns={[...columns]}
          selectBox={[...selectBoxSearch]}
          apiData="http://localhost:4000/v1/menuse/getMenuse"
          apiRemove={"http://localhost:4000/v1/menuse/remove"}
          methodRemove={"Delete"}
          messageTrash="آیا از حذف این منو مطمئن هستید؟"
          type={"editeMenuse"}
        ></DataTable>
      </>
    </div>
  );
}
