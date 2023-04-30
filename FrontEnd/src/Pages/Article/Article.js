import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useLocation, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Header from "../../Components/Header/Header";
import NavComp from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Title from "../../Components/Title/Title";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";
import "./Article.css";
export default function Article() {
  const [HtmlArticle, setHtmlArticle] = useState([]);
  const [FilterArticleInfoMain, setFilterArticleInfoMain] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const { section } = useParams();
  let Url = useLocation();

  useEffect(() => {
    GetServises(GetApi.ArticleApi).then((result) => {
      let filterArticaleLink = result.filter((e) => {
        return e.link === Url.pathname;
      });

      setHtmlArticle(filterArticaleLink);

      if (section === "Main") {
        setFilterArticleInfoMain(result);
      } else {
        setFilterArticleInfoMain([]);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Url]);

  const onChangePagination = (page, pageSize) => {
    setPage((page - 1) * pageSize);
    setPageSize((page - 1) * pageSize + pageSize);
  };

  return (
    <div>
      <Header />
      <NavComp sticky={"top"} />
      {HtmlArticle.length
        ? HtmlArticle.map((e) => (
            <div
              key={e._id}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(e.html) }}
            ></div>
          ))
        : ""}

      <>
        <Title text={"مقالات"} />

        <div className=" row w-100 justify-content-center align-items-center mt-1 mb-5 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 img-thumbnail">
          {FilterArticleInfoMain.length
            ? FilterArticleInfoMain.slice(page, pageSize).map((e) => (
                <ArticleBox
                  key={e._id}
                  cover={e.image}
                  link={e.link}
                  title={e.title}
                  desc={`${e.dissection.substr(0, 200)}......`}
                  writer={e.writer}
                />
              ))
            : ""}
        </div>

        {FilterArticleInfoMain.length > 1 ? (
          <div className="row  justify-content-center align-items-center mb-5">
            <div
              className="col d-flex justify-content-center align-items-center "
              dir="ltr"
            >
              <Pagination
                defaultCurrent={1}
                defaultPageSize={6}
                total={FilterArticleInfoMain.length}
                onChange={onChangePagination}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </>

      <Footer />
    </div>
  );
}
