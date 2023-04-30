import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserPanelContextApi from "../../../ContextApi/UserPanelContextApi";

export default function UserHome() {
  let {  isLogin, userInfo } = useContext(UserPanelContextApi);

  const date = new Date();
  const dateJ = new Date(date);
  let dateJalali = new Intl.DateTimeFormat("fa-IR").format(dateJ);
  return (
    <div>
      <div
        className="row   mb-5 p-2 shadow rounded-5"
        style={{ backgroundColor: "rgba(10, 61, 98,1.0)" }}
      >
        <div className="col-12 border-bottom  border-3 pt-4 pb-4">
          <h1 className=" fw-bolder text-white ">پنل کاربری</h1>
        </div>
        <div className="col d-flex justify-content-end mt-3  mb-1 pb-1">
          <span className="fs-1 me-2 text-warning  ">{dateJalali}</span>
        </div>
        <div className="row m-3 justify-content-center">
          <div className="col-12 d-flex justify-content-center">
            <img
              className="img-thumbnail"
              src="https://sabzlearn.ir/wp-content/uploads/2023/03/offer-banner-green-1.png"
              alt=""
            />
          </div>
        </div>
        <div className="col mt-5 mb-3 pb-2">
          <span className="fs-2 text-white ">
            {" "}
            <span className="fs-2 text-warning">
              {isLogin ? userInfo.user.username : null}
            </span>{" "}
            عزیز خوش آمدی....{" "}
          </span>
        </div>
        <div className="row mb-3 pb-3 ">
          <div className="col">
            <p className="fs-2 m-3 mb-5 text-white ">
              از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
              مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
              کاربری و کلمه عبور خود را ویرایش کنید.
            </p>
          </div>
        </div>
        <div className="row justify-content-center mb-5 pb-5 row-cols-1  row-cols-lg-3 ">
          <div className="col  btn btn-outline-info border-3 border-info rounded-5 border m-3 ">
            <Link
              className="text-decoration-none text-white p-5  fs-2"
              to="purchasedcourses"
            >
              دوره های خریداری شده
            </Link>
          </div>
          <div className="col  btn btn-outline-info border-3 border-info rounded-5 border m-3 ">
            <Link
              className="text-decoration-none text-white p-5  fs-2"
              to="account"
            >
              حساب کاربری من
            </Link>
          </div>
          <div className="col  btn btn-outline-info border-3 border-info rounded-5 border m-3 ">
            <Link
              className="text-decoration-none text-white p-5  fs-2"
              to="bill"
            >
              صورت حساب
            </Link>
          </div>
          <div className="col  btn btn-outline-info border-3 border-info rounded-5 border m-3 ">
            <Link
              className="text-decoration-none text-white p-5  fs-2"
              to="wallet"
            >
              کیف پول
            </Link>
          </div>
          <div className="col  btn btn-outline-info border-3 border-info rounded-5 border m-3 ">
            <Link
              className="text-decoration-none text-white p-5  fs-2"
              to="ticket"
            >
              تیکت ها
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
