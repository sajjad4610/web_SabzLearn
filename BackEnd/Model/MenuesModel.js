const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    namefather: {
      type: String,
      trim: true,
      lowerCase: true,
    },

    namechild: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    linkfather: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    linkchild: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    parent: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    moment: {
      type: String,
      trim: true,
      lowerCase: true,
    },
  },

  { timestamps: true }
);

const ArticlesModel = mongoose.model("Menuse", schema);

module.exports = ArticlesModel;
