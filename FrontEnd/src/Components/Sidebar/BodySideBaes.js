import React, { useState } from "react";
import { Avatar } from "antd";
import { Collapse } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { Link } from "react-router-dom";
const { Panel } = Collapse;
export default function BodySideBaes({
  logo,
  Item,
  avatar,
  nameUser,
  breckPoint,
  padding,
  iconSize= "fs-2",
  fontsize= "fs-2",
  iconSizeChild='fs-3',
fontsizeChild='fs-3',
  col = "col-2",
  ButtonMini = true,
}) {
  const [openBars, setOpenBars] = useState(true);
  const [clickIteme, setClikeIteme] = useState(true);
  const [clickChildIteme, setClikeChildIteme] = useState(true);

  const showDrawer = () => {
    setOpenBars((prev) => !prev);
  };

  const ColorIconMainHandler = (event, id) => {
    event.preventDefault();
    setClikeIteme(id);
    setClikeChildIteme("");
  };
  const ColorIconSubHandler = (event, idChid, id) => {
    event.preventDefault();
    setClikeChildIteme(idChid);
    setClikeIteme(id);
  };
  return (
    <div
      className={` overflow-scroll delay Sidebar color progress-bar-striped position-sticky sticky-top  ${
        breckPoint ? `d-none d-${breckPoint}-block` : ""
      }
   
    ${openBars ? `${col} ` : " col-1   "}
`}
    >
      <div className={`row justify-content-end delay Headercolor`}>
        <div className="col d-flex justify-content-end p-0  " >
          {ButtonMini ? (
            <button
              className={`fa btn text-secondary ItemHover delay border-0 ${
                openBars ? " fa-arrow-right  fs-4" : " fa-arrow-left fs-4"
              }`}
              onClick={showDrawer}
            ></button>
          ) : null}
        </div>
      </div>
      <div className={`row  flex-column justify-content-center delay `}>
        <Link to="/"
          className={`delay pb-3 Headercolor  col d-flex  justify-content-center HeaderBorder shadow ${padding}`}
        >
          <img className="delay img-fluid  " src={logo} alt="" />
        </Link>
        <div className={`delay   col d-flex  justify-content-center `}>
          <div className="row flex-column align-items-center justify-content-center">
            <div className="col align-items-center justify-content-center d-flex">
              <Avatar
                className="  mt-3"
                size={openBars ? 100 : 64}
                src={avatar}
              />
            </div>
            <div className="col  align-items-center justify-content-center d-flex">
              {openBars ? (
                <span className="fs-4 " style={{ color: "#b8e994" }}>
                  {nameUser}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {openBars ? (
          <div className={`delay col aniMaxMenue ${padding}`}>
            {Item.map((e) => (
              <div
                className="row mt-2   align-items-center g-0 flex-nowrap"
                key={e.id}
              >
                {e.child.length ? (
                  <Collapse
                    key={e.id}
                    expandIconPosition={"end"}
                    size="small"
                    className="col text-white  p-0 pt-1  pb-1  "
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIcon={({ isActive }) => (
                      <DoubleLeftOutlined
                        className="text-secondary ItemHover   fs-4"
                        rotate={isActive ? 270 : 0}
                        style={{ padding: "0" }}
                      />
                    )}
                  >
                    <Panel
                      className={`text-white  rounded-3`}
                      header={
                        <Link to={e.link} className="row flex-nowrap align-items-center p-0 text-decoration-none  ">
                          <Link to={e.link}
                            className={`col-2 fa text-decoration-none me-3 ItemHover ${iconSize}  ${
                              e.id === clickIteme
                                ? "text-warning  "
                                : "text-info  "
                            } ${e.icon}`}
                          ></Link>
                          <Link className={`text-white col ItemHover  text-decoration-none p-0 ${fontsize} `}>
                            {e.text}
                          </Link>
                        </Link>
                      }
                    >
                      {e.child.map((ee) => (
                        <Link to={ee.link}
                          className={`row mb-3  align-items-center text-decoration-none `}
                          key={ee.id}
                          onClick={(event) =>
                            ColorIconSubHandler(event, ee.id, e.id)
                          }
                        >
                          <Link to={ee.link} className="col-12 text-decoration-none">
                            <Link to={ee.link}
                              className={`col-2 fa  me-2 text-decoration-none ${iconSizeChild} ${
                                ee.id === clickChildIteme
                                  ? "text-warning "
                                  : "text-white"
                              }  ${e.icon}`}
                            ></Link>
                            <Link
                              to={ee.link}
                              className={`text-info ${fontsizeChild} text-decoration-none  ItemHover`}
                            >
                              {ee.text}
                            </Link>
                          </Link>
                        </Link>
                      ))}
                    </Panel>
                  </Collapse>
                ) : (
                  <Link to={e.link}
                    className={`text-white row flex-nowrap align-items-center text-decoration-none p-0 pt-2  pb-2`}
                    onClick={(event) => ColorIconMainHandler(event, e.id)}
                  >
                    <Link to={e.link}
                      className={`col-2  text-decoration-none fa ${iconSize}  me-3  ${
                        e.id === clickIteme
                          ? "text-warning  "
                          : "text-info "
                      } ${e.icon}`}
                    ></Link>
                    <Link
                      to={e.link}
                      className={`text-white col m-0  text-decoration-none ItemHover p-0  ${fontsize}`}
                    >
                      {e.text}
                    </Link>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={` delay  col  aniMiniMenue`}>
            {Item.map((e) => (
              <Link to={e.link}
                className="row justify-content-center  text-decoration-none  w-100 align-items-baseline g-0 flex-nowrap"
                key={e.id}
              >
                {e.child.length ? (
                  <Popover
                    placement="leftTop"
                    trigger="click"
                    color="rgb(2, 20, 105)"
                    content={
                      <>
                        {e.child.map((ee) => (
                          <Link
                          to={ee.link}
                            className="row mt-3 w-100  text-decoration-none "
                            key={ee.id}
                            onClick={(event) =>
                              ColorIconSubHandler(event, ee.id, e.id)
                            }
                          >
                            <Link to={ee.link} className="col-12">
                              <Link to={ee.link}
                                className={`col-2 text-decoration-none ${iconSizeChild}  fa  me-1  ${
                                  ee.id === clickChildIteme
                                    ? "text-warning  "
                                    : "text-white "
                                }   ${e.icon}`}
                              ></Link>
                              <Link
                                to={ee.link}
                                className= {`text-info ${fontsizeChild} text-decoration-none  ItemHover`}
                              >
                                {ee.text}
                              </Link>
                            </Link>
                          </Link>
                        ))}
                      </>
                    }
                    title={
                      <span className="text-white fs-4 d-flex justify-content-center border-bottom ">
                        {e.text}
                      </span>
                    }
                  >
                    <div
                      className={`row justify-content-between align-items-center g-0 flex-nowrap  rounded-3`}
                    >
                      <div className="col">
                        <Link
                          to={e.link}
                          className={`col-2 mt-5 ms-1 fa text-decoration-none ${iconSize} ItemHover ${
                            e.id === clickIteme
                              ? "text-warning  "
                              : "text-white "
                          }  ${e.icon} text-decoration-none`}
                        ></Link>
                      </div>
                      <div className="col mt-5">
                        <LeftOutlined className="text-secondary fs-3 ms-1 " />
                      </div>
                    </div>
                  </Popover>
                ) : (
                  <Link
                  to={e.link}
                    className={`row justify-content-between align-items-center  text-decoration-none w-100 g-0 flex-nowrap  rounded-3`}
                    onClick={(event) => ColorIconMainHandler(event, e.id)}
                  >
                    <Link
                      to={e.link}
                      className={`col-2 mt-5 ms-1 w-100  ItemHover ${iconSize} fa  ${
                        e.id === clickIteme
                          ? "text-warning "
                          : "text-white "
                      }  ${e.icon} text-decoration-none`}
                    ></Link>
                  </Link>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
