import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CearteFormDiscountCode from "../../../Components/Admin/CearteFormDiscountCode/CearteFormDiscountCode";
export default function DiscountCode() {
  const [refreshByTabs, setRafreshByTabs] = useState(false);

  const TabsHandler = (event) => {
    setRafreshByTabs((prev) => !prev);
  }
  return (
    <div>
      <Tabs
        defaultActiveKey="makingDiscountCode"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={TabsHandler}
      >
        <Tab eventKey="makingDiscountCode" title="ساخت کد تخفیف">
          <CearteFormDiscountCode refreshByTabs={refreshByTabs} />
        </Tab>
        <Tab eventKey="editeDiscountCode" title="ویرایش کد تخفیف">
          <CearteFormDiscountCode refreshByTabs={refreshByTabs} type="edite" />
        </Tab>
      </Tabs>
    </div>
  );
}
