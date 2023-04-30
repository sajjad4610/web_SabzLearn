import React from 'react'
import { Link } from 'react-router-dom'

export default function BoxLoginRegister() {
  return (
    <>
         <Link
              to="/login"
              className=" pt-1 pb-1 btnLogin  text-white border-end border-2 border-light pe-1 text-decoration-none"
            >
              ورود
            </Link>
            <Link
              to="/Register"
              className=" pt-1 pb-1 btnLogin ms-1 text-white text-decoration-none"
            >
              عضویت
            </Link>
    </>
  )
}
