import React from "react";
import { v4 as uuidv4 } from 'uuid';
export default function SelectorFormCouses({
  inputValueHandler,
  defaultValue,
  value,
  option,
  optionDefualt='',
label,
}) {
  return (
    <div className="col mt-5 mb-5 d-flex  justify-content-center">
      <div className="d-flex align-items-center ">
      <label className="me-3 mb-3 text-success" htmlFor="input">{label}</label>
        <select
          onChange={(event) => inputValueHandler(event)}
          id="input"
          type="text"
          value={value}
          // defaultValue={defaultValue}
          className={`border-0 border-bottom inputFormCourses fs-5 bg-body`}
        >
        {optionDefualt && <option value={optionDefualt.value}>{optionDefualt.name}</option>}
        {option.map(e=><option key={uuidv4()} value={e.value}>{e.name}</option>)}
          
         
        </select>
      </div>

    </div>
  );
}
