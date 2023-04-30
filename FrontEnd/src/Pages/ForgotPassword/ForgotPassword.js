import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import Loading from "../../Components/Loading/Loading";
import Title from "../../Components/Title/Title";

export default function ForgotPassword() {

  const [loading, setLoading] = useState(false);
  const [goToLogin, setGoToLogin] = useState(false);

  const [inputEmail, setInputEmail] = useState("");

  let forgetHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      email: inputEmail,
    };

    await fetch(`http://localhost:4000/v1/auth/forgotpass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (resultForgot) => {
        if (resultForgot.successful) {
     
          setLoading(false);
          Swal.fire({
            title: 'ایمیل و چک کن',
            text: resultForgot.successful,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'برو به صفحه لاگین',
            cancelButtonText:"بیخیال"
          }).then((result) => {
            if (result.isConfirmed) {
              setGoToLogin(true)
            }
          })
        }

      });
  };


  return (
    <>
          <Title text={"بازیابی رمز"} />

      <Header />
      <NavBar />
      {loading ? <Loading/>:null}
      {goToLogin ? <Navigate to='/login'/>:null}

      <section className="login-register">
        <div className="login">
          <span className="login__title"> رمز عبور را فراموش کرده اید؟</span>

          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link " to="/register">
              ثبت نام
            </Link>
          </div>

          <form action="#" className="login-form" onSubmit={forgetHandeler}>
            <div className="login-form__username">
              <input
                onChange={(event) => {
                  setInputEmail(event.target.value);
                }}
                className="login-form__username-input"
                type="text"
                placeholder=" آدرس ایمیل"
              />
              <i className="login-form__username-icon fa fa-envelope"></i>
            </div>

            <button className="login-form__btn " type="submit">
              <i className="login-form__btn-icon fa fa-sign-in"></i>
              <span className="login-form__btn-text">درخواست رمز</span>
            </button>
            <div className=" row login-form__password-setting">
              <label className=" col d-flex justify-content-end login-form__password-forget">
                <Link
                  className="btn btn-light text-info  text-decoration-none fs-4"
                  to="/login"
                >
                  Login
                </Link>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
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
