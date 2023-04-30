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

    link: {
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
    image: {
      type: String ,
      required: true,
      trim: true,
      lowerCase: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    periodtime: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    courselevel: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    references: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    Coursetopics: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    
    Notifications: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    question: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    moment: {
      type: String,
      trim: true,
      lowerCase: true,
    },

    comment: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    rank: {
      type: Array,
      trim: true,
      lowerCase: true,
    },
    teacher: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    cvteacher: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    typecost: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    cost: {
      type:Number,
      required: true,
      trim: true,
    },

    discount: {
      type: Number,
      required: true,
      trim: true,
    },
    salesnumber: {
      type: Number,
      trim: true,
      default:0
    },



  },

  { timestamps: true }
);

const CourseModel = mongoose.model("course", schema);

module.exports = CourseModel;
