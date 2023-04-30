import React, { useState } from 'react'
import StarRater from '../../../Components/StarRater/StarRater'
import {Link} from "react-router-dom";
export default function UserPurchasedCoursesBox(props) {
    const [SendMessageRate, setSendMessageRate] = useState('');

  return (
    <div
    className="row border m-3 rounded-4 shadow-lg p-2 row justify-content-center align-items-center flex-column flex-lg-row"
   
    style={{ backgroundColor: "rgba(19, 15, 64,.90)" }}
  >
    <Link to={props.link} className="col d-flex justify-content-center col-lg-4 ">
      <img src={props.image} className="img-thumbnail w-100 p-md-5 m-md-5 m-lg-0 p-lg-0 " alt="" />
    </Link>

    <div className="col d-felx flex-column  ">
      <div className="row mt-4 mt-lg-0  justify-content-between align-items-center">
          <div className="col  m-1 mb-4">
            <Link to={props.link} className="fs-1 fw-bolder m-1 text-white text-decoration-none">
              {props.name}
            </Link>

          </div>
          <div className="col d-flex justify-content-end">
          <span className="fs-5 text-warning">{SendMessageRate}</span>

        </div>
      </div>
      <div className="row row-cols-1 row-cols-lg-2 ">
        <div className="col d-flex flex-column">
          <div className="col m-1">
            <span className="fs-4 m-1 text-light">کل دروس : </span>
            <span className="fs-4 m-1 text-info">
              {
                props.Coursetopics.filter((e) => e.nameInfo !== "سرفصل")
                  .length
              }
            </span>
          </div>
          <div className="col m-1">
            <span className="fs-4 m-1 text-light">وضعیت دوره : </span>
            <span className="fs-4 m-1 text-info">{props.status}</span>
          </div>
          <div className="col m-1">
            <span className="fs-4 m-1 text-light">مدرس دوره : </span>
            <span className="fs-4 m-1 text-info">{props.teacher}</span>
          </div>
        </div>
        <div className="col d-flex flex-column">
          <div className="col m-1">
            <span className="fs-4 m-1 text-light">زمان دوره : </span>
            <span className="fs-4 m-1 text-info">{props.periodtime}</span>
          </div>
          <div className="col m-1">
            <span className="fs-4 m-1 text-light">سطح دوره : </span>
            <span className="fs-4 m-1 text-info">{props.status}</span>
          </div>
          <div className="col m-1">
         <StarRater SendMessageRate={setSendMessageRate} id={props._id}/>

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
