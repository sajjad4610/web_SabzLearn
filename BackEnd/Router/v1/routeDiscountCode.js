const experess = require("express");
const jwt = require("jsonwebtoken");
const DiscountCodeModel = require("../../Model/DiscountCodeModel");
const moment = require('moment-jalaali')

const RouterDiscountCode = experess.Router();

RouterDiscountCode.post("/insertdiscountcode", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const {
      codeValue,
      percentValue,
      fewTimesValue,
      Coursesname,
      Coursesid,
      CreateUserEmeil,
    } = req.body;

    const dataCourse = {
      codeValue,
      percentValue,
      fewTimesValue,
      Coursesname,
      Coursesid,
      CreateUserEmeil,
      moment:moment().format('jYYYY/jM/jD')

    };
    let NewDiscountCodeModel = new DiscountCodeModel(dataCourse);

    NewDiscountCodeModel.save()
      .then((result) => {
        res
          .status(200)
          .json({
            message: `ثبت  کد تخفبف جدید  برای ${Coursesname} با موفقیت انجام شد`,
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({
            error:
              err.code === 11000 ? "کد تخفیف تکراری است " : "خطایی رخ داده است",
          });
      });
  }
});

RouterDiscountCode.get("/getdiscountcode", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    DiscountCodeModel.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.status(400).json(err));
  }
});

RouterDiscountCode.put("/updatadiscountcode/:id", (req, res) => {
  const id = req.params.id;
  const {
    codeValue,
    percentValue,
    fewTimesValue,
    Coursesname,
    Coursesid,
    CreateUserEmeil,
  } = req.body;

  const updatData = {
    codeValue,
    percentValue,
    fewTimesValue,
    Coursesname,
    Coursesid,
    CreateUserEmeil,
  };
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    DiscountCodeModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res
          .status(200)
          .json({
            message: `ثبت  کد تخفبف برای ${Coursesname} بروز رسانی  شد`,
          });
      })
      .catch((err) =>
        res
          .status(400)
          .json({
            error:
              err.code === 11000 ? "کد تخفیف تکراری است " : "خطایی رخ داده است",
          })
      );
  }
});
RouterDiscountCode.put("/updatadiscountcodeUseUserEmeil/:id", (req, res) => {
  const id = req.params.id;
  const { UseUserEmeil } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    DiscountCodeModel.findByIdAndUpdate(id, {
      $push: { UseUserEmeil },
    }).then((result) => {
      res.status(200).json({ message: "" });
    });
    
  }
});

RouterDiscountCode.delete("/remove/:id/:allremove", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    DiscountCodeModel.findByIdAndRemove(id)
      .then((result) =>
        res.status(200).json({ message: "کد تخفبف با موفقیت حدف شد" })
      )
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = RouterDiscountCode;
