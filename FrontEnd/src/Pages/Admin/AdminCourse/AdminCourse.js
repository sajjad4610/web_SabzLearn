import React, {  useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import FromCourses from "../../../Components/Admin/FromCourses/FromCourses";
import InfoCurses from "../../../Components/Admin/FromCourses/InfoCurses/InfoCurses";

export default function AdminCourse() {
  const [refreshByTabs, setRafreshByTabs] = useState(false);

  const TabsHandler = (event) => {
    setRafreshByTabs((prev) => !prev);
  };

  return (
    <Tabs
      defaultActiveKey="making"
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={TabsHandler}
    >
      <Tab eventKey="making" title="ساخت دوره">
        <FromCourses
          api={"http://localhost:4000/v1/course/insertcourse"}
          method="POST"
          type=""
          refreshByTabs={refreshByTabs}
        />
      </Tab>

      <Tab eventKey="edite" title="ویرایش دوره" >
        <FromCourses
          api={`http://localhost:4000/v1/course/updata`}
          method="PUT"
          type="edit"
          refreshByTabs={refreshByTabs}
        />
      </Tab>

      <Tab eventKey="Coursetopics" title=" محتوای دوره">
        <InfoCurses type="" refreshByTabs={refreshByTabs} />
      </Tab>


    </Tabs>
  );
}
