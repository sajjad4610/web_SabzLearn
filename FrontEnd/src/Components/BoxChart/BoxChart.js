import React, { useState } from "react";
import UseChart from "../../customUse/useChart/UseChart";
import Chart2 from "../Chart2/Chart2";
import DatePickerRengData from "../DatePickerRengData/DatePickerRengData";

export default function BoxChart({
  api = "",
  type = "",
  label = "",
  colorChart=' rgba(53, 162, 235, 0.5)',
  options,
  showDatePicker = true,
}) {
  const [SeletTypeChart, setSeletTypeChart] = useState("Bar");
  const [GetDatePickerRengData, setGetDatePickerRengData] = useState([]);

  let data = UseChart(GetDatePickerRengData, api, label, type ,colorChart);

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
          {showDatePicker ? (
            <div className="">
              <DatePickerRengData
                setGetDatePickerRengData={setGetDatePickerRengData}
              />
            </div>
          ) : null}
        </div>
      </div>
      {data.length && (
        <Chart2 options={options} data={data[0].data} type={SeletTypeChart} />
      )}
    </div>
  );
}
