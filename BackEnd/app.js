const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const routerRegister = require("./Router/v1/routerRegister");
const RouterLogin = require("./Router/v1/routerLogin");
const Routergetme = require("./Router/v1/routerGETme");
const RouterForgotPass = require("./Router/v1/routerforgotpass");
const RouterUser = require("./Router/v1/routerUser");

const RouterCourse = require("./Router/v1/routeCourse");

const RouterArticle = require("./Router/v1/routerArticles");

const RouterMenuse = require("./Router/v1/routerMenuse");

const RouterDiscountCode = require("./Router/v1/routeDiscountCode");

const RouterTiket = require("./Router/v1/routerTiket");

const app = express();


app.use(
  "/coursesImage",
  express.static(path.join(__dirname, "public", "coursesImage"))
);
app.use(
  "/coursesVideo",
  express.static(path.join(__dirname, "public", "coursesVideo"))
);
//   app.use(express.urlencoded({ extended: false }));

app.use(
  "/ArticleImage",
  express.static(path.join(__dirname, "public", "ArticleImage"))
);

app.use(
  "/AvatarImage",
  express.static(path.join(__dirname, "public", "AvatarImage"))
);

app.use(
  "/TiketAttached",
  express.static(path.join(__dirname, "public", "TiketAttached"))
);


app.use(cors());

app.use(bodyParser.json());

app.use("/v1/auth", routerRegister);

app.use("/v1/auth", RouterLogin);

app.use("/v1/auth", Routergetme);

app.use("/v1/auth", RouterForgotPass);

app.use("/v1/user", RouterUser);

app.use("/v1/course", RouterCourse);

app.use("/v1/article", RouterArticle);

app.use("/v1/menuse", RouterMenuse);

app.use("/v1/discountcode", RouterDiscountCode);

app.use("/v1/tiket", RouterTiket);

module.exports = app;
