import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";



import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";

import "./Register.css";
import LoginRedirct from "../../Components/LoginRedirct/LoginRedirct";
import EditANDRegisterUserHOC from "../../Components/HOC/EditANDRegisterUSER-Hoc/EditANDRegisterUserHOC";
import Title from "../../Components/Title/Title";

function Register({
  setFormHandeler,
  getUserValueHandler,
  getEmailValueHandler,
  getPhoneValuHandler,
  getPassValueHandler,
  allValid,
  roleValueHandeler,
  setValueUserName,
  setValueEmail,
  setValuePhone,
  setValuePass,
  setValueUserRole,
  ValidUserName,
  ValidEmail,
  ValidPhone,
  ValidPass,
  ValidUserRole,
  setValidUserName,
  setValidEmail,
  setValidPhone,
  setValidPass,
  setValidUserRole,
  api,
  message,
}) {
  const [showPas, setShowPass] = useState(true);
  const showPssHandeler = () => {
    setShowPass((prev) => !prev);
  };
  return (
    <>
            <Title text={'ثبت نام  '}/>

      <LoginRedirct></LoginRedirct>

      {!allValid && <Navigate to="/login" />}

      <Header />
      <NavBar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form" onSubmit={setFormHandeler}>
            <div className="login-form__username ">
              <input
                onChange={getUserValueHandler}
                className="login-form__username-input "
                type="text"
                placeholder="نام کاربری"
              />
              <i className="login-form__username-icon fa fa-user"></i>
              <h5 className="text-danger">
                {ValidUserName.length > 0 ? ValidUserName[0].message : ""}
              </h5>
            </div>
            <div className="login-form__password">
              <input
                onChange={getEmailValueHandler}
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
              <h5 className="text-danger">
                {ValidEmail.length > 0 ? ValidEmail[0].message : ""}
              </h5>
            </div>
            <div className="login-form__password">
              <input
                onChange={getPhoneValuHandler}
                className="login-form__password-input"
                type="text"
                placeholder="شماره موبایل"
              />
              <i className="login-form__password-icon fa fa-mobile fs-1 me-1 bottom-50"></i>
              <h5 className="text-danger">
                {ValidPhone.length > 0 ? ValidPhone[0].message : ""}
              </h5>
            </div>
            <div className="login-form__password">
              <input
                onChange={getPassValueHandler}
                className="login-form__password-input "
                type={showPas ? "password" : "text"}
                placeholder="رمز عبور"
              />
              <i
                className={`login-form__password-icon   ${
                  showPas
                    ? "fa fa-eye-slash text-warning "
                    : "fa fa-eye text-success"
                } `}
                onClick={showPssHandeler}
              ></i>
              <h5 className="text-danger">
                {ValidPass.length > 0 ? ValidPass[0].message : ""}
              </h5>
            </div>
            <button className="login-form__btn" type="submit">
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item ">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default EditANDRegisterUserHOC(Register);
