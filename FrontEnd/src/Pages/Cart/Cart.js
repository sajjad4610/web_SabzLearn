import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import NavComp from "../../Components/NavBar/NavBar";
import ShopCard from "../../Components/ShoppingCart/ShopCard/ShopCard";
import CountUp from "react-countup";

import useContextUser from "../../ContextApi/UserContextApi";

import "./Cart.css";
import { Statistic } from "antd";
import Title from "../../Components/Title/Title";
import GetServises from "../../Servises/GetServises";
import { GetApi } from "../../Servises/Api";

export default function Cart() {
  const { isLogin, userInfo, setIsRefresh } = useContext(useContextUser);
  const [cardInfo, setcardInfo] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostDiscount, setTotalCostDiscount] = useState(0);
  const [RefreshCard, setRefreshCart] = useState(false);
  const [finshBuy, setFinshBuy] = useState(false);
  const [courseDiscountCard, setCourseDiscountCard] = useState([]);
  const [inputcourseDiscountCard, setInputCourseDiscountCard] = useState("");
  const [UseDiscountCard, setUseDiscountCard] = useState([]);

  const formatter = (value) => <CountUp end={value} separator="," />;

  const token = localStorage.getItem("user");

  useEffect(() => {
    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setcardInfo(result.card);
          if (result.card.length) {
            let ArrayAddCost = result.card.flatMap((e) => e.courseCost);
            let CostAdd = ArrayAddCost.reduce((s1, s2) => s1 + s2);
            setTotalCost(CostAdd);

            let ArrayAddDiscount = result.card.flatMap(
              (e) => e.courseCost * (e.courseDiscount / 100)
            );
            let DiscountAdd = ArrayAddDiscount.reduce((s1, s2) => s1 + s2);
            setTotalCostDiscount(DiscountAdd);
          } else {
            setTotalCost(0);
            setTotalCostDiscount(0);
          }
        });

        GetServises(GetApi.DiscountcodeApi).then((result) => {
          setCourseDiscountCard(result);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isLogin, RefreshCard]);

  const checkCodeDiscountHandler = () => {
    const Toast = Swal.mixin({
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      background: "#ff9",
    });

    let DiscountCardCode = courseDiscountCard.filter(
      (e) => e.codeValue === inputcourseDiscountCard
    );

    let ChekUseCode = UseDiscountCard.filter(
      (e) => e.codeValue === inputcourseDiscountCard
    );

    if (DiscountCardCode.length && DiscountCardCode[0].fewTimesValue > 0) {
      let ChekUseCodeUser = DiscountCardCode[0].UseUserEmeil.some(
        (e) => e === userInfo.user.email
      );
      if (!ChekUseCode.length && !ChekUseCodeUser) {
        let checkCodeCardInfo = cardInfo.filter((e) => {
          return e.courseId === DiscountCardCode[0].Coursesid;
        });

        if (checkCodeCardInfo.length) {
          let finalCostCourse =
            checkCodeCardInfo[0].courseCost -
            checkCodeCardInfo[0].courseCost *
              (checkCodeCardInfo[0].courseDiscount / 100);
          let discountCodeCost =
            finalCostCourse * (DiscountCardCode[0].percentValue / 100);
          setTotalCostDiscount(totalCostDiscount + discountCodeCost);
          Toast.fire({
            icon: "success",
            title: `شما از تخفیف ${DiscountCardCode[0].percentValue} درصدی برای  ${checkCodeCardInfo[0].courseName} استفاده کردید`,
          });
          setUseDiscountCard((prev) => [...prev, DiscountCardCode[0]]);
        } else {
          if (DiscountCardCode[0].Coursesid === "all") {
            setUseDiscountCard((prev) => [...prev, DiscountCardCode[0]]);

            setTotalCostDiscount(
              totalCostDiscount +
                (totalCost - totalCostDiscount) *
                  (DiscountCardCode[0].percentValue / 100)
            );
            Toast.fire({
              icon: "success",
              title: `شما از تخفیف ${DiscountCardCode[0].percentValue} درصدی برای  همه دوره های سبد خرید استفاده کردید`,
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "این کد قابل استفاده نیست",
            });
          }
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `شما قبلا از این کد استفاده کرده اید`,
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: `کد تخفیف اشتباه است`,
      });
    }
  };

  const finalOrderSellerHandler = async () => {
    let dataTime = moment().format();

    if (UseDiscountCard.length) {
      let subtractionFewTimesValue = UseDiscountCard.map((e) => {
        let a = e.fewTimesValue - 1;
        e.fewTimesValue = a;
        e.UseUserEmeil = userInfo.user.email;
        return e;
      });

      subtractionFewTimesValue.forEach(async (e) => {
        await fetch(
          `http://localhost:4000/v1/discountcode/updatadiscountcode/${e._id}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(e),
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((result) => {});
        if (subtractionFewTimesValue.length) {
          await fetch(
            `http://localhost:4000/v1/discountcode/updatadiscountcodeUseUserEmeil/${e._id}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ UseUserEmeil: e.UseUserEmeil }),
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((result) => {});
        }
      });
    }

    cardInfo.forEach(async (e) => {
      await fetch("http://localhost:4000/v1/user/addcousesUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: e.courseId,
          courseName: e.courseName,
          courseCost: e.courseCost,
          courseDiscount: e.courseDiscount,
          courseStatus: e.courseStatus,
          courseLink: e.courseLink,
          selectUserEmail: userInfo.user.email,
          courseImg: e.courseImg,
          DiscountCodePercent: UseDiscountCard.length
            ? UseDiscountCard.filter(
                (Discount) => Discount.Coursesid === e.courseId
              ).length
              ? UseDiscountCard.filter(
                  (Discount) => Discount.Coursesid === e.courseId
                )[0].percentValue
              : 0
            : 0,
          dataTime,
          userId: isLogin ? userInfo.user.userid : "",
          userName: isLogin ? userInfo.user.username : "",
          idAddCourse: isLogin ?`${userInfo.user.userid}_${e.courseId}`:"",
        }),
      })
        .then((res) => res.json())
        .then((result) => {});

      await fetch(
        `http://localhost:4000/v1/course/SalesNumber/add/${e.courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ salesnumberdata: 1 }),
        }
      )
        .then((res) => res.json())
        .then((result) => {});

      await fetch(
        `http://localhost:4000/v1/user/removecousesCard/${userInfo.user.userid}/${e.idcard}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setRefreshCart((prev) => !prev);
          setIsRefresh((prev) => !prev);
          setFinshBuy(true);
        });
    });
  };

  return (
    <div className="bg-light ">
          <Title text={"خرید"} />

      {!isLogin && <Navigate to="/" />}
      <Header />
      <NavComp />
      {!finshBuy ? (
        <div className="row m-lg-5 p-lg-5 justify-content-center ">
          <div className="col-12 col-xl-8  p-5 bg-white rounded-5  border border-3">
            {cardInfo.map((e) => (
              <ShopCard
                key={e.idcard}
                Titel={e.courseName}
                CoursePrice={e.courseCost}
                CourseDiscount={e.courseDiscount}
                CostMain={e.courseDiscount ? e.courseCost : ""}
                Img={e.courseImg}
                dataTime={e.dataTime}
                userEmail={e.userEmail}
                courseId={e.courseId}
                courseStatus={e.courseStatus}
                userid={isLogin && userInfo.user.userid}
                idcard={e.idcard}
                courseLink={e.courseLink}
                setRemoveRefresh={setRefreshCart}
              ></ShopCard>
            ))}
            <div className="row row-cols-1 row-cols-lg-2   align-items-center justify-content-center bg-info bg-opacity-10 rounded-5 m-2 mt-4">
              <div className="col d-flex flex-column justify-content-center align-items-start ">
                <div className="col border-bottom d-flex align-items-center  mb-2 mt-2 ms-1 w-100">
                  <span className="fs-2 text-dark me-1">
                    {" "}
                    جمع کل دوره ها :{" "}
                  </span>
                  <Statistic
                    value={Math.ceil(totalCost)}
                    precision={2}
                    formatter={formatter}
                    valueStyle={{ color: "green", fontSize: "2.2rem" }}
                  />
                </div>
                <div className="col border-bottom d-flex align-items-center  mb-2 mt-3 ms-1 w-100">
                  <span className="fs-2 text-dark me-1"> کل تخفیف : </span>
                  <Statistic
                    value={Math.ceil(totalCostDiscount)}
                    precision={2}
                    formatter={formatter}
                    valueStyle={{ color: "red", fontSize: "2.2rem" }}
                  />
                </div>
                <div className="col border-bottom d-flex align-items-center  mb-2 mt-2 ms-1 w-100">
                  <span className="fs-2 text-dark me-1">
                    {" "}
                    قیمت قابل پرداخت :{" "}
                  </span>

                  <Statistic
                    value={Math.ceil(totalCost - totalCostDiscount)}
                    precision={2}
                    formatter={formatter}
                    valueStyle={{ color: "green", fontSize: "2.2rem" }}
                  />
                </div>
              </div>
              <div className="col d-flex align-items-center justify-content-center order-first order-lg-last ">
                {totalCost ? (
                  <div className="input-group col ms-2 mb-5 mt-5">
                    <input
                      onChange={(event) =>
                        setInputCourseDiscountCard(event.target.value)
                      }
                      value={inputcourseDiscountCard}
                      id="code"
                      type="text"
                      placeholder="کد تخفیف"
                      className="form-control fs-3 m-0"
                    />
                    <button
                      className="btn btn-warning "
                      onClick={checkCodeDiscountHandler}
                    >
                      {" "}
                      اعمال کد تخفیف
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col col-md-6 d-flex justify-content-center m-4">
                <button
                  className="btn btn-outline-danger bg-opacity-25 fs-3 w-100"
                  onClick={finalOrderSellerHandler}
                >
                  نهایی کردن سفارش
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row flex-column justify-content-center border rounded-5 shadow  m-5 p-5 finshBuyBackgrand ">
          <div className="col m-5 ms-0 p-5 ps-0 d-flex flex-column justify-content-center align-items-center">
            <div className="row justify-content-end align-items-end ">
              <div className="col justify-content-end d-flex">
                <span className="fs-1  text-dark fw-bolder ">
                  {" "}
                  از خرید شما سپاس گذاریم{" "}
                </span>
              </div>
            </div>
            <div className="row justify-content-end align-items-center mt-5 ms-5">
              <div className="col d-flex flex-column ms-5  ">
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-2 text-danger me-2  "></i> دوره
                  های خرید داری شده از هم اکنون در دسترس شماست
                </span>
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-2 text-danger me-2  "></i>
                  سوال های خود را فقط در قسمت پرسش و پاسخ ببپرسید
                </span>
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-2 text-danger me-2  "></i> تضمین
                  ما تا همیشه در کنار شما
                </span>
              </div>
            </div>
          </div>
          <div className="col m-3  d-flex justify-content-center ">
            <Link to="/" className=" btn btn-info w-50 fs-4 text-white">
              بازگشت به صفحه ی اصلی
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
