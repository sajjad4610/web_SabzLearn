/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import NavComp from "../../Components/NavBar/NavBar";
import CoursesShop from "../../Components/CoursesShop/CoursesShop";
import CorsesInfoShowPage from "../../Components/CorsesInfoShowPage/CorsesInfoShowPage";
import "./Course.css";
import CoursedsMain from "../../Components/CoursedsMain/CoursedsMain";
import CoursesPlayer from "../../Components/CoursesPlayer/CoursesPlayer";
import Title from "../../Components/Title/Title";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";


export default function Course() {
  const Params = useParams();
  const { section, name, IdInfo = Params["*"] } = Params;
  const [FilterCourseSection, setFilterCourseSection] = useState([]);
  const [FilterCourseInfo, setFilterCourseInfo] = useState([]);
  const [FilterCourseInfoShop, setFilterCourseInfoShop] = useState([]);
  const [FilterCourseInfoMain, setFilterCourseInfoMain] = useState([]);
  const [FilterCourseInfoShow, setFilterCourseInfoShow] = useState([]);
  const [FilterCourseInfoShowComment, setFilterCourseInfoShowComment] = useState([]);


  let coursePopular = [];
  let RateAdd = 0;

  let Url = useLocation();


  useEffect(() => {
    GetServises(GetApi.CourseApi).then(result => {
      let filterCoursesSection = result.filter((e) => {
        return e.section === section;
      });
      setFilterCourseSection(filterCoursesSection);
  

      let filterCoursesLink = result.filter((e) => {
        return e.link === Url.pathname;
      });

      setFilterCourseInfo(filterCoursesLink);

      let commentCourseMain = filterCoursesLink.flatMap((e) => e.comment);

      let filterChekedCommentCourse = commentCourseMain.filter(
        (e) => e.Stutus_comment === "تایید شده"
      );
      setFilterCourseInfoShowComment(filterChekedCommentCourse)
      if (section === "shop") {
        name === "all" && setFilterCourseInfoShop(result);
        if (name === "popular") {
          let GetRate = result.map((e, index) => {
            e.rank.length === 0 && e.rank.push({ rate: 0 });
            let RateItem = e.rank.map((e1) => Number(e1.rate));
            return RateItem;
          });

          let rate = GetRate.map((e) => {
            RateAdd = e.reduce((s1, s2) => {
              return Number(s1) + Number(s2);
            });
            return Math.ceil(RateAdd / e.length);
          });

          let indexrate = rate.map((Rate, indexpopulerRate) =>
            Rate >= 4 ? indexpopulerRate + 1 : null
          );
          result.forEach((course, indexcourse) => {
            indexrate.forEach((e, index) => {
              if (e && index === indexcourse) {
                coursePopular.push(course);
              }
            });
          });

          setFilterCourseInfoShop(coursePopular);
        }
      } else {
        setFilterCourseInfoShop([]);
      }
      if (name === "Main") {
        let mainCourse = result.filter((e) => e.section === section);
        setFilterCourseInfoMain(mainCourse);
      } else {
        setFilterCourseInfoMain([]);
      }
      if (IdInfo) {
        let filterCoursesId = result.flatMap((e) => {
          return e.Coursetopics.filter((ifo) => {
            return ifo.id_topic === IdInfo;
          });
        });

        setFilterCourseInfoShow(filterCoursesId);
      } else {
        setFilterCourseInfoShow([]);
      }

   

     })
  

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url]);

  return (
    <>
          <Title text={"دوره ها"} />

      <Header />
      <NavComp />
      {FilterCourseInfo.length > 0 && (
        <CorsesInfoShowPage FilterCourseInfo={FilterCourseInfo[0]} FilterCourseSection={FilterCourseSection} FilterCourseInfoShowComment={FilterCourseInfoShowComment}/>
      )}
      {FilterCourseInfoShop.length > 0 && (
        <CoursesShop FilterCourseInfoShop={FilterCourseInfoShop} />
      )}
      {FilterCourseInfoMain.length > 0 && (
        <CoursedsMain FilterCourseInfoMain={FilterCourseInfoMain} />
      )}
      {(FilterCourseInfoShow.length > 0 )&& (
        <CoursesPlayer
          FilterCourseInfoShow={FilterCourseInfoShow}
          FilterCourseInfo={FilterCourseInfo[0] }
        />
      )}
      <Footer />
    </>
  );
}
