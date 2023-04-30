const express = require("express");
const mongoose = require("mongoose");
const HashBcry = require("bcryptjs");
const USermodel = require("../../Model/USermodel");
const moment = require('moment-jalaali')

const routerRegister = express.Router();

routerRegister.post("/register", async (req, res, next) => {
  let HashPass;
  let { username, email, password, phone, role, courses, card ,avatar,chat} = req.body;
  
  
  password.length < 8
    ? (HashPass = "")
    : (HashPass = await HashBcry.hash(password, 10));

  let Input = {
    username,
    password: HashPass,
    email,
    phone,
    role,
    courses,
    card,
    avatar,
    chat,
    moment:moment().format('jYYYY/jMM/jDD')

  };

  let USer = new USermodel(Input);

  USer.save()
    .then((resu) => {
      res.status(200).json([{ message: `ثبت نام (${username}) با موفقیت انجام شد`, err: false }]);
    })
    .catch((err) => {
      if (Object.values(err)[1] !== 11000) {
        let messageError = Object.values(err.errors).map((e) => {
          return e.properties;
        });
        res.send(messageError);
      } else {
        res.send([
          {
            message: "این ایمیل قبلا ثبت شده",
            type: "unique",
            path: "email",
            // err: true
          },
        ]);
      }
    });
});

module.exports = routerRegister;
