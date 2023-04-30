import React, { useEffect, useState } from "react";
import DatePicker, {
  getAllDatesInRange,
} from "react-multi-date-picker";

import { v4 as uuidv4 } from "uuid";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";

export default function DatePickerRengData({ setGetDatePickerRengData }) {
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [allowRender, setAllowRender] = useState(false);

  const id = uuidv4();

  useEffect(() => {
    allowRender && setGetDatePickerRengData(allDates);

    setAllowRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates.length > 0 && allDates.length > 0 && dates]);
  return (
    <div className="d-flex  justify-content-center align-items-center">
      <DatePicker
        range
        fixMainPosition
        value={dates}
        placeholder="بازه زمانی را مشخص کنید"
        //   minDate={new DateObject({ calendar: persian }).toFirstOfYear()}
        //   maxDate={new DateObject({ calendar: persian }).toLastOfYear()}
        onChange={(DateObject) => {
          setDates(DateObject);
          setAllDates(getAllDatesInRange(DateObject));
          setAllowRender(true);
        }}
        plugins={[<DatePanel eachDaysInRange position="left" />]}
        calendar={persian}
        locale={persian_en}
        digits
        calendarPosition="bottom-right"
        style={{
          // boxShadow: "5px 2px 10px rgba(60, 99, 130,1.0)",

          color: "rgb(31, 30, 30)",
          border: "px sloid black",
          fontSize: "2rem",
          padding: " 1.3rem",
          textAlign: " center",
        }}
        id={id}
      />
      <label
        className=" fa fa-calendar fs-1 text-warning ms-4"
        htmlFor={id}
      ></label>
    </div>
  );
}
