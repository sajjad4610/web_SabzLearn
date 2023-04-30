import { useContext, useEffect, useState } from "react";
import userContext from "../../ContextApi/UserContextApi";

const UseChart = (GetDatePickerRengData, api, label, type, colorChart) => {
  const { isLogin } = useContext(userContext);
  const [DataChart, setDataChart] = useState([]);

  const token = localStorage.getItem("user");

  useEffect(() => {
    let DatePickerReng = GetDatePickerRengData.flatMap((date) => date.format());
    isLogin &&
      fetch(api, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((AllItem) => {
          let Moment = AllItem.flatMap((e) => e.moment);

          Moment = [...new Set(Moment)].sort().splice( -10);

          let datas = DatePickerReng.map((e) => {
            return AllItem.flatMap((ee) => {
              if (ee.moment === e) {
                return ee;
              } else {
                return [];
              }
            });
          }).flatMap((e) => {
            return e.length ? e.length : 0;
          });

          let defultData = Moment.map((e) => {
            return AllItem.flatMap((ee) => {
              if (ee.moment === e) {
                return ee;
              } else {
                return [];
              }
            });
          }).flatMap((e) => {
            return e.length ? e.length : 0;
          });

          let dataNumbersaler = AllItem.flatMap((e) => e.salesnumber);
          let nameCourse = AllItem.flatMap((e) => e.name);
          let nameCourseSellPerCourse = AllItem.flatMap(
            (e) => e.salesnumber * (e.cost - (e.cost * e.discount) / 100)
          );

          const labels =
            type === "perNumberCourse" || type === "perSellCourse"
              ? nameCourse
              : DatePickerReng.length
              ? DatePickerReng
              : Moment;

          let data = {
            labels,

            datasets: [
              {
                fill: true,
                label: label,
                data:
                  type === "perNumberCourse"
                    ? dataNumbersaler
                    : type === "perSellCourse"
                    ? nameCourseSellPerCourse
                    : DatePickerReng.length
                    ? datas
                    : defultData,
                borderColor: colorChart,
                backgroundColor: colorChart,
              },
            ],
          };

          setDataChart([{ data }]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GetDatePickerRengData]);

  return DataChart;
};

export default UseChart;
