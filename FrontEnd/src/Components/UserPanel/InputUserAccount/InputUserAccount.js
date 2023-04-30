import React from "react";

export default function InputUserAccount({
  inputHandeler,
  errMessage,
  placeholder,
  defaultValue,
  LabelName
}) {
  const VlueInputHandler = (event) => {
    inputHandeler(event.target.value);
  };
  return (
    <div className="row flex-column justify-content-end align-items-start mt-4">
      <div className="col mb-4 d-flex align-items-end w-100">
        <label
          htmlFor="InputUserAccount "
          className={`fs-3 text-info `}
        > {LabelName} : </label>
      </div>
      <div className="col">
        <input
          placeholder={placeholder}
          id="InputUserAccount"
          className="form-control border-0 border-bottom fs-4 text-dark"
          type="text"
          onChange={VlueInputHandler}
          defaultValue={defaultValue}
        />
        <label className="fs-5 text-danger" htmlFor="InputUserAccount">
          {errMessage}
        </label>
      </div>
    </div>
  );
}
