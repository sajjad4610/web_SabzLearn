import React, { useEffect, useState } from "react";
import { Statistic } from "antd";
import { optionsSellerCourse } from "../../Schema/SchemaOptionChart/SchemaOptionChart";
import Chart2 from "../Chart2/Chart2";
import DatePickerRengData from "../DatePickerRengData/DatePickerRengData";

import CountUp from "react-countup";
import { GetApi } from "../../Servises/Api";
import GetServises from "../../Servises/GetServises";

const formatter = (value) => <CountUp end={value} separator="," />;

export default function ChartSell({ colorChart }) {
  const [SeletTypeChart, setSeletTypeChart] = useState("Bar");
  const [GetDatePickerRengData, setGetDatePickerRengData] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalDefault, setTotalDefault] = useState(0);

  let DatePickerReng = GetDatePickerRengData.flatMap((date) => date.format());
  useEffect(() => {
    GetServises(GetApi.UsersApi).then((AllItem) => {
      let sell = DatePickerReng.map((e) => {
        return AllItem.flatMap((ee) => {
          return ee.courses.flatMap((eee) => {
            return eee.moment === e
              ? eee.courseDiscount && eee.DiscountCodePercent
                ? eee.courseCost -
                  (eee.courseCost -
                    (eee.courseCost -
                      eee.courseCost *
                        (eee.courseDiscount / 100 +
                          eee.DiscountCodePercent / 100)))
                : eee.courseDiscount && !eee.DiscountCodePercent
                ? eee.courseCost - eee.courseCost * (eee.courseDiscount / 100)
                : !eee.courseDiscount && eee.DiscountCodePercent
                ? eee.courseCost -
                  eee.courseCost * (eee.DiscountCodePercent / 100)
                : eee.courseCost
              : 0;
          });
        });
      }).flatMap((eeee) => {
        return eeee.reduce((s1, s2) => s1 + s2);
      });

      let MomentSell = AllItem.flatMap((e) =>
        e.courses.flatMap((ee) => ee.moment)
      );

      MomentSell = [...new Set(MomentSell)]
        .sort()
        .splice(-10);

      let defultSell = MomentSell.map((e) => {
        return AllItem.flatMap((ee) => {
          return ee.courses.flatMap((eee) => {
            return eee.moment === e
              ? eee.courseDiscount && eee.DiscountCodePercent
                ? eee.courseCost -
                  (eee.courseCost -
                    (eee.courseCost -
                      eee.courseCost *
                        (eee.courseDiscount / 100 +
                          eee.DiscountCodePercent / 100)))
                : eee.courseDiscount && !eee.DiscountCodePercent
                ? eee.courseCost - eee.courseCost * (eee.courseDiscount / 100)
                : !eee.courseDiscount && eee.DiscountCodePercent
                ? eee.courseCost -
                  eee.courseCost * (eee.DiscountCodePercent / 100)
                : eee.courseCost
              : 0;
          });
        });
      }).flatMap((eeee) => {
        return eeee.reduce((s1, s2) => s1 + s2);
      });

      const labels = DatePickerReng.length ? DatePickerReng : MomentSell;

      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "میزان فروش",
            data: DatePickerReng.length ? sell : defultSell,
            backgroundColor: colorChart,
          },
        ],
      };
      if (DatePickerReng.length) {
        let totalDtaPicker = sell.reduce((s1, s2) => s1 + s2);
        setTotal(totalDtaPicker);
        setTotalDefault(0);
      } else {
        let totalDfult = defultSell.reduce((s1, s2) => s1 + s2);
        setTotalDefault(totalDfult);

        setTotal(0);
      }
      setData([data]);
    });
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GetDatePickerRengData]);
  return (
    <div className="mb-5">
      <div className="mt-5 row justify-content-center align-items-center">
        <div className="col d-flex justify-content-start">
          <select
            className="border-0 border-bottom bg-body"
            name=""
            id=""
            value={SeletTypeChart}
            onChange={(event) => setSeletTypeChart(event.target.value)}
          >
            <option value="Bar">نمودار میله ای</option>
            <option value="Line">نمودار خطی</option>
            <option value="Radar">نمودار گسترده</option>
          </select>
        </div>
        <div className="col d-flex justify-content-end">
          <div className="">
            <DatePickerRengData
              setGetDatePickerRengData={setGetDatePickerRengData}
            />
          </div>
        </div>
      </div>
      {data.length && (
        <Chart2
          options={optionsSellerCourse}
          data={data[0]}
          type={SeletTypeChart}
        />
      )}

      <div className="row ">
        <div className=" d-flex justify-content-center">
          <Statistic
            title={
              <span className="text-info fs-4">
                {!DatePickerReng.length ? `جمع 10 روزآخری که در آن خرید شده ` : `جمع خرید بازه زمانی انتخاب شده `}
              </span>
            }
            value={!total ? totalDefault : total}
            precision={2}
            formatter={formatter}
          />
        </div>
      </div>
    </div>
  );
}
