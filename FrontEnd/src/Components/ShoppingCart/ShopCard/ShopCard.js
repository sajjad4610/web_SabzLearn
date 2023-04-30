import * as React from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import useContextUser from "../../../ContextApi/UserContextApi";

import './ShopCard.css'
import CostCourses from "../../CostCourses/CostCourses";
export default function ShopCard({
  Titel,
  CoursePrice,
  CourseDiscount,
  Img,
  dataTime,
  userid,
  idcard,
  setRemoveRefresh,
  courseLink,
  userEmail,
  courseId,
}) {
  const { token ,setIsRefresh} = React.useContext(useContextUser);


// const token = localStorage.getItem('user')
  const removeItemCardHandler= async()=>{
    await fetch(`http://localhost:4000/v1/user/removecousesCard/${userid}/${idcard}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setRemoveRefresh(prev=>!prev)
        setIsRefresh(prev=>!prev)

      });
  }

  return (
    <div className="row shadow ms-lg-2 me-lg-2 border border-1 p-1  row-cols-1 row-cols-md-2 ">
      <div className="col ">
        <div className="row ">
          <div className="col  "> 
            <i className="fa fa-close fs-3 text-danger" onClick={removeItemCardHandler}></i>
          </div>
        </div>
        <div className="row justify-content-center border-bottom  border-2  ">
          <div className="col-auto mt-1 ">
            <Link to={courseLink} className="text-secondary fs-3 fw-bolder  text-decoration-none">{Titel}</Link>
          </div>
        </div>
        <div className="row justify-content-start mt-3 ">
          <div className="col-auto position-relative p-3 ">
          <CostCourses CoursePrice={CoursePrice} CourseDiscount={CourseDiscount}/>

          </div>
          <div className="row justify-content-end  ">
            <div className="col-auto mt-3 ">
              <span className="text-secondary fs-6 fw-bolder">{dataTime}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6  d-flex justify-content-end">
        <Badge.Ribbon
          color={CourseDiscount ? "gold" : "cyan"}
          className="fs-4 "
          text={`تخفیف ${CourseDiscount} %`}
        >
        <Link to={courseLink} className="text-decoration-none ">
          <img src={Img} alt="" className="img-thumbnail w-100" />

        </Link>
        </Badge.Ribbon>
      </div>
    </div>
  );
}
