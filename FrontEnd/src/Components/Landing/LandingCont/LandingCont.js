/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

export default function LandingCont({ count, speed = 10 }) {
  const [conter, setConter] = useState(0);
  useEffect(() => {
    let InterVal = setInterval(() => {
      setConter((prev) => prev + 1);
    }, [speed]);
    conter >= count && clearInterval(InterVal);
    return () => clearInterval(InterVal);
  }, [conter, count]);

  return <span className="landing-status__count">{conter}</span>;
}
