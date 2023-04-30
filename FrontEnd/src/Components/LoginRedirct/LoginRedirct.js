import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../../ContextApi/UserContextApi";

export default function LoginRedirct({ redirct = "/" }) {
  const { isLogin } = useContext(userContext);

  return <>{isLogin && <Navigate to={redirct} />}</>;
}
