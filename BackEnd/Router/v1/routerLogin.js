const express = require("express");
const HashBcry = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require('moment-jalaali')
const USermodel = require("../../Model/USermodel");

const RouterLogin = express.Router();

RouterLogin.post("/login", (req, res,next) => {
  let { email, password } = req.body;
  USermodel.find({ email }).then(async (resu) => {
    if (resu.length > 0) {
      let getPassOfDb = resu.map((e) => {
        return e.password;
      });
      let CheckPassHash = await HashBcry.compare(password, getPassOfDb[0]);
      if (CheckPassHash) {
        let token = jwt.sign(
          {
            user: {
              userid: resu[0]._id.toString(),
              username: resu[0].username,
              email: resu[0].email,
              role: resu[0].role,
              // avatar:resu[0].avatar,
            },
          },
          process.env.JWT_SECRET,

          {
            // expiresIn:"1m"
          }
        );
        res.status(200).json({ token, userid: resu[0]._id.toString() });
      } else {
        res.status(422).json({ err: "ایمیل یا رمز عبور درست نیست" });
      }
    
    } else {
      res.status(422).json({ err: "ایمیل صحیح نمی باشد" });
    }
  });
});

module.exports = RouterLogin;
