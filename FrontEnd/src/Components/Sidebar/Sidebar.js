import React, { useState } from "react";
import { Button, Drawer } from "antd";

import "./Sidebar.css";
import BodySideBaes from "./BodySideBaes";
export default function Sidebar({
  logo,
  Item,
  avatar,
  nameUser,
  breckPoint,
  iconSize = "fs-1",
  fontsize = "fs-1",
  iconSizeChild = "fs-5",
  fontsizeChild = "fs-5",
  col = "col-2",
}) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen((prve) => !prve);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    
      <BodySideBaes
        logo={logo}
        Item={Item}
        breckPoint={breckPoint}
        avatar={avatar}
        nameUser={nameUser}
        col={col}
        iconSize={iconSize}
        fontsize={fontsize}
        iconSizeChild={iconSizeChild}
        fontsizeChild={fontsizeChild}
      />

      <Button
        className="position-absolute start-0  ms-3 mt-0  buttonBars  d-lg-none"
        onClick={showDrawer}
        shape="circle"
        icon={<i className="fa fa-bars fs-5 text-center text-bg-success"></i>}
      />
      {open ? (
        <Drawer
          title=""
          placement="right"
          onClose={onClose}
          open={open}
          bodyStyle={{
            padding: "0",
          }}
          headerStyle={{
            display: "none",
          }}
          width={300}
        >
          <BodySideBaes
            logo={logo}
            Item={Item}
            col="w-100"
            ButtonMini={false}
            avatar={avatar}
            nameUser={nameUser}
            padding="p-4"
            iconSize={iconSize}
            fontsize={fontsize}
            iconSizeChild={iconSizeChild}
            fontsizeChild={fontsizeChild}
          />
        </Drawer>
      ) : null}
    </>
  );
}
