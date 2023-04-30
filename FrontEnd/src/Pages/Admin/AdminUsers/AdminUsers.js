import React, { useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AddUserCourse from "../../../Components/Admin/AddUserCourse/AddUserCourse";

import CearteFormUser from "../../../Components/Admin/CearteFormUser/CearteFormUser";
import DataTable from "../../../Components/DataTable/DataTable";
import CearteFormNotification from "../../../Components/Notification/CearteFormNotification/CearteFormNotification";
import { columns } from "../../../Schema/schemaTabel/schemaTabelUser/schemaTabelUser";
import { selectBoxSearch } from "../../../Schema/schemaTabel/schemaTabelUser/schemaTabelUser";

import "./AdminUsers.css";

export default function AdminUsers() {
  const [insertdata, setInsertdata] = useState(false);
  const [refreshByTabs, setRafreshByTabs] = useState(false);
  const [refresh, setRafresh] = useState(false);

  const refreshTrashHandler = () => {
    setRafresh((prev) => !prev);
  };

  const TabsHandler = (event) => {
    setRafreshByTabs((prev) => !prev);
  };
  const HandlerInsertdata = (allValid) => {
    setInsertdata(allValid);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3 text-info"
        onSelect={TabsHandler}
      >
        <Tab eventKey="home" title="کاربران">
          <CearteFormUser
            HandlerInsertdata={HandlerInsertdata}
            api="http://localhost:4000/v1/auth/register"
            method="POST"
            message="ثبت نام با موفقیت انجام شد"
            rows={[]}

          ></CearteFormUser>
          <DataTable
            refreshTrashHandler={refreshTrashHandler}
            refreshTrash={refresh}
            refreshByValidform={insertdata}
            columns={[...columns]}
            apiData="http://localhost:4000/v1/user/getAll"
            apiRemove={"http://localhost:4000/v1/user/remove"}
            methodRemove={"Delete"}
            messageTrash="آیا از حذف این کاربر مطمئن هستید؟"
            type="userFormEdite"
            selectBox={[...selectBoxSearch]}
          ></DataTable>
        </Tab>

        <Tab eventKey="userCourse" title="دادن دوره به کاربر">
          <AddUserCourse refreshByTabs={refreshByTabs} />
        </Tab>
        <Tab eventKey="contact" title="ارسال پیغام">
          <CearteFormNotification refreshByTabs={refreshByTabs} />
        </Tab>
      </Tabs>
    </>
  );
}
