import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { UserOutlined } from "@ant-design/icons";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import InputUserAccount from "../../../Components/UserPanel/InputUserAccount/InputUserAccount";
import userContext from "../../../ContextApi/UserContextApi";
import UserPanelContextApi from "../../../ContextApi/UserPanelContextApi";
import { Avatar, Space } from "antd";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";
export default function UserAccount() {
  let { Users } = useContext(UserPanelContextApi);
  const { userInfo, isLogin } = useContext(userContext);
  const [User, setUser] = useState("");

  const [ValueUserName, setValueUserName] = useState("");
  const [ValueEmail, setValueEmail] = useState("");
  const [ValuePhone, setValuePhone] = useState("");
  const [ValuerName, setValueName] = useState("");
  const [ValueFamilyName, setValueFamilyName] = useState("");
  const [ValueGitub, setValueGitub] = useState("");

  const [ValueNowPass, setValueNowPass] = useState("");
  const [ValuePass, setValuePass] = useState("");
  const [ValuePassRepit, setValuePassRepit] = useState("");
  const [VlueUPloader, setVlueUPloader] = useState("");

  const [ResultPass, setResultPass] = useState([]);
  const [ResultInfo, setResultInfo] = useState([]);

  let token = localStorage.getItem("user");

  useEffect(() => {
    isLogin &&
      GetServises(GetApi.UsersApi).then((alluser) => {
        let user = alluser.filter((e) => e._id === userInfo.user.userid);

        setUser(user[0]);
        setValueUserName(user[0].username);
        setValueEmail(user[0].email);
        setValuePhone(user[0].phone);
        setVlueUPloader(user[0].avatar);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Users, ResultPass, ResultInfo]);

  const inputUserNameHandeler = (Value) => {
    setValueUserName(Value);
  };
  const inputNameHandeler = (Value) => {
    setValueName(Value);
  };
  const inputFamilyNameHandeler = (Value) => {
    setValueFamilyName(Value);
  };
  const inputEmailHandeler = (Value) => {
    setValueEmail(Value);
  };
  const inputGitabHandeler = (Value) => {
    setValueGitub(Value);
  };
  const inputPhoneHandeler = (Value) => {
    setValuePhone(Value);
  };
  const inputNowPassHandeler = (Value) => {
    setValueNowPass(Value);
  };
  const inputPassHandeler = (Value) => {
    setValuePass(Value);
  };
  const inputPassRepitHandeler = (Value) => {
    setValuePassRepit(Value);
  };

  const sendChangePassHandler = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    let DataPassUser = {
      nowPass: ValueNowPass,
      password: ValuePass === ValuePassRepit ? ValuePass : "",
    };
    fetch(
      `http://localhost:4000/v1/user/updatePassUser/${userInfo.user.userid}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DataPassUser),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.length && setResultPass(result[0].message);
        result.length &&
          Toast.fire({
            icon: result[0].err === false ? "success" : "error",
            title: result[0].message,
          });
      });
  };
  const sendChangeInfoHandler = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    let DataInfoUser = {
      username: ValueUserName,
      email: ValueEmail,
      phone: ValuePhone,
      name: ValuerName,
      family: ValueFamilyName,
      github: ValueGitub,
    };

    fetch(
      `http://localhost:4000/v1/user/updateInfoUser/${userInfo.user.userid}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DataInfoUser),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.length && setResultInfo(result[0].message);
        result.length &&
          Toast.fire({
            icon: result[0].err === false ? "success" : "error",
            title: result[0].message,
          });
      });
  };

  const UploadAvatarHandler = async () => {
    const { value: file } = await Swal.fire({
      title: "عکس مورد نظر انتخاب کنید",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const data = new FormData();
      data.append("avatar", file);
      await fetch(
        `http://localhost:4000/v1/user/uploadAvatar/${userInfo.user.userid}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      )
        .then((resPhoto) => {
          return resPhoto.json();
        })
        .then((rsultPhoto) => {
          setVlueUPloader(rsultPhoto.uploaded);
          Swal.fire({
            imageUrl: rsultPhoto.uploaded,
            title: "عکس مورد نظر ارسال شد",
            imageAlt: "عکس مورد نظر ارسال شد",
          });
        });
    }
  };

  return (
    <div className="mb-5 mt-5">
      <div className="mb-5">
        <SectionHeader title=" حساب کاربری" />
      </div>
      <Tabs
        defaultActiveKey="editeUser"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="editeUser" title="ویرایش اطلاعات">
          <div className="m-5 d-flex flex-column ">
            <div
              className="row justify-content-center align-items-center  p-3    rounded-5"
              style={{ backgroundColor: "rgba(295, 299, 299,1.0)" }}
            >
              <div
                className="row d-flex flex-column justify-content-center align-items-center  p-3 ps-5 rounded-5 shadow"
                style={{ backgroundColor: "rgba(10, 61, 98,1.0)" }}
              >
                <div className="col d-flex justify-content-center">
                  <div className="mb-5">
                    <span className="text-white fs-1 mt-5 pt-5">
                      تغییر آواتار
                    </span>
                  </div>
                </div>
                <div className="col d-flex justify-content-center ">
                  <div>
                    <div className="row flex-column justify-content-center align-items-center mt-2 mb-5 w-100 ">
                      <div className="d-flex justify-content-center align-items-center">
                        <Space wrap className="mt-5 " size={16}>
                          <Avatar
                            src={VlueUPloader}
                            style={{ backgroundColor: "white" }}
                            size={224}
                            icon={<UserOutlined style={{ color: "#487eb0" }} />}
                          />
                        </Space>
                      </div>
                      <div className="col-12 d-flex justify-content-center   mt-4 w-100">
                        <button
                          onClick={UploadAvatarHandler}
                          className="btn  fa  fs-4 p-3 btn-outline-light w-100 fa-camera"
                        >
                          {" "}
                          <span className="ms-3">ارسال</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col w-100   p-3 pe-5 ">
                <div className="mb-4">
                  <SectionHeader title="ویرایش حساب کاربری" />
                </div>
                <div className="row justify-content-start align-items-center w-100">
                  <div className="col d-flex flex-column justify-content-start align-items-startw-100 ">
                    <div className="col w-100">
                      <div className="row  row-cols-1 row-cols-md-2">
                        <div className="col">
                          <InputUserAccount
                            LabelName="نام"
                            placeholder=" نام خود را وارد کنید "
                            errMessage={""}
                            inputHandeler={inputNameHandeler}
                            defaultValue={User.name}
                          />
                        </div>
                        <div className="col">
                          <InputUserAccount
                            LabelName=" نام خانوادگی"
                            placeholder="  نام خانوادگی خود را وارد کنید "
                            errMessage={""}
                            inputHandeler={inputFamilyNameHandeler}
                            defaultValue={User.family}
                          />
                        </div>
                      </div>
                      <div className="row  row-cols-1 row-cols-md-2">
                        <div className="col">
                          <InputUserAccount
                            LabelName="نام کاربری"
                            placeholder=" نام کاربری خود را وارد کنید "
                            errMessage={""}
                            inputHandeler={inputUserNameHandeler}
                            defaultValue={User.username}
                          />
                        </div>
                        <div className="col">
                          <InputUserAccount
                            LabelName="ایمیل"
                            placeholder=" ایمیل خود را وارد کمید  "
                            errMessage={""}
                            inputHandeler={inputEmailHandeler}
                            defaultValue={User.email}
                          />
                        </div>
                      </div>
                      <div className="row  row-cols-1 row-cols-md-2">
                        <div className="col">
                          <InputUserAccount
                            LabelName="Github"
                            placeholder=" لینک Github خود را وارد کنید  "
                            errMessage={""}
                            inputHandeler={inputGitabHandeler}
                            defaultValue={User.github}
                          />
                        </div>
                        <div className="col">
                          <InputUserAccount
                            LabelName="شماره تلفن"
                            placeholder=" شماره تلفن"
                            errMessage={""}
                            inputHandeler={inputPhoneHandeler}
                            defaultValue={User.phone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center   mt-5 mb-5">
                  <button
                    className={`btn btn-outline-success fs-3 w-75 ${
                      !ValueUserName || !ValueEmail || !ValuePhone
                        ? "disabled"
                        : ""
                    }`}
                    onClick={sendChangeInfoHandler}
                  >
                    ویرایش اطلاعات
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab eventKey="ChangePss" title="تغییر رمز عبور">
          <div
            className="row justify-content-center mt-5 align-items-center w-100  shadow-lg rounded-4"
            style={{ backgroundColor: "rgba(10, 61, 98,1.0)" }}
          >
            <div
              className="col-10 mt-5  rounded-4  d-flex flex-column justify-content-start align-items-center "
              style={{ backgroundColor: "" }}
            >
              <div className="col-8">
                <InputUserAccount
                  LabelName="رمز عبور فعلی"
                  placeholder=" رمز عبور فعلی"
                  errMessage={""}
                  inputHandeler={inputNowPassHandeler}
                />
              </div>
              <div className="col-8">
                <InputUserAccount
                  LabelName="رمز عبور جدید"
                  placeholder=" رمز عبور جدید"
                  errMessage={
                    ValuePass && ValuePass.length < 8
                      ? "رمز عبور باید خداقل 8 کاراکتر باشد"
                      : ""
                  }
                  inputHandeler={inputPassHandeler}
                />
              </div>
              <div className="col-8">
                <InputUserAccount
                  LabelName="تکرار رمز عبور جدید "
                  placeholder=" تکرار رمز عبور جدید"
                  errMessage={
                    ValuePass !== ValuePassRepit && ValuePassRepit.length >= 8
                      ? "تکرار رمز عبور درست نیست"
                      : ValuePassRepit && ValuePassRepit.length < 8
                      ? "رمز عبور باید خداقل 8 کاراکتر باشد"
                      : ""
                  }
                  inputHandeler={inputPassRepitHandeler}
                />
              </div>
              <div />
            </div>
            <div className="row justify-content-center  disabled  mt-5 mb-5">
              <button
                className={`btn btn-outline-info text-white  fs-3 w-50 ${
                  ValuePass.length < 8 ||
                  ValuePass.length < 8 ||
                  ValueNowPass.length < 8 ||
                  ValuePass !== ValuePassRepit
                    ? "disabled"
                    : ""
                }`}
                onClick={sendChangePassHandler}
              >
                تغییر رمز
              </button>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
