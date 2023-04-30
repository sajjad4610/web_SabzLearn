import React from "react";

export default function InputFormCourse({
  courseData,
  inputValueHandler,
  defaultValue,
  icon,
  placeholder,
  value,
  regexr = true,
  idDataList = "",
}) {


  return (
    <div className="col mt-4 mb-4 ">
    <div className="row align-items-center justify-content-center">
      <div className="col d-flex align-items-center justify-content-center">
        <label
          htmlFor="inputinput"
          className={`fs-2 fa ${icon} text-center p-2 ${
            courseData || courseData === 0 ? "text-success  " : "text-danger "
          }`}
        ></label>
        <input
          list={idDataList}
          name={idDataList}
          onChange={(event) => inputValueHandler(event)}
          id="input"
          type="text"
          value={value}
          // defaultValue={defaultValue}
          className={`border-0 border-bottom inputFormCourses fs-5  ${
            courseData || courseData === 0
              ? "  border-success "
              : " border-danger "
          } `}
          placeholder={placeholder}
        />
      </div>
    </div>
    <div className="row align-items-center justify-content-center">
      <div className="col align-items-center justify-content-center d-flex">
      <span className="text-danger text-center fs-6  ">
        {!courseData &&
          regexr &&
          courseData !== 0 &&
          " پر کردن این فید اجباری است"}
        {!courseData &&
          !regexr &&
          icon === "fa-clock-o" &&
          ` پر کردن این فید اجباری است (مثال : 04:07)`}
        {!courseData &&
          !regexr &&
          icon !== "fa-clock-o" &&
          ` پر کردن این فید اجباری است  (فقط عدد) `}
      </span>

      </div>
    </div>

    </div>
  );
}
