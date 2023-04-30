const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    sender_id: {
      type: String,
      required: true,
      lowerCase: true,
      trim: true,
    },
    sender_name: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    sender_email: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    sender_phone: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    sender_avatar: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    sender_role: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    department: {
      type: String,
      required: true,
      lowerCase: true,
      trim: true,
    },
    replay_description: {
      type: String,
      lowerCase: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    cours_name: {
      type: String,
    //   required: true,
      trim: true,
      lowerCase: true,
    },
    send_email: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
    },
    attached: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    post_type: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
 
    },
    main_id: {
      type: String,
      trim: true,
      required: true,
      lowerCase: true,
    },
    reaply_to: {
      type: String,
      trim: true,
      required: true,
      lowerCase: true,
    },
    read: {
      type: Array,
      required: true,
      trim: true,
      lowerCase: true,
    },
      moment: {
        type: String,
        trim: true,
        required: true,
        lowerCase: true,
      },
   
  },

  { timestamps: true }
);

const TiketModel = mongoose.model("tiket", schema);

module.exports = TiketModel;
