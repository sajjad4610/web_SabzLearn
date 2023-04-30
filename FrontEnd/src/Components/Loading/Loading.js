import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Spin } from "antd";

export default function Loading({
  color = "success",
  setTimeOutLoading,
  type,
  timeDlay=1000,
  model = "line",
}) {
  if (type === "dlay") {
    setTimeout(() => {
      setTimeOutLoading(true);
    }, timeDlay);
  }

  return (
    <>
      {model === "line" ? (
        <Box sx={{ width: '100%'   }}>
          <LinearProgress color={color} />
        </Box>
      ) : (
        <Box sx={{ width: '100%' ,display:'flex' , justifyContent:'end'  }}>
          <Spin></Spin>
        </Box>
      )}
    </>
  );
}
