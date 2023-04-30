import React, { useEffect } from "react";
import { Button, Select, Popover, Space } from "antd";
import { useState } from "react";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";

export default function EditeFormMenu(props) {
  const [id, setId] = useState("");
  const [KindType, setKindType] = useState("");

  const [namefather, setNameFather] = useState("");
  const [linkfather, setLinkeFather] = useState("");
  const [parent, setSelectChild] = useState("");
  const [namechild, setNameChild] = useState("");
  const [linkchild, setLinkeChild] = useState("");
  const [AllMenuseFather, setAllMenuseFather] = useState([]);

  const [refresh, setRafresh] = useState(false);
  const [CourseInfo, setCourseInfo] = useState([]);

  const token = localStorage.getItem("user");

  let checkFatherInputse = false;
  let checkChidrenInputse = false;

  let datafather = {
    namefather,
    linkfather: linkfather,
    parent: "__",
    namechild: "__",
    linkchild: "__",
  };

  let dataChild = {
    parent,
    namefather: parent,
    linkfather: linkfather,
    namechild,
    linkchild: `${linkchild}`,
  };

  useEffect(() => {
    GetServises(GetApi.MenuseApi).then((result) => {
      let filterFather = result.filter((e) => e.parent === "__");
      setAllMenuseFather(filterFather);
    });

    GetServises(GetApi.CourseApi).then((result) => {
      setCourseInfo(result);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, id]);

  const sendFatherMenueHandler = async () => {
    await fetch(`http://localhost:4000/v1/menuse/updataMenusefather/${id}`, {
      method: "put",
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
        props.refreshForEditFormHandler(result);
        setRafresh((prev) => !prev);
      });
  };
  const sendChildMenueHandler = async () => {
    await fetch(`http://localhost:4000/v1/menuse/updataMenusechild/${id}`, {
      method: "put",
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
        props.refreshForEditFormHandler(result);
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

  const editFormMmenuHandler = (_id, row) => {
    let KindType = row.some((e) => e.parent === "__");
    setKindType(KindType);
    setId(_id);

    setNameFather(row[0].namefather);
    setLinkeFather(row[0].linkfather);
    setSelectChild(row[0].parent);
    setNameChild(row[0].namechild);
    setLinkeChild(row[0].linkchild);
  };
  return (
    <div>
      <Space wrap>
        <Popover
          placement="bottom"
          content={
            <>
              {KindType ? (
                <div className="col d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
                  <div className="mt-5 mb-5">
                    <label
                      className="fa fa-arrow-circle-up text-info fs-2 me-3"
                      htmlFor="inputFaderMenue"
                    ></label>
                    <input
                      value={namefather}
                      // defaultValue={type === "edite" ? datafather.namefather : ""}
                      id="inputFaderMenue"
                      className="border-0 border-bottom m-3  p-2"
                      placeholder="اسم منوی اصلی را وارد کنید"
                      type="text"
                      onChange={(event) => setNameFather(event.target.value)}
                    />
                    <label
                      className="fa fa-link text-info fs-2 me-3"
                      htmlFor="inputFaderlink"
                    ></label>
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
              ) : null}

              {!KindType ? (
                <div className="row flex-column justify-content-center align-items-start">
                  <div className="col m-2">
                    <label
                      className="text-info fs-5 me-2"
                      htmlFor="inputFaderSelect"
                    >
                      منوی پدر :
                    </label>

                    <Select
                      allowClear={true}
                      className="border-0 border-bottom "
                      showSearch
                      style={{
                        width: "100%",
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
                      onChange={(value) => setSelectChild(value)}
                      options={AllMenuseFather.map((label) => ({
                        label: label.namefather,
                        value: label.namefather,
                      }))}
                    />
                  </div>
                  <div className="col m-2">
                    <label
                      className=" text-info fs-5 "
                      htmlFor="inputChildMenue"
                    >
                      {" "}
                      اسم منوی فرزند :
                    </label>
                    <input
                      list="nameCourse"
                      name="nameCourse"
                      value={namechild}
                      id="inputChildMenue"
                      className="border-0 border-bottom  w-100 p-2"
                      placeholder="اسم منوی را وارد کنید"
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
                  <div className="col m-2">
                    <label
                      className=" text-info fs-5"
                      htmlFor="inputChildLinkMenue"
                    >
                      {" "}
                      لینک منوی فرزند :
                    </label>
                    <input
                      value={linkchild}
                      id="inputChildLinkMenue"
                      dir="ltr"
                      className=" border-0 border-bottom  w-100  p-2 text-start"
                      placeholder="لینک منوی فرزند را وارد کنید"
                      type="text"
                      onChange={(event) => setLinkeChild(event.target.value)}
                    />
                  </div>
                  <div className="col m-2">
                    <label
                      className=" text-info fs-5"
                      htmlFor="inputFatherLinkMenue"
                    >
                      {" "}
                      لینک پدر :
                    </label>
                    <input
                      value={linkfather}
                      id="inputFatherLinkMenue"
                      dir="ltr"
                      className=" border-0 border-bottom w-100 p-2 text-start "
                      placeholder="لینک منوی پدر را وارد کنید"
                      type="text"
                      onChange={(event) => setLinkeFather(event.target.value)}
                    />
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      className={`${
                        checkChidrenInputse ? "btn-outline-success" : "disabled"
                      } btn  w-50 p-2 m-3 fs-5 `}
                      onClick={sendChildMenueHandler}
                    >
                      ارسال
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          }
          title="ویرایش متو"
          trigger="click"
        >
          <Button
            className="fa fa-edit fs-4 text-info"
            onClick={() =>
              editFormMmenuHandler(
                props._id,
                props.rows.filter((e) => e._id === props._id)
              )
            }
          ></Button>
        </Popover>
      </Space>
    </div>
  );
}
