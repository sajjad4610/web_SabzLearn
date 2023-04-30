import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "./../SectionHeader/SectionHeader";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";
import "./LastArticles.css";

export default function LastArticles() {
  const [allArticle, setAllArticle] = useState([]);

  useEffect(() => {
    GetServises(GetApi.ArticleApi).then((result) => {
      let sliceResult = result.slice(result.length - 3, result.length);
      setAllArticle(sliceResult);
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          link='/articles/Main'
        />
        <div className="articles__content ">
          <div className="row">
            {allArticle.map((e) => (
              <ArticleBox
                key={e._id}
                title={e.titel}
                cover={e.image}
                desc={`${e.dissection.substr(0, 200)}......`}
                link={e.link}
                writer={e.writer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
