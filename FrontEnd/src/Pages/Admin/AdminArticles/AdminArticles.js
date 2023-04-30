import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CearteFormArticle from "../../../Components/Admin/CearteFormArticle/CearteFormArticle";

export default function AdminArticles() {
  const [refreshByTabs, setRafreshByTabs] = useState(false);

  const TabsHandler = (event) => {
    setRafreshByTabs((prev) => !prev);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="makingArticle"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={TabsHandler}
      >
        <Tab eventKey="makingArticle" title="ساخت مقاله">
          <CearteFormArticle
            api={"http://localhost:4000/v1/article/insertArticle"}
            method="POST"
            refreshByTabs={refreshByTabs}
          />
        </Tab>
        <Tab eventKey="editeArticle" title="ویرایش مقاله">
          <CearteFormArticle
            api={`http://localhost:4000/v1/article/updataArticle`}
            method="PUT"
            refreshByTabs={refreshByTabs}
            type="edite"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
