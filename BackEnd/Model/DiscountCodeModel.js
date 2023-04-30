const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    codeValue: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,
    },
    percentValue: {
      type: Number,
      required: true,
      trim: true,
      lowerCase: true,
    },
    fewTimesValue: {
      type: Number,
      required: true,
      trim: true,
      lowerCase: true,
    },
    Coursesname: {
      type: String ,
      required: true,
      trim: true,
      lowerCase: true,
    },
    moment: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    Coursesid: {
      type: String ,
      trim: true,
      lowerCase: true,
      default:'all'
    },
    UseUserEmeil: {
      type: Array ,
      trim: true,
      lowerCase: true,
      default:[]
    },
    CreateUserEmeil: {
      type: String ,
      trim: true,
      lowerCase: true,
      default:'none'
    },



  },

  { timestamps: true }
);

const DiscountCodeModel = mongoose.model("DiscountCode", schema);

module.exports = DiscountCodeModel;
