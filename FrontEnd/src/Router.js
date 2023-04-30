import Home from "./Pages/Home/Home";
import Article from "./Pages/Article/Article";
import Category from "./Pages/Category/Category";
import Course from "./Pages/Course/Course";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Cart from "./Pages/Cart/Cart";

import AdminIndex from "./Pages/Admin/AdminIndex";
import AdminUsers from "./Pages/Admin/AdminUsers/AdminUsers";
import AdminCourse from "./Pages/Admin/AdminCourse/AdminCourse";
import AdminArticles from "./Pages/Admin/AdminArticles/AdminArticles";
import AdminMenues from "./Pages/Admin/AdminMenues/AdminMenues";
import AdminDiscountCode from "./Pages/Admin/AdminDiscountCode/AdminDiscountCode";
import AdminComment from "./Pages/Admin/AdminComment/AdminComment";


import UserPanel from "./Pages/UserPanel/UserPanel";

import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import AdminQuestion from "./Pages/Admin/AdminQuestion/AdminQuestion";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Search from "./Pages/Search/Search";
import UserHome from "./Pages/UserPanel/UserHome/UserHome";
import UserAccount from "./Pages/UserPanel/UserAccount/UserAccount";
import UserPurchasedCourses from "./Pages/UserPanel/UserPurchasedCourses/UserPurchasedCourses";
import UserBill from "./Pages/UserPanel/UserBill/UserBill";
// import UserWallet from "./Pages/UserPanel/UserWallet/UserWallet";
import UserTicket from "./Pages/UserPanel/UserTicket/UserTicket";
import ChatColleagues from "./Components/Admin/ChatColleagues/ChatColleagues";
import Tiket from "./Pages/Admin/Tiket/Tiket";

const routers = [
  { path: "/", element: <Home></Home> },
  { path: "/articles/:section", element: <Article></Article> },
  { path: "/category/:categoryinfo", element: <Category></Category> },
  { path: "/course/:section/:name/*", element: <Course></Course> },
  { path: "/Register", element: <Register api="http://localhost:4000/v1/auth/register" method='POST' message='ثبت نام با موفقیت انجام شد'></Register> },
  { path: "/login", element: <Login></Login> },
  { path: "/forgotpass", element: <ForgotPassword></ForgotPassword> },
  { path: "/cart", element: <Cart></Cart> },
  { path: "/aboutus/:section", element: <AboutUs></AboutUs> },
  { path: "/sherch/:InputShearch", element: <Search></Search> },


  {
    path: "/p-admin/*",
    element: <AdminIndex></AdminIndex>,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "users", element: <AdminUsers /> },
      { path: "courses", element: <AdminCourse /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "menus", element: <AdminMenues /> },
      { path: "discount-code", element: <AdminDiscountCode /> },
      { path: "comment", element: <AdminComment /> },
      { path: "question", element: <AdminQuestion /> },
      { path: "account", element: <UserAccount /> },
      { path: "Chat-colleagues", element: <ChatColleagues /> },
      { path: "tiket", element: <Tiket /> },
    ],
  },
  {
    path: "/p-user/*",
    element: <UserPanel/>,
    children: [
      { path: "", element: <UserHome /> },
      { path: "account", element: <UserAccount /> },
      { path: "purchasedcourses", element: <UserPurchasedCourses/> },
      { path: "bill", element: <UserBill /> },
      // { path: "wallet", element: <UserWallet /> },
      { path: "ticket", element: <UserTicket /> },
      { path: "comment", element: <AdminComment /> },
      { path: "question", element: <AdminQuestion /> },
    ],
  },
];

export default routers;
