import React from "react";
import { Link } from "react-router-dom";
import SocialNetworks from "../SocialNetworks/SocialNetworks";

import "./Footer.css";
export default function Footer() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-around align-items-baseline footer_bg rounded shadow-lg">
        <div className="col-12 mt-4 col-xl-4 d-flex flex-column justify-content-center align-items-start ">
          <h2 className="mb-3 p-1 fw-bolder ">درباره ما</h2>
          <p className="fs-5 p-3 text-secondary">
            وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در
            فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود
            که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل
            قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز
            آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت
            میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره
            و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست
            که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در
            آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که
            مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه
            دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند !
          </p>
        </div>
        <div className="col-12 mt-4 col-xl-4 d-flex flex-column justify-content-center align-items-start ">
          <h2 className="mb-3 p-1 fw-bolder ">آخرین مطالب</h2>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/pytoon"
          >
            نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/"
          >
            چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/"
          >
            آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام بهگام و
            تصویری
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/"
          >
            بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسیمعایب و
            مزایا
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/"
          >
            معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزشرایگان
          </Link>
        </div>
        <div className=" col-12 mt-4 col-xl-2 d-flex flex-column justify-content-center align-items-start ">
          <h2 className="mb-3 p-1 fw-bolder ">دسترسی سریع</h2>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/frontend/html"
          >
            آموزش HTML
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/frontend/css"
          >
            {" "}
            آموزش CSS
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/frontend/Javascript"
          >
            آموزش جاوااسکریپت
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/frontend/bootstrap"
          >
            آموزش بوت استرپ
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/frontend/react"
          >
            {" "}
            آموزش ریکت
          </Link>
          <Link
            className="fs-5 m-2  text-decoration-none text-secondary footer_Link "
            to="/course/backend/python"
          >
            آموزش پایتون
          </Link>
        </div>
        <div className="col-12 mt-4 col-xl-2 d-flex flex-column justify-content-center align-items-start ">
          <h2 className="mb-3 p-1 fw-bolder text-center ">ارتباط با ما</h2>
          <div>
            <SocialNetworks
              Titel="ما را در فیسبوک دنبال کنید"
              fontIcon="fa-facebook-f"
              Url="/#"
			  color={'text-info'}
			  size={"fs-1"}
            />
            <SocialNetworks
              Titel="ما را در اینستاگرام دنبال کنید"
              fontIcon="fa-instagram"
              Url="/#"
			  color={'text-info'}
			  size={"fs-1"}
            />
            <SocialNetworks
              Titel="ما را در تلگرام دنبال کنید"
              fontIcon="fa-telegram"
              Url="/#"
			  color={'text-info'}
			  size={"fs-1"}
            />
            <SocialNetworks
              Titel="ما را در تویتر دنبال کنید"
              fontIcon="fa-twitter"
              Url="/#"
			  color={'text-info'}
			  size={"fs-1"}
            />
            <SocialNetworks
              Titel="ما را در یوتیوب دنبال کنید"
              fontIcon="fa-youtube"
              Url="/#"
			  color={'text-info'}
			  size={"fs-1"}
            />
          </div>
          <span className="fs-5 mt-4 text-secondary ">{`آدرس : تهران - امیریه - ساختمان سبزلرن`}</span>
          <span className="fs-5 mt-4 text-secondary ">{`ایمیل : sabzlearn@gmail.com`}</span>
          <span className="fs-5 mt-4 text-secondary  ">{`تماس : 09115970014`}</span>
        </div>
        <div className="col col-6 col-xl-3 d-flex flex-column justify-content-center align-items-center mt-5 ">
          <h2 className="mb-3 p-1 fw-bolder ">میانبر :</h2>
          <Link
            className="fs-5 m-2 border-bottom border-2 border-info w-50 pb-3  text-decoration-none text-secondary footer_Link "
            to="/course/shop/all"
          >
            فروشگاه
          </Link>
          <Link
            className="fs-5 m-2 border-bottom border-2  border-info w-50 pb-3 text-decoration-none text-secondary footer_Link "
            to="/articles/Main"
          >
            مقالات
          </Link>
          <Link
            className="fs-5 m-2 border-bottom border-2  border-info w-50 pb-3 text-decoration-none text-secondary footer_Link "
            to="/course/backend/python"
          >
            آموزش پایتون
          </Link>
        </div>
        <div className="col col-6 col-xl-3 d-flex flex-column justify-content-center align-items-center  mt-5">
          <h2 className="mb-3 p-1 fw-bolder ">آشنایی با ما :</h2>

          <Link
            className="fs-5 m-2 border-bottom border-2  border-info w-50 pb-3 text-decoration-none text-secondary footer_Link "
            to="/aboutus/termsandrules"
          >
            قوانین و مقررات
          </Link>
          <Link
            className="fs-5 m-2 border-bottom border-2  border-info w-50 pb-3 text-decoration-none text-secondary footer_Link "
            to="/aboutus/contactus"
          >
            ارتباط با ما
          </Link>
          <Link
            className="fs-5 m-2 border-bottom border-2  border-info w-50 pb-3 text-decoration-none text-secondary footer_Link "
            to="/aboutus/contactus"
          >
            دربـــاره ما
          </Link>
        </div>
        <div className="col col-6 col-xl-3 d-flex flex-column justify-content-center align-items-center mt-5 ">
          <h2 className="mb-3 p-1 fw-bolder ">ساعات کاری:</h2>
          <span className="fs-5 mt-4 text-secondary  ">
            شنبه تا چهارشنبه 8 صبح تا 18 عصر
          </span>
          <span className="fs-5 mt-4 text-secondary  ">
            پنج شنبه‌ها ساعت 8 صبح تا 12 ظهر
          </span>
        </div>
        <div className="col col-6 col-xl-3 d-flex flex-column justify-content-center align-items-center  mt-5">
          <h2 className="mb-3 p-1 fw-bolder ">اعتماد به ما</h2>
          <img src="./images/namadEtemad/enamad-two-star.png" alt="" />
        </div>
      </div>

      <div className="row justify-content-center align-items-center footerEndBg mb-5 ">
        <div className="col-12 m-2 d-flex flex-column justify-content-center  align-items-center">
          <h3 className=" fw-bolder text-center ">
            کلیه حقوق برای آکادمی آموزش برنامه نویسی{" "}
            <span className="text-success fs-1">سبز لرن</span> محفوظ است.
          </h3>
        </div>
      </div>
    </div>
  );
}
