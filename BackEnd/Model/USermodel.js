const mongoose = require("mongoose");

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let regexMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
      lowerCase: true,
    },
    family: {
      type: String,
      default: "",
      trim: true,
      lowerCase: true,
    },
    github: {
      type: String,
      default: "",
      trim: true,
      lowerCase: true,
    },
    username: {
      type: String,
      required: [true, "نوشتن نام کاربری اجباری است"],
      minLength: [3, "نام کاربری حداقل باید 3 کارکتر باشد"],
      maxLength: [12, "نام کاربری حداکثر باید 12 کارکتر باشد"],
      trim: true,
      lowerCase: true,
    },
    email: {
      type: String,
      required: [true, "نوشتن ایمیل اجباری است"],
      unique: true,
      validate: {
        validator: function (v) {
          return regexEmail.test(v);
        },
        message: "ایمیل نامعتبر است",
      },
    },
    password: {
      type: String,
      required: [true, "رمزعبور حداقل باید 8 کارکتر باشد"],
      trim: true,
      lowerCase: true,
    },
    moment: {
      type: String,
      trim: true,
      lowerCase: true,
    },

    phone: {
      type: String,
      required: [true, "نوشتن شماره تلفن اجباری است"],
      validate: {
        validator: function (v) {
          return regexMobile.test(v);
        },
        message: "شماره موبایل نامعتبر است",
      },
    },

    courses: {
      type: Array,
      default: [],
      default: [],
    },

    card: {
      type: Array,
      default: [],
    },
    notification: {
      type: Array,
      default: [],
    },

    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "غیر قابل قبول است {VALUE}  ",
      },
      default: "user",
    },

    avatar: {
      type: String,
      default: "",
    },
    chat: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

const USermodel = mongoose.model("User", schema);

module.exports = USermodel;
