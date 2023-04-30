import React from "react";
import { Link } from "react-router-dom";

import "./SectionHeader.css";

export default function SectionHeader({ title, desc, btnTitle,link  }) {
  return (
    <div className="courses-header ms-2">
      <div className="courses-header__right">
        <span className="courses-header__title title">{title}</span>
        <span className="courses-header__text">{desc}</span>
      </div>
      {
          btnTitle ? (
            <div className="courses-header__left">
            <Link to={link} className="courses-header__link  text-decoration-none">
             {btnTitle}
              <i className="fa fa-arrow-left courses-header__icon"></i>
            </Link>
          </div>
          ) : null
      }
    </div>
  );
}
