import { Rate } from "antd";
import React, { useContext, useEffect, useState } from "react";
import useContextUser from "../../ContextApi/UserContextApi";

export default function StarRater({ id, SendMessageRate }) {
  const [getRate, setGetRate] = useState(0);
  const [messageRate, setMessageRate] = useState("");
  const { isLogin, userInfo, token } = useContext(useContextUser);
  const desc = ['خیلی بد', 'بد', 'نرمال', 'خوب', 'عالی'];
  useEffect(() => {
    fetch(`http://localhost:4000/v1/course/GetRatecourse/${id}`, {})
      .then((res) => {
        return res.json();
        
      })
      .then((result) => {
        setGetRate(result.rate);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRate,id]);

  const sendRateHandler = (event) => {
    let dataRate = {
      isLogin,
      email: userInfo.user.email,
      rate: event,
    };
    fetch(`http://localhost:4000/v1/course/setRatecourse/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataRate),
    })
      .then((res) => res.json())
      .then((result) => {
        setMessageRate(result.message);
        SendMessageRate(result.message);
        setTimeout(() => {
          setMessageRate("");
          SendMessageRate("");
        }, 3000);
      });
  };
  return (

    <span>
    <Rate tooltips={desc} onChange={sendRateHandler} value={getRate}  />
  </span>
  );
}
