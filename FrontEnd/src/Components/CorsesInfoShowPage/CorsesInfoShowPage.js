import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { Tab, Tabs } from "react-bootstrap";

import SocialNetworks from "../SocialNetworks/SocialNetworks";
import SectionHeader from "../SectionHeader/SectionHeader";
import StarRater from "../StarRater/StarRater";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import useContextUser from "../../ContextApi/UserContextApi";
import CourseInfoTabs from "../CourseInfoTabsComment/CourseInfoTabsComment";
import CostCourses from "../CostCourses/CostCourses";

import CourseBox from "../CourseBox/CourseBox";

import "./CorsesInfoShowPage.css"
import GetServises from "../../Servises/GetServises";
const { Panel } = Collapse;
export default function CorsesInfo({
  FilterCourseInfo,
  FilterCourseSection,
  FilterCourseInfoShowComment,
}) {
  const { isLogin, userInfo, token, setIsRefresh } = useContext(useContextUser);
  const [checkCourseUser, setcheckCourseUser] = useState([]);
  const [checkCartUser, setcheckCartUser] = useState([]);
  const [messageRate, setMessageRate] = useState("");
  const [topic, setTopic] = useState([]);
  const [info, setInfo] = useState([]);
  const [valid, setValid] = useState("");

  useEffect(() => {
    isLogin &&
    GetServises(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`).then((result) => {
      let checkCourseUser = result.courses.filter(
        (e) => e.courseId === FilterCourseInfo._id
      );
      setcheckCourseUser(checkCourseUser);
      let checkCartUser = result.card.filter(
        (e) => e.courseId === FilterCourseInfo._id
      );
      setcheckCartUser(checkCartUser);
    });

      

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, FilterCourseInfo, valid]);

  useEffect(() => {
    let getTopic = FilterCourseInfo.Coursetopics.filter(
      (e) => e.nameInfo === "سرفصل"
    );
    let getInfo = FilterCourseInfo.Coursetopics.filter(
      (e) => e.nameInfo !== "سرفصل"
    );
    setTopic(getTopic);
    setInfo(getInfo);
  }, [FilterCourseInfo]);

  const AddToCartHandler = async (event) => {
    let dataTime = moment().format("LLL");
    const dataCoursesAdd = {
      courseId: FilterCourseInfo._id,
      courseName: FilterCourseInfo.name,
      courseCost: FilterCourseInfo.cost,
      courseDiscount: FilterCourseInfo.discount,
      courseStatus: FilterCourseInfo.status,
      courseImg: FilterCourseInfo.image,
      courseLink: FilterCourseInfo.link,
      userEmail: userInfo.user.email,
      dataTime,
      idcard: uuidv4(),
    };
    await fetch("http://localhost:4000/v1/user/addcousesCard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataCoursesAdd),
    })
      .then((res) => res.json())
      .then((result) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: result.message,
        });
        setIsRefresh((prev) => !prev);
        setValid(result);
      });
  };

  return (
    <div className="bg-light F">
      <div className="row mt-4 mb-5 ms-3 ">
        <SectionHeader
          desc={FilterCourseInfo.titel}
          title={FilterCourseInfo.name}
        />
      </div>
      <div className="row mb-4  ">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <video
              controls
              className="img-thumbnail   w-100"
              poster={FilterCourseInfo.image}
              src={
                FilterCourseInfo.Coursetopics.length &&
                FilterCourseInfo.Coursetopics.filter(
                  (e) => e.nameInfo !== "سرفصل"
                ).length &&
                FilterCourseInfo.Coursetopics.filter(
                  (e) => e.nameInfo !== "سرفصل"
                )[0].infoUrl
              }
              preload="none"
            ></video>
          </div>
          <div className="col   ">
            <div className="row ">
              <span className="text-white bg-info rounded-3 p-3">
                {`    پس از خرید، بلافاصله به محتوای دوره دسترسی خواهید داشت و
                میتوانید دوره را مشاهده و یا دانلود کنید.
                `}
              </span>
            </div>
            <div className="row flex-row row-cols-1 row-cols-sm-2  justify-content-center align-items-center mt-4 m-3 w-100 ">
              <div className="col d-flex flex-column ">
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-3 text-warning me-2  "></i>{" "}
                  پشتیبـــانی دائــــمی محصولات
                </span>
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-3 text-warning me-2  "></i>
                  پــروژه مــحور بودن دوره هــــا
                </span>
                <span className=" text-secondary mb-3">
                  <i className="fa fa-cubes fs-3 text-warning me-2  "></i> تضمین
                  کیــفیت کلیـه محصولات
                </span>
              </div>
              <div className="col d-flex justify-content-end ">
                <CostCourses
                  CoursePrice={FilterCourseInfo.cost}
                  CourseDiscount={FilterCourseInfo.discount}
                />
              </div>
            </div>
            <div className="row justify-content-center align-items-center mt-4 m-3 w-100  ">
              <div className="col justify-content-center ">
                <a
                  href="#SectionInfo"
                  className="btn btn-outline-success fs-5 fw-bold mt-5 w-75"
                >
                  دیدن ویدیو ها
                </a>
              </div>
              <div className="col justify-content-center ">
                {!isLogin ? (
                  <Link
                    to="/login"
                    className="btn btn-outline-warning fs-5 fw-bold mt-5 w-75 "
                  >
                    لطفا اول وارد شوید
                  </Link>
                ) : (
                  <button
                    onClick={
                      checkCourseUser.length || checkCartUser.length
                        ? null
                        : AddToCartHandler
                    }
                    className={`btn ${
                      checkCourseUser.length
                        ? "btn-outline-success"
                        : checkCartUser.length
                        ? "btn-outline-warning"
                        : "btn-outline-danger"
                    } fs-5 fw-bold mt-5 w-100`}
                  >
                    {checkCourseUser.length
                      ? "شما دانشجوی این دوره اید"
                      : checkCartUser.length
                      ? "دوره در سبد خرید موجود است"
                      : "افزودن به سبد خرید"}
                  </button>
                )}
              </div>
            </div>
            <div className="row flex-row  justify-content-center align-items-center mt-4 ms-3  row-cols-1 row-cols-sm-2 row-cols-xl-3  g-5  ">
              <div className="col d-flex justify-content-center align-items-center">
                <div className="row flex-column justify-content-center align-items-center position-relative">
                  <div className="d-flex justify-content-center align-items-center">
                    <StarRater
                      id={FilterCourseInfo._id}
                      SendMessageRate={setMessageRate}
                    />
                    <span className="ms-2 fs-6">
                      {" "}
                      {`(${FilterCourseInfo.rank.length} رای)`}
                    </span>
                  </div>
                  {messageRate && (
                    <span className="fs-6 m-1 text-warning me-3 position-absolute border-0 pt-5 mt-5 ">
                      {messageRate}
                    </span>
                  )}
                </div>
              </div>
              <div className="col d-flex  justify-content-center justify-content-sm-center align-items-center">
                <span className="fs-5 text-info  ">
                  <span className="fs-5 text-dark">وضعیت دوره : </span>
                  {FilterCourseInfo.status}
                </span>
              </div>

              <div className=" col  justify-content-center align-items-center">
                <div className="d-flex justify-content-center">
                  <SocialNetworks
                    Titel="ما را در فیسبوک دنبال کنید"
                    fontIcon="fa-facebook-f"
                    Url="/#"
                    color={"text-warning"}
                    size={"fs-3"}
                  />
                  <SocialNetworks
                    Titel="ما را در اینستاگرام دنبال کنید"
                    fontIcon="fa-instagram"
                    Url="/#"
                    color={"text-warning"}
                    size={"fs-3"}
                  />
                  <SocialNetworks
                    Titel="ما را در تلگرام دنبال کنید"
                    fontIcon="fa-telegram"
                    Url="/#"
                    color={"text-warning"}
                    size={"fs-3"}
                  />
                  <SocialNetworks
                    Titel="ما را در تویتر دنبال کنید"
                    fontIcon="fa-twitter"
                    Url="/#"
                    color={"text-warning"}
                    size={"fs-3"}
                  />
                  <SocialNetworks
                    Titel="ما را در یوتیوب دنبال کنید"
                    fontIcon="fa-youtube"
                    Url="/#"
                    color={"text-warning"}
                    size={"fs-3"}
                  />
                </div>
              </div>

              <div className="col  justify-content-center  align-items-center ">
                <a
                  href="#Comment"
                  className=" fs-5 fw-bold  w-75 text-decoration-none text-center d-flex justify-content-center w-100 text-secondary"
                >
                  دیدگاه شما ({FilterCourseInfoShowComment.length})
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4 ">
        <div className="row row-cols-1 justify-content-start  row-cols-sm-2  justify-content-around row-cols-lg-4 g-2">
          <div className="col d-flex justify-content-start ms-4 ms-sm-0 justify-content-sm-center align-items-center   ">
            <CastForEducationIcon className=" fs-1  text-success me-3"></CastForEducationIcon>
            <span className="fs-3 text-info ">
              <span className="fs-3 text-dark">مدرس دوره : </span>
              {FilterCourseInfo.teacher}
            </span>
          </div>
          <div className="col d-flex justify-content-start ms-4 ms-sm-0 justify-content-sm-center align-items-center  ">
            <AutoStoriesIcon className=" fs-1 text-success me-3"></AutoStoriesIcon>
            <span className="fs-3 text-info ">
              <span className="fs-3 text-dark">تعداد دروس : </span>
              {info.length}
            </span>
          </div>
          <div className="col d-flex justify-content-start ms-4 ms-sm-0 justify-content-sm-center align-items-center  ">
            <BrowseGalleryIcon className=" fs-1 text-success me-3"></BrowseGalleryIcon>
            <span className="fs-3 text-info ">
              <span className="fs-3 text-dark">زمان دوره : </span>
              {FilterCourseInfo.periodtime}
            </span>
          </div>
          <div className="col d-flex justify-content-start ms-4 ms-sm-0 justify-content-sm-center align-items-center ">
            <SchoolIcon className=" fs-1 text-success me-3"></SchoolIcon>
            <span className="fs-3 text-info ">
              <span className="fs-3 text-dark">دانشجو های دوره : </span>
              {FilterCourseInfo.salesnumber}
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-4 bg-info bg-opacity-25 pt-4 m-1  pb-4 rounded-5">
        <p className="lh-lg text-wrap">{FilterCourseInfo.dissection}</p>
      </div>
      <div className="row m-2 mb-5" id="SectionInfo">
        <Tabs
          defaultActiveKey="ویدیو ها"
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab eventKey="ویدیو ها" title="ویدیو ها">
            <Collapse expandIconPosition={"end"} >
              {topic.map((tpc) => {
                return (
                  <Panel
                    className=" fs-4  fw-bold"
                    header={tpc.topic}
                    key={tpc.id_topic}
                  >
                    <ol className=" olStyle" 
                    >
                      {info.map(
                        (ifo) =>
                          ifo.topic === tpc.topic && (
                            <li key={ifo.id_topic} className="border m-3 liStyle rounded-5">
                              <div className="row justify-content-between align-items-center">
                                <div className="col  d-flex justify-content-start align-items-center ">
                                  <Link
                                    to={
                                      !checkCourseUser.length
                                        ? ""
                                        : ifo.id_topic
                                    }
                                    className={`fs-4  text-info fw-normal text-decoration-none  `}
                                  >
                                    {ifo.nameInfo}
                                  </Link>
                                </div>
                                <div className="col d-flex justify-content-end">
                                  {!checkCourseUser.length ? (
                                    <LockPersonIcon className="fs-2 text-secondary" />
                                  ) : (
                                    <LockOpenIcon className="fs-2 text-success" />
                                  )}
                                </div>
                              </div>
                            </li>
                          )
                      )}
                    </ol>
                  </Panel>
                );
              })}
            </Collapse>
          </Tab>
          <Tab
            eventKey="رزومه مدرس"
            title="رزومه مدرس"
            className="bg-success p-5 bg-opacity-10 rounded-5"
          >
            <span className="fs-3 text-dark m-3 mt-5">
              {FilterCourseInfo.cvteacher}
            </span>
          </Tab>
          <Tab
            eventKey="منابع"
            title="منابع"
            className="bg-warning p-5 bg-opacity-10 rounded-5"
          >
            <span className="fs-3 text-dark m-3 mt-5">
              {FilterCourseInfo.references}
            </span>
          </Tab>
        </Tabs>
      </div>
      <div className="row  mb-5">
        <div className="courses">
          <div className="container">
            <SectionHeader title="دوره های مرتبط" />
            <div className="row ">
              <Swiper
                // spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
              >
                {/* { <swiper.autoplay.paused></swiper.autoplay.paused>} */}

                {FilterCourseSection.map((e) => (
                  <SwiperSlide key={e._id}>
                    <CourseBox
                      id={e._id}
                      isSlider="isSlider"
                      CourseImg={e.image}
                      CourseTitel={e.name}
                      CourseTeacher={e.teacher}
                      CourseUSer={e.salesnumber}
                      CoursePrice={e.cost}
                      CourseLinK={e.link}
                      CourseDiscount={e.discount}
                      section={e.section}
                      periodtime={e.periodtime}
                      courselevel={e.courselevel}
                      status={e.status}
                      type="infoCourse"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div id="Comment">
        <CourseInfoTabs
          checkCourseUser={checkCourseUser}
          FilterCourseInfo={FilterCourseInfo}
        />
      </div>
    </div>
  );
}
