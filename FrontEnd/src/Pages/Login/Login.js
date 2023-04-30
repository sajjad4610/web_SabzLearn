import React, { useContext, useReducer, useState } from "react";

import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";
import GetMe from "../../customUse/getMe";

import userContext from "../../ContextApi/UserContextApi";

import "./Login.css";
import LoginRedirct from "../../Components/LoginRedirct/LoginRedirct";
import Title from "../../Components/Title/Title";

export default function Login() {
  const { login } = useContext(userContext);
  const [showPas, setShowPass] = useState(true);

  const [err, setErr] = useState("");

  const [loginInput, dispatch] = useReducer(
    (state, action) => {
      return {
        emailInput: action.eveneMail,
        passInput: action.evenPass,
      };
    },
    { emailInput: "", passInput: "" }
  );

  const showPssHandeler = () => {
    setShowPass((prev) => !prev);
  };

  let DataLogin = {
    email: loginInput.emailInput,
    password: loginInput.passInput,
  };

  const loginHandeler = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataLogin),
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.token) {
          localStorage.setItem("user", result.token);
          GetMe(result.token, login);
          setErr("");
        } else if (result.err) {
          setErr(result.err);
        } else {
          setErr("");
        }
      });
  };

  return (
    <>
        <Title text={'ورود  '}/>

      <LoginRedirct></LoginRedirct>
      <Header />
      <NavBar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link " to="/register">
              ثبت نام
            </Link>
          </div>
          {err && (
            <Alert className="w-100" variant={err ? "danger" : "success"}>
              {err}
            </Alert>
          )}
          <form action="#" className="login-form" onSubmit={loginHandeler}>
            <div className="login-form__username">
              <input
                onChange={(event) => {
                  dispatch({
                    type: `EMAIL`,
                    eveneMail: `${event.target.value}`,
                    evenPass: `${loginInput.passInput}`,
                  });
                }}
                className="login-form__username-input"
                type="text"
                placeholder="آدرس ایمیل"
              />
              <i className="login-form__username-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <input
                onChange={(event) => {
                  dispatch({
                    type: `PASS`,
                    evenPass: `${event.target.value}`,
                    eveneMail: `${loginInput.emailInput}`,
                  });
                }}
                className="login-form__password-input"
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
            </div>

            <ReCAPTCHA
              type="image"
              size="invisible"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            />

            <button className="login-form__btn " type="submit">
              <i className="login-form__btn-icon fa fa-sign-in"></i>
              <span className="login-form__btn-text">ورود</span>
            </button>
            <div className=" row login-form__password-setting">
              <label className=" col login-form__password-forget">
                <Link
                  className="login-form__password-forget-link"
                  to="/forgotpass"
                >
                  رمز عبور را فراموش کرده اید؟
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
