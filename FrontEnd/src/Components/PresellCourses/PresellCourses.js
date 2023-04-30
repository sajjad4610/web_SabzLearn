/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";

import SectionHeader from "./../SectionHeader/SectionHeader";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";
import "./PresellCourses.css";
import CourseBox from "../CourseBox/CourseBox";

export default function PresellCourses() {
  const [allCourse, setAllcourses] = useState([]);

  useEffect(() => {
    GetServises(GetApi.CourseApi).then((result) => {
      let filterPresellCourses = result.filter((e) => e.status === "پیش فروش");
      setAllcourses(filterPresellCourses);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های پیش فروش"
          desc="دوره های پیش فروش کمی ارزان تر هستند"
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
                    CourseDiscount={e.discount}
                    CoursePrice={e.cost}
                    CourseLinK={e.link}
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
