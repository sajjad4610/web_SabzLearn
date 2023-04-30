import React, { useEffect, useReducer, useState } from "react";

import InputFormArticl from "./InputCearteFormArticle/InputFormArticle";
import ToastMessage from "../../../customUse/ToastMessage/ToastMessage";
import "./CearteFormArticle.css";
import EditorComponnet from "../../EditorComponnet/EditorComponnet";
import DataTable from "../../DataTable/DataTable";
import {
  columns,
  selectBoxSearch,
} from "../../../Schema/schemaTabel/schemaArticle/schemaArticle";
import UPloader from "../../Uploader/UPloader";
import Loading from "../../Loading/Loading";
import { Select } from "antd";
import { UseUpLoader } from "../../../customUse/UseUpLoader/UseUpLoader";
import { GetApi } from "../../../Servises/Api";
import GetServises from "../../../Servises/GetServises";
export default function CearteFormArticle({
  api,
  method,
  refreshByTabs,
  type,
}) {
  const [linkchild, setlinkchild] = useState([]);
  const [allArticle, setAllcArticle] = useState([]);
  const [FilterArticle, setFilterArticle] = useState([]);
  const [inputSelectArticle, setinputSelectArticle] = useState("");
  const [refreshTrash, setRafreshTrash] = useState(false);
  const [videoloading, setUploadedLoading] = useState(false);
  const [DataUPloader, setDataUPloader] = useState("");
  const [VlueUPloader, setVlueUPloader] = useState("");

  const [refreshByValidForm, setRafreshByValidForm] = useState("");

  const token = localStorage.getItem("user");

  const refreshTrashHandler = () => {
    setRafreshTrash((prev) => !prev);
  };

  let CheckForm = false;

  const [articleInput, dispatche] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "InputValueName": {
          return {
            ...state,
            articleName: action.ValueName,
          };
        }
        case "InputValueTitel": {
          return {
            ...state,
            articleTitel: action.ValueTitel,
          };
        }
        case "InputValueImage": {
          return {
            ...state,
            articleImage: action.ValueImage,
          };
        }
        case "InputValueLink": {
          return {
            ...state,
            articleLink: action.ValueLink,
          };
        }

        case "InputValueSection": {
          return {
            ...state,
            articleSection: action.ValueSection,
          };
        }

        case "InputValueDissection": {
          return {
            ...state,
            articleDissection: action.ValueDissection,
          };
        }
        case "InputValueHtml": {
          return {
            ...state,
            articleHtml: action.ValueHtml,
          };
        }
        case "InputValueWriter": {
          return {
            ...state,
            articleWriter: action.ValueWriter,
          };
        }

        default: {
          return "";
        }
      }
    },

    {
      articleName: "",
      articleTitel: "",
      articleImage: "",
      articleDissection: "",
      articleHtml: "",
      articleWriter: "",
      articleLink: "",
    }
  );

  useEffect(() => {
    GetServises(GetApi.ArticleApi)
      .then((result) => {
        setAllcArticle(result);
        let filercourse = result.filter((e) => {
          return e.name === inputSelectArticle;
        });
        return filercourse;
      })
      .then((filercourse) => {
        if (filercourse.length) {
          setFilterArticle(filercourse);
          dispatche({
            type: "InputValueName",
            ValueName: filercourse[0].name ? filercourse[0].name : "",
          });

          dispatche({
            type: "InputValueTitel",
            ValueTitel: filercourse[0].titel ? filercourse[0].titel : "",
          });

          dispatche({
            type: "InputValueWriter",
            ValueWriter: filercourse[0].writer ? filercourse[0].writer : "",
          });

          dispatche({
            type: "InputValueDissection",
            ValueDissection: filercourse[0].dissection
              ? filercourse[0].dissection
              : "",
          });
          dispatche({
            type: "InputValueHtml",
            ValueHtml: filercourse[0].html ? filercourse[0].html : "",
          });
          dispatche({
            type: "InputValueImage",
            ValueImage: filercourse[0].image ? filercourse[0].image : "",
          });
          dispatche({
            type: "InputValueLink",
            ValueLink: filercourse[0].link ? filercourse[0].link : "",
          });
          setVlueUPloader(filercourse[0].image ? filercourse[0].image : "");
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSelectArticle, refreshByTabs, refreshByValidForm]);

  useEffect(() => {
    GetServises(GetApi.MenuseApi).then((result) => {
      // let filterFather = result.filter((e) => e.parent === "__");
      let filterChild = result.filter((e) => e.parent !== "__");
      let filterChildArticles = result.filter((e) => e.parent === "مقالات");

      filterChild.length > 0 && setlinkchild(filterChildArticles);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputValueNameHandler = (event) => {
    dispatche({
      type: "InputValueName",
      ValueName: event.target.value,
    });
  };
  const inputValueTitelHandler = (event) => {
    dispatche({
      type: "InputValueTitel",
      ValueTitel: event.target.value,
    });
  };
  const InputValueDissectionHandler = (event) => {
    dispatche({
      type: "InputValueDissection",
      ValueDissection: event.target.value,
    });
  };
  const InputValueHtmlHandler = (data) => {
    dispatche({
      type: "InputValueHtml",
      ValueHtml: data,
    });
  };
  const InputValueWriterHandler = (event) => {
    dispatche({
      type: "InputValueWriter",
      ValueWriter: event.target.value,
    });
  };
  const inputValuelinkHandler = (event) => {
    dispatche({
      type: "InputValueLink",
      ValueLink: event.target.value,
    });
  };
  let ArticleData = {
    name: articleInput.articleName,
    titel: articleInput.articleTitel,
    image: VlueUPloader,
    writer: articleInput.articleWriter,
    dissection: articleInput.articleDissection,
    link: articleInput.articleLink,
    html: articleInput.articleHtml,
  };

  const sendDataArticleHandler = async (event) => {
    setUploadedLoading(true);
    DataUPloader &&
      (await UseUpLoader(
        DataUPloader,
        `http://localhost:4000/v1/article/uploadImage`
      )
        .then((ResultUploadUse) => {
          setVlueUPloader(ResultUploadUse);
          ArticleData.image = ResultUploadUse;
          return ResultUploadUse;
        })
        .then(async (VlueUPloader) => {
          if (ArticleData.image && VlueUPloader) {
            await fetch(
              type === "edite" ? `${api}/${FilterArticle[0]._id}` : api,
              {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(ArticleData),
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                setRafreshByValidForm(result);
                ToastMessage(result.message);
              })
              .then((validForm) => {
                setUploadedLoading(false);
                validForm && refreshTrashHandler();
                // setinputSelectArticle('')
              });
          }
        }));
    !DataUPloader &&
      (await fetch(type === "edite" ? `${api}/${FilterArticle[0]._id}` : api, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ArticleData),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setRafreshByValidForm(result);
          ToastMessage(result.message);
        })
        .then((validForm) => {
          setUploadedLoading(false);
          validForm && refreshTrashHandler();
          // setinputSelectArticle('')
        }));
  };

  if (
    ArticleData.name &&
    ArticleData.image &&
    ArticleData.titel &&
    ArticleData.writer &&
    ArticleData.dissection &&
    ArticleData.link
  ) {
    CheckForm = true;
  } else {
    CheckForm = false;
  }

  return (
    <div>
      {videoloading && <Loading />}
      <div className="row justify-content-between  align-items-center">
        <div className="col-12 mb-5 mt-5">
          {type === "edite" ? (
            <Select
              allowClear={true}
              className="border-0 border-bottom"
              showSearch
              style={{
                width: "50%",
              }}
              placeholder="لطفا یکی ار دورها را انتخاب کنید"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => setinputSelectArticle(value)}
              options={allArticle.map((label) => ({
                label: label.name,
                value: label.name,
              }))}
            />
          ) : null}
        </div>

        <div className="col-12">
          <div className="row row-cols-1 row-cols-lg-2 justify-content-center align-items-start ">
            <div className="col order-1  order-lg-0 d-flex flex-column justify-content-strat align-items-start">
              <InputFormArticl
                value={articleInput.articleName}
                icon="fa-book"
                inputValueHandler={inputValueNameHandler}
                courseData={ArticleData.name}
                placeholder={"نام مقاله را وارد کنید"}
              />
              <InputFormArticl
                value={articleInput.articleTitel}
                icon="fa-flag"
                inputValueHandler={inputValueTitelHandler}
                courseData={ArticleData.titel}
                placeholder={"عنوان مقاله را وارد کنید"}
              />
              <InputFormArticl
                value={articleInput.articleWriter}
                icon="fa-pencil"
                inputValueHandler={InputValueWriterHandler}
                courseData={ArticleData.writer}
                placeholder={"نویسنده مقاله را وارد کنید"}
              />
              <InputFormArticl
                idDataList="link"
                value={articleInput.articleLink}
                icon="fa-link"
                inputValueHandler={inputValuelinkHandler}
                courseData={ArticleData.link}
                placeholder={"لینک مقاله را وارد کنید"}
              ></InputFormArticl>
              <datalist id="link">
                {linkchild.length > 0 &&
                  linkchild.map((e) => {
                    return <option key={e._id}>{e.linkchild}</option>;
                  })}
              </datalist>
            </div>
            <div className="col  order-0  order-lg-1 d-flex justify-content-center align-items-center  ">
              <UPloader
                appendName="photo"
                VlueUPloader={VlueUPloader}
                setVlueUPloader={setVlueUPloader}
                setDataUPloader={setDataUPloader}
                size="larg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <textarea
            value={articleInput.articleDissection}
            onChange={InputValueDissectionHandler}
            name=""
            id=""
            cols="175"
            rows="2"
            placeholder="توضیح کوتاه مقاله"
            className={`w-100 ${
              ArticleData.dissection
                ? " border-success "
                : "text-danger border-danger"
            }`}
          ></textarea>
        </div>
      </div>
      <div className="row mt-5 justify-content-center ">
        <div className="col-12 d-flex justify-content-center ">
          <EditorComponnet
            vlueHtml={articleInput.articleHtml}
            InputValueHtmlHandler={InputValueHtmlHandler}
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center mt-5 mb-5 ">
        <div className="col col-lg-7   d-flex justify-content-center mb-5">
          <button
            className={`${
              CheckForm ? "btn-outline-success" : "disabled"
            } btn  w-75 p-2 mb-5 fs-4 `}
            onClick={sendDataArticleHandler}
          >
            ارسال
          </button>
        </div>
      </div>

      <DataTable
        refreshByTabs={refreshByTabs}
        refreshTrash={refreshTrash}
        refreshTrashHandler={refreshTrashHandler}
        refreshByValidform={refreshByValidForm}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/article/getArticle"
        apiRemove={"http://localhost:4000/v1/article/remove"}
        methodRemove={"Delete"}
        messageTrash="آیا از مقاله این دوره مطمئن هستید؟"
      ></DataTable>
    </div>
  );
}
