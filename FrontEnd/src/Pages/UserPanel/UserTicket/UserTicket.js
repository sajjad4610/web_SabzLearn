import React, { useContext, useEffect } from "react";
import { Pagination, Space, Switch } from "antd";
import { Tabs, Tab } from "react-bootstrap";
import {
  department,
  priority,
  type,
} from "../../../Schema/SchemaTiket/SchemaTiket";
import { useState } from "react";
import { Select } from "antd";
import UPloader from "../../../Components/Uploader/UPloader";
import useContextUser from "../../../ContextApi/UserContextApi";
import { UseUpLoader } from "../../../customUse/UseUpLoader/UseUpLoader";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import CardTiket from "../../../Components/CardTiket/CardTiket";
import Swal from "sweetalert2";
import FilterTiket from "../../../Components/FilterTiket/FilterTiket";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";

export default function UserTicket() {
  const [ValueDepartment, setSetectDepartment] = useState("");
  const [ValueType, setSetectType] = useState("");
  const [ValuePriority, setSetectPriority] = useState("");
  const [ValueSelectCourse, setValueSelectCourse] = useState("");
  const [ValueInputTitel, setValueInputTitel] = useState("");
  const [ValueInputDescription, setValueInputDescription] = useState("");
  const [CheckInputSendEmail, setCheckInputSendEmail] = useState(false);
  const [DataUPloader, setDataUPloader] = useState("");
  const [VlueUPloader, setVlueUPloader] = useState("");
  const [allTiket, setAllTiket] = useState([]);
  const [FilterTikets, setFilterTikets] = useState([]);
  const [allCourse, setAllCourses] = useState([]);
  const [User, setUser] = useState([]);
  const [TiketMain, setTiketMain] = useState([]);
  const [TtiketSub, setTtiketSub] = useState([]);
  const [refreshByTabs, setRafreshByTabs] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const TabsHandler = (event) => {
    setRafreshByTabs((prev) => !prev);
  };

  const { isLogin, userInfo } = useContext(useContextUser);
  const token = localStorage.getItem("user");

  useEffect(() => {
    GetServises(GetApi.CourseApi).then((result) => {
      setAllCourses(result);
    });

    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isLogin &&
      fetch("http://localhost:4000/v1/tiket/getAllTikets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setAllTiket(result);

          let filterMainTiketOnUser = result
            .filter(
              (e) =>
                e.post_type === "Main" && e.sender_id === userInfo.user.userid
            )
            .reverse();
          let filterMainTiketAllUser = result
            .filter((e) => e.post_type === "Main")
            .reverse();
          setTiketMain(
            userInfo.user.role === "admin"
              ? filterMainTiketAllUser
              : filterMainTiketOnUser
          );

          let filterSubTiket = result.filter((e) => e.post_type === "Sub");
          setTtiketSub(filterSubTiket);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshByTabs, Refresh, FilterTikets]);

  const DepartmentHandler = (value) => {
    setSetectType("");
    setValueSelectCourse("");
    setSetectDepartment(value);
  };

  const DataTiketMain = {
    sender_id: User._id,
    sender_name: User.username,
    sender_email: User.email,
    sender_phone: User.phone,
    sender_avatar: User.avatar,
    sender_role: User.role,
    department: ValueDepartment,
    type: ValueType,
    level: ValuePriority,
    cours_name: ValueSelectCourse,
    send_email: CheckInputSendEmail,
    title: ValueInputTitel,
    description: ValueInputDescription,
    attached: VlueUPloader,
    post_type: "Main",
    main_id: "_",
    reaply_to: "_",
    replay_description: "_",
    read: "noread",
  };
  const SendTicketMainHandler = async () => {
    DataUPloader &&
      (await UseUpLoader(
        DataUPloader,
        `http://localhost:4000/v1/tiket/uploadAttached`
      )
        .then((ResultUploadUse) => {
          setVlueUPloader(ResultUploadUse);
          DataTiketMain.attached = ResultUploadUse;
          return ResultUploadUse;
        })
        .then(async (ResultUploadUse) => {
          if (ResultUploadUse) {
            await fetch(`http://localhost:4000/v1/tiket/inserttiket`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(DataTiketMain),
            })
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                ToastMessage(result.message);
                setDataUPloader("");
                setVlueUPloader("");
                setSetectDepartment("");
                setSetectType("");
                setSetectPriority("");
                setValueSelectCourse("");
                setValueInputTitel("");
                setValueInputDescription("");
                setRefresh((prev) => !prev);
              });
          }
        }));

    !DataUPloader &&
      (await fetch(`http://localhost:4000/v1/tiket/inserttiket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DataTiketMain),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          ToastMessage(result.message);
          setDataUPloader("");
          setVlueUPloader("");
          setDataUPloader("");
          setVlueUPloader("");
          setSetectDepartment("");
          setSetectType("");
          setSetectPriority("");
          setValueSelectCourse("");
          setValueInputTitel("");
          setValueInputDescription("");
          setRefresh((prev) => !prev);
        }));
  };

  const SendReplyTiket = async (
    _id,
    sender_name,
    description,
    department,
    type,
    level,
    cours_name,
    send_email,
    title
  ) => {
    const { value: text } = await Swal.fire({
      titleText: `در جواب : ${sender_name}`,
      input: "textarea",
      inputLabel: description,
      inputPlaceholder: "پاسخ خود را اینجا بنوسید .........",
      width: "50%",
      inputAutoTrim: true,
      showCancelButton: true,
      allowOutsideClick: false,
    });
    if (text) {
      const DataTiketSub = {
        sender_id: User._id,
        sender_name: User.username,
        sender_email: User.email,
        sender_phone: User.phone,
        sender_avatar: User.avatar,
        sender_role: User.role,
        department: department,
        type: type,
        level: level,
        cours_name: cours_name,
        send_email: send_email,
        title: title,
        description: text,
        attached: "",
        post_type: "Sub",
        main_id: _id,
        reaply_to: sender_name,
        replay_description: description,
        read: "noread",
      };

      await fetch(`http://localhost:4000/v1/tiket/inserttiket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DataTiketSub),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          ToastMessage(result.message);
          setDataUPloader("");
          setVlueUPloader("");
          setDataUPloader("");
          setVlueUPloader("");
          setSetectDepartment("");
          setSetectType("");
          setSetectPriority("");
          setValueSelectCourse("");
          setValueInputTitel("");
          setValueInputDescription("");
          // Swal.fire(result.message);
          setRefresh((prev) => !prev);
        });
    }
  };
  const RemoveHandler = (id_Box) => {};

  const onChangePagination = (page, pageSize) => {
    setPage((page - 1) * pageSize);
    setPageSize((page - 1) * pageSize + pageSize);
  };

  return (
    <>
      <Tabs
        defaultActiveKey={
          userInfo.user.role === "user" ? "sendTiket" : "Showtiket"
        }
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={TabsHandler}
      >
        {isLogin && userInfo.user.role === "user" ? (
          <Tab eventKey="sendTiket" title=" ارسال تیکت">
            <div className="row justify-content-center align-items-start mt-5 mb-5 flex-column flex-md-row">
              <div className="col">
                <div className="row">
                  <div className="col-12   m-3">
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
                      value={ValueDepartment}
                    />
                  </div>
                  <div className="col-12 m-3">
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
                      onChange={(value) => setSetectType(value)}
                      options={
                        ValueDepartment
                          ? type
                              .filter((e) => e.type === ValueDepartment)
                              .map((label) => ({
                                label: label.value,
                                value: label.value,
                              }))
                          : null
                      }
                      allowClear={true}
                      value={ValueType}
                    />
                  </div>
                  <div className="col-12 m-3">
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
                      onChange={(value) => setSetectPriority(value)}
                      options={priority.map((label) => ({
                        label: label,
                        value: label,
                      }))}
                      allowClear={true}
                      value={ValuePriority}
                    />
                  </div>
                  <div className="col-12 m-3">
                    {ValueType === "پشتیبانی دوره ها" ? (
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={(value) => setValueSelectCourse(value)}
                          options={allCourse.map((label) => ({
                            label: label.name,
                            value: label.name,
                          }))}
                          allowClear={true}
                          value={ValueSelectCourse}
                        />
                      </>
                    ) : null}
                  </div>
                  <div className="col-12 m-3">
                    <>
                      <label htmlFor="" className="fs-5 m-2 text-info">
                        ارسال ایمیل :
                      </label>

                      <Space direction="vertical">
                        <Switch
                          checkedChildren="اره ارسال کن"
                          unCheckedChildren="بیخیال"
                          onChange={(value) => setCheckInputSendEmail(value)}
                        />
                      </Space>
                    </>
                  </div>
                </div>
              </div>
              <div className="col mt-5">
                <div className="row justify-content-center align-items-end">
                  <div className="col">
                    <UPloader
                      size="larg"
                      VlueUPloader={VlueUPloader}
                      setVlueUPloader={setVlueUPloader}
                      setDataUPloader={setDataUPloader}
                      appendName="attached"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5  justify-content-start align-items-center">
              <div className="col-8 m-3">
                <label htmlFor="" className="fs-5 m-2 text-info">
                  عنوان :
                </label>
                <input
                  className="form-control  fs-4"
                  placeholder="عنوان تیکت را مشخص کنید"
                  type="text"
                  onChange={(event) => setValueInputTitel(event.target.value)}
                  value={ValueInputTitel}
                />
              </div>
            </div>
            <div className="row  mb-5 justify-content-start align-items-center">
              <div className="col m-3 mt-0">
                <label htmlFor="" className="fs-5 m-2 text-info">
                  توضیحات :
                </label>
                <textarea
                  value={ValueInputDescription}
                  cols={20}
                  rows={10}
                  className="form-control fs-4 "
                  placeholder="توضیحات خود را اینجا بنوسید"
                  type="text"
                  onChange={(event) =>
                    setValueInputDescription(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="row justify-content-center mb-5 pb-5">
              <div className="col-8 col-lg-5 mb-5 pb-5">
                <button
                  className={`btn btn-outline-warning fs-3 w-100 mb-5 ${
                    (ValueType === "پشتیبانی دوره ها"
                      ? ValueSelectCourse
                      : true) &&
                    ValueDepartment &&
                    ValueType &&
                    ValuePriority &&
                    ValueInputTitel &&
                    ValueInputDescription
                      ? ""
                      : "disabled"
                  }`}
                  onClick={SendTicketMainHandler}
                >
                  ارسال تیکت
                </button>
              </div>
            </div>
          </Tab>
        ) : null}
        <Tab eventKey="Showtiket" title="مشاهده تیکت ها">
          <FilterTiket
            allTiket={allTiket}
            setFilterTikets={setFilterTikets}
            Course={allCourse}
            FilterTikets={FilterTikets}
          />

          {FilterTikets.length ? (
            FilterTikets.slice(page, pageSize).map((main) => (
              <div className="p-2 m-3 pt-2 " key={main._id}>
                <CardTiket
                  {...main}
                  getDataHandelr={SendReplyTiket}
                  id_coment={main._id}
                  id_Box={main._id}
                  numberReplay={
                    TtiketSub.filter((sub) => sub.main_id === main._id).length
                  }
                  RemoveHandler={RemoveHandler}
                  // type="main"
                >
                  {TtiketSub.map(
                    (sub) =>
                      sub.main_id === main._id && (
                        <CardTiket
                          key={sub._id}
                          {...sub}
                          id_coment={main._id}
                          id_Box={sub._id}
                          getDataHandelr={SendReplyTiket}
                          RemoveHandler={RemoveHandler}
                        />
                      )
                  )}
                </CardTiket>
              </div>
            ))
          ) : TiketMain.length ? (
            TiketMain.slice(page, pageSize).map((main) => (
              <div className="p-2 m-3 pt-2 " key={main._id}>
                <CardTiket
                  {...main}
                  getDataHandelr={SendReplyTiket}
                  id_coment={main._id}
                  id_Box={main._id}
                  numberReplay={
                    TtiketSub.filter((sub) => sub.main_id === main._id).length
                  }
                  RemoveHandler={RemoveHandler}
                  // type="main"
                >
                  {TtiketSub.map(
                    (sub) =>
                      sub.main_id === main._id && (
                        <CardTiket
                          key={sub._id}
                          {...sub}
                          id_coment={main._id}
                          id_Box={sub._id}
                          getDataHandelr={SendReplyTiket}
                          RemoveHandler={RemoveHandler}
                        />
                      )
                  )}
                </CardTiket>
              </div>
            ))
          ) : (
            <div className="row justify-content-center m-5 p-5">
              <div className="col d-flex justify-content-center fs-2 fw-bolder">
                هیچ تیکت موجود نیست
              </div>
            </div>
          )}

          <div className="row justify-content-between mb-5 pb-5">
            <div className="col d-flex justify-content-center mb-5 pb-5">
              {TiketMain.lengt > 5 || FilterTikets.length > 5 ? (
                <Pagination
                  defaultCurrent={1}
                  defaultPageSize={5}
                  total={
                    FilterTikets.length ? FilterTikets.length : TiketMain.length
                  }
                  onChange={onChangePagination}
                />
              ) : null}
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
