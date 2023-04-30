import React from "react";

export default function InputFormArticl({
  courseData,
  inputValueHandler,
  icon,
  placeholder,
  value,
  idDataList=''
}) {
  return (
    <div className="col mt-4 mb-4">
      <div className="d-flex align-items-center">
        <label
          htmlFor="inputinput"
          className={`fs-2 fa ${icon}  p-2 ${
            courseData ? "text-success  " : "text-danger "
          }`}
        ></label>
        <input
        list={idDataList}
          name={idDataList}
          onChange={(event) => inputValueHandler(event)}
          id="input"
          type="text"
          value={value}
          className={`border-0 border-bottom inputFormCourses fs-5  ${
            courseData ? "  border-success " : " border-danger "
          } `}
          placeholder={placeholder}
        />
  
      </div>

      <span className="text-danger fs-6  ms-5">
        {!courseData
          ? " پر کردن این فید اجباری است"
          : ""}
      </span>
    </div>
  );
}
