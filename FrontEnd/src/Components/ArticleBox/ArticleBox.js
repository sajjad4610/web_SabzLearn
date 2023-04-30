import React from "react";
import { Link } from "react-router-dom";

import "./ArticleBox.css";

export default function ArticleBox({ title, desc, cover, link, writer }) {
  return (
    <div className=" col-12 col-lg-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link
            to={link}
            className="article-card__link-img text-decoration-none  "
          >
            <img src={cover} className=" img-thumbnail " alt="Article Cover" />
          </Link>
        </div>
        <div className="article-card__content">
          <Link
            to={link}
            className="article-card__link text-decoration-none fs-5"
          >
            {title}
          </Link>
          <div className="row">
            <span className="fs-4 text-success">{`نویسنده مقاله : ${writer}`}</span>
          </div>
          <p className="article-card__text">{desc}</p>
          <Link to={link} className="article-card__btn text-decoration-none">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
