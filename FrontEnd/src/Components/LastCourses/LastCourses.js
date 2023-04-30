import React, { useEffect, useState } from "react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import GetServises from "../../Servises/GetServises";
import {GetApi} from "../../Servises/Api";




import "swiper/css";
import "../../styles/stylesSwiper.css";
import "swiper/css/pagination";
import "./LastCourses.css";
export default function LastCourses() {
  const [allCourse, setAllcourses] = useState([]);

  useEffect(() => {
    GetServises(GetApi.CourseApi).then(result => {
    let sliceResult = result.slice(result.length - 6, result.length);
        setAllcourses(sliceResult);
   })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            link='/course/shop/all'
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
                {/* { <swiper.autoplay.paused></swiper.autoplay.paused>} */}

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
    </>
  );
}
