import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import NavComp from "../../Components/NavBar/NavBar";
import CoursesShop from "../../Components/CoursesShop/CoursesShop";
import Title from "../../Components/Title/Title";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

export default function Search() {
  const { InputShearch } = useParams();
  const [Shearch, setShearch] = useState([]);
  let Url = useLocation();

  useEffect(() => {
    GetServises(GetApi.CourseApi).then((result) => {
      let SearchResult = result.filter(
        (e) =>
          InputShearch &&
          e.name.toLowerCase().search(InputShearch.toLowerCase()) !== -1 &&
          e
      );
      setShearch(SearchResult);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url]);

  return (
    <div>
      <Title text={"جستجو"} />

      <Header />
      <NavComp />
      {Shearch.length ? (
        <CoursesShop FilterCourseInfoShop={Shearch} />
      ) : (
        <div className="row justify-content-center">
          <div className="col fs-2 p-3 m-3 text-dark text-center bg-warning bg-opacity-10">
            نتیجه ای برای این جستجو یافت نشد !!!!
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
