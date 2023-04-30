import React, { useEffect, useState } from "react";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";

export default function EditANDRegisterUserHOC(Component) {
  const RegiserAndEdit = (props) => {
    const [valueUserName, setValueUserName] = useState("");
    const [valueEmail, setValueEmail] = useState("");
    const [valuePhone, setValuePhone] = useState("");
    const [valuePass, setValuePass] = useState("");
    const [valueUserRole, setValueUserRole] = useState("user");
    const [ValidUserName, setValidUserName] = useState([]);
    const [ValidEmail, setValidEmail] = useState([]);
    const [ValidPhone, setValidPhone] = useState([]);
    const [ValidPass, setValidPass] = useState([]);
    const [ValidUserRole, setValidUserRole] = useState("user");
    const [allValid, setAllValid] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      if (props.rows) {

        if (props.rows.length) {
          let datauser = props.rows.filter(
            (e) => e._id === props.id_EditFormUser
          );
          if (datauser.length > 0) {
            setValueUserName(datauser[0].username);
            setValueEmail(datauser[0].email);
            setValuePhone(datauser[0].phone);
            setValueUserRole(datauser[0].role);
            setValuePass(datauser[0].password);
          }
        } 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.rows]);

    const token = localStorage.getItem("user");

    let DataRegister = {
      username: valueUserName,
      email: valueEmail,
      password: valuePass,
      phone: valuePhone,
      role: valueUserRole,
    };

    const setFormHandeler = async (event) => {
      event.preventDefault();
      await fetch(`${props.api}`, {
        method: `${props.method}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DataRegister),
      })
        .then((res) => res.json())
        .then((result) => {
          result[0].err === false ? setAllValid(false) : setAllValid(true);
          if (result.length > 0) {
            let filterValidUser = result.filter((e) => e.path === "username");
            let filterValidEmail = result.filter((e) => e.path === "email");
            let filterValidPhon = result.filter((e) => e.path === "phone");
            let filterValidPass = result.filter((e) => e.path === "password");
            let filterValidrole = result.filter((e) => e.path === "role");
            setValidUserName(filterValidUser);
            setValidEmail(filterValidEmail);
            setValidPhone(filterValidPhon);
            setValidPass(filterValidPass);
            setValidUserRole(filterValidrole);
            setRefresh((prev) => !prev);
            result[0].err === false && ToastMessage(result[0].message);
          }
        });
    };
    const getUserValueHandler = (event) => {
      setValueUserName(event.target.value);
    };

    const getEmailValueHandler = (event) => {
      setValueEmail(event.target.value);
    };

    const getPhoneValuHandler = (event) => {
      setValuePhone(event.target.value);
    };

    const getPassValueHandler = (event) => {
      setValuePass(event.target.value);
    };
    const roleValueHandeler = (event) => {
      setValueUserRole(event.target.value);
    };

    return (
      <Component
        setFormHandeler={setFormHandeler}
        getUserValueHandler={getUserValueHandler}
        getEmailValueHandler={getEmailValueHandler}
        getPhoneValuHandler={getPhoneValuHandler}
        getPassValueHandler={getPassValueHandler}
        roleValueHandeler={roleValueHandeler}
        setAllValid={setAllValid}
        allValid={allValid}
        setValueUserName={setValueUserName}
        setValueEmail={setValueEmail}
        setValuePhone={setValuePhone}
        setValuePass={setValuePass}
        setValueUserRole={setValueUserRole}
        valueUserName={valueUserName}
        valueEmail={valueEmail}
        valuePhone={valuePhone}
        valuePass={valuePass}
        valueUserRole={valueUserRole}
        ValidUserName={ValidUserName}
        ValidEmail={ValidEmail}
        ValidPhone={ValidPhone}
        ValidPass={ValidPass}
        ValidUserRole={ValidUserRole}
        setValidUserName={setValidUserName}
        setValidEmail={setValidEmail}
        setValidPhone={setValidPhone}
        setValidPass={setValidPass}
        setValidUserRole={setValidUserRole}
        refresh={refresh}
        setRefresh={setRefresh}
        {...props}
      ></Component>
    );
  };

  return RegiserAndEdit;
}
