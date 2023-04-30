import React from "react";
import { Statistic } from "antd";
import CountUp from "react-countup";
export default function CostCourses({ CoursePrice, CourseDiscount = 1 ,type }) {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div  dir="ltr">
      {CoursePrice ? (
        CourseDiscount ? (
          <>
            <Statistic
              className="me-3"
              title={
                <Statistic
                  value={Math.ceil(CoursePrice)}
                  precision={2}
                  formatter={formatter}
                  prefix={<span className=" text-danger text-decoration-line-through">تومان</span>}
                  valueStyle={{
                    fontSize: "1.2rem",
                    color: "red",
                    
                  }}
                />
              }
              value={Math.ceil(
                CoursePrice - CoursePrice * (CourseDiscount / 100)
              )}
              prefix={<span className=" text-dark">تومان</span>}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: "green" }}
            />
          </>
        ) : (
          <Statistic
            value={Math.ceil(CoursePrice)}
            precision={2}
            formatter={formatter}
            valueStyle={{ color: "green", padding: "1rem" }}
            prefix={<span className=" text-dark">تومان</span>}
          />
        )
      ) : (
        <div className={type ==='infoCourse' ?  'p-4':''}>
        <span className={`text-success ms-3  pe-1 fs-2`}>رایگان</span>

        </div>
      )}
    </div>
  );
}
