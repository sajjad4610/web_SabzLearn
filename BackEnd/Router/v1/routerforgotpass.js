const express = require("express");
const mongoose = require("mongoose");
const HashBcry = require("bcryptjs");
const nodemailer = require("nodemailer");
const moment = require('moment-jalaali')

const USermodel = require("../../Model/USermodel");

const RouterForgotPass = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "sajjad.mahmoodi.46104610@gmail.com",

    pass: "mdrratwkhgulofqu", 
  },

});

RouterForgotPass.post("/forgotpass", (req, res) => {
  const { email } = req.body;
  USermodel.findOne({ email }).then(async (result) => {
    if (result) {
      const newPass =String(Math.floor(Math.random() * 1000 * 10000000));
      const mailOptions = {
        from: "vindication@enron.com",

        to: `${result.email}`,

        subject: "سبزلرن* ",

        text:`New pass : ${newPass} \n

        لطفا سریعا به تغییر پسورد خود اقدام کنید


        `,
      };


      transporter.sendMail(mailOptions,  async (error, info)=> {
        if (error) {
          res.status(200).json({ err: " خطا در ارسال ایمیل لطفا دوباره تلاش کنید" });
        } else {
          res
            .status(200)
            .json({ successful: "ایمیل حاوی پسورد جدید برای شما ارسال شد" });
            let HashNewPass = await HashBcry.hash(newPass,10)
            USermodel.findByIdAndUpdate(`${result._id}`,{password:`${HashNewPass}`}).then(e=>{
            })
        }
      });
    } else {
      res.status(404).json({ err: "شخصی با این ایمیل یافت نشد " });
    }
  });
});
module.exports = RouterForgotPass;
