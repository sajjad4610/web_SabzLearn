import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BoxChart from "../../../Components/BoxChart/BoxChart";
import ChartSell from "../../../Components/ChartSell/ChartSell";

import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import {
  optionsCourse,
  optionsPerNumberCourse,
  optionsPerSellerCourse,
  optionsUsr,
} from "../../../Schema/SchemaOptionChart/SchemaOptionChart";

export default function AdminHome() {
  return (
    <div className=" mt-5 ">
      <Tabs
        defaultActiveKey="فروش"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="فروش" title="فروش">
          <div className="mt-5 mb-5">
            <SectionHeader title="میزان فروش"></SectionHeader>
            <div className=" mt-5 mb-3"></div>
            
      
            <ChartSell  colorChart="rgba(255, 99, 132, 0.5)"/>
          </div>

          <div className="mt-5 mb-5">
            <SectionHeader title="تعداد فروش هر دوره"></SectionHeader>
            <BoxChart
              api="http://localhost:4000/v1/course/getcourse"
              options={optionsPerNumberCourse}
              type="perNumberCourse"
              label="تعداد فروش هر درس "
              showDatePicker={false}
            />
          </div>
          <div className="mt-5 mb-5">
            <SectionHeader title=" میزان فروش هر دوره"></SectionHeader>
            <BoxChart
              api="http://localhost:4000/v1/course/getcourse"
              options={optionsPerSellerCourse}
              type="perSellCourse"
              label="میزان فروش هر درس "
              showDatePicker={false}
              colorChart="rgba(106, 137, 204,0.8)"
            />
          </div>
        </Tab>
        <Tab eventKey="کاربر ها" title="کاربر ها">
          <div className="mt-5 mb-5">
            <SectionHeader title="تعداد ثبت نام کاربر ها"></SectionHeader>

            <BoxChart
              api="http://localhost:4000/v1/user/getAll"
              options={optionsUsr}
              label="ثبت نام کاربر"
              colorChart="rgba(184, 233, 148,.9)"

            />
          </div>
        </Tab>
        <Tab eventKey="محتوای سایت" title="محتوای سایت">
          <div className="mt-5 mb-5">
            <div className="mt-5 mb-5"></div>
            <SectionHeader title="دوره های های جدید"></SectionHeader>
            <BoxChart
              api="http://localhost:4000/v1/course/getcourse"
              options={optionsCourse}
              label='"ثبت دوره"'
              colorChart="rgba(130, 204, 221,.9)"
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
