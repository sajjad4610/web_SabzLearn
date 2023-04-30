import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Popover, Typography } from "@mui/material";
import ShopCard from "./ShopCard/ShopCard";
import { Statistic } from "antd";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import useContextUser from "../../ContextApi/UserContextApi";

import "./ShoppingCart.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -6,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 0px",
  },
}));

export default function ShoppingCart() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLogin, userInfo, isRefresh } = useContext(useContextUser);
  const [cardInfo, setcardInfo] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [removeRefreshCard, setRemoveRefresh] = useState(false);
  const token = localStorage.getItem("user");

  const formatter = (value) => <CountUp end={value} separator="," />;

  useEffect(() => {
    isLogin &&
      fetch(`http://localhost:4000/v1/user/getuser/${userInfo.user.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setcardInfo(result.card);
          if (result.card.length) {
            let arrayCost = result.card.flatMap(
              (e) => e.courseCost - e.courseCost * (e.courseDiscount / 100)
            );
            let arrayCostAdd = arrayCost.reduce((s1, s2) => s1 + s2);
            setTotalCost(arrayCostAdd);
          } else {
            setTotalCost(0);
          }
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh, token, isLogin, removeRefreshCard]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton aria-label="cart" className=" ms-4 ">
        <StyledBadge badgeContent={cardInfo.length} color="success">
          <ShoppingCartIcon
            className="fs-1 text-warning border-0 p-0 m-0"
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          />
        </StyledBadge>
        <Popover
          className=" HightPopoverShopCard"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="row flex-column">
            <div className="col">
              {cardInfo.map((e) => (
                <Typography key={e.idcard} sx={{ p: 1 }} component={"span"}>
                  <ShopCard
                    Titel={e.courseName}
                    CoursePrice={e.courseCost}
                    CourseDiscount={e.courseDiscount}
                    Img={e.courseImg}
                    Discount={e.courseDiscount}
                    dataTime={e.moment}
                    userEmail={e.userEmail}
                    courseId={e.courseId}
                    userid={isLogin && userInfo.user.userid}
                    idcard={e.idcard}
                    courseLink={e.courseLink}
                    setRemoveRefresh={setRemoveRefresh}
                  ></ShopCard>
                </Typography>
              ))}
              {cardInfo.length === 0 && (
                <Typography component={"span"} className="fs-2 text-dark pe-2 ps-2 m-0 p-2">
                  سبد خرید خالی است
                </Typography>
              )}
            </div>
            {cardInfo.length && (
              <div className="col PopoverUPBOX bg-white  w-100 m-0 p-0  ">
                <div className="row m-0 p-2  flex-column">
                  <div className="col p-1 d-flex justify-content-center align-items-center bg-success ">
     
                    <span className="fs-2  ">
                      {`جمع کل : `}{" "}
                    
                    </span>
                    <Statistic
                        value={Math.ceil(totalCost)}
                        precision={2}
                        formatter={formatter}
                        valueStyle={{ color: "white" }}
                      />
                  </div>

                  <div className="col p-1 d-flex justify-content-center ">
                    <Link
                      className="fs-3 text-decoration-none  btn btn-outline-danger m-3 w-50"
                      to="/Cart"
                    >
                      ادامه خرید
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Popover>
      </IconButton>
    </>
  );
}
