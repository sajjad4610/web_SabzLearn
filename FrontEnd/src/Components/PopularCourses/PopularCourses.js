/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";

import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "./../SectionHeader/SectionHeader";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";
import "./PopularCourses.css";

export default function PopularCourses() {
  const [allCourse, setAllcourses] = useState([]);

  let coursePopular = [];
  let RateAdd = 0;
  useEffect(() => {
    GetServises(GetApi.CourseApi).then(result => {
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

      setAllcourses(coursePopular);
     })
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />
        <div className="row ">
          <>
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
              {allCourse.map((e) => (
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
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </div>
      </div>
    </div>
  );
}
