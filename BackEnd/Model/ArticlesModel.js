const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },

    titel: {
      type: String,
      required: true,
      lowerCase: true,
    },
    dissection: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    html: {
      type: String,
      trim: true,
      lowerCase: true,
      default:''
    },
    moment: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    image: {
      type: String ,
      required: true,
      trim: true,
      lowerCase: true,
    },



    rank: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    writer: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },



  },

  { timestamps: true }
);

const ArticlesModel = mongoose.model("Articles", schema);

module.exports = ArticlesModel;
