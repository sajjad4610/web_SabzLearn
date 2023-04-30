const experess = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const moment = require('moment-jalaali')


const TiketModel = require("../../Model/TiketModel");

const RouterTiket = experess.Router();

//! start upload Image

let storageAttached = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/TiketAttached/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadAttached = multer({ storage: storageAttached }).single("attached");

RouterTiket.post("/uploadAttached", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    uploadAttached(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        uploaded: `http://localhost:4000/TiketAttached/${req.file.filename}`,
      });
    });
  }
});

//! end upload Image

RouterTiket.post("/inserttiket", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const {
      sender_id,
      sender_name,
      sender_email,
      sender_phone,
      sender_avatar,
      sender_role,
      department,
      type,
      level,
      cours_name,
      send_email,
      title,
      description,
      attached,
      post_type,
      main_id,
      reaply_to,
      read,
      replay_description
    } = req.body;


    const dataCourse = {
        sender_id,
        sender_name,
        sender_email,
        sender_phone,
        sender_avatar,
        sender_role,
        department,
        type,
        level,
        cours_name,
        send_email,
        title,
        description,
        attached,
        post_type,
        main_id,
        reaply_to,
        read,
        replay_description,
        moment:moment().format('jYYYY/jMM/jDD'),
    };
    let NewTiketModel = new TiketModel(dataCourse);

    NewTiketModel.save()
      .then((result) => {
        res
          .status(200)
          .json({ message: `ثبت  تیکت جدید (${sender_name})  با موفقیت انجام شد` });
      })
      .catch((err) => res.status(400).send([err.errors]));
  }
});

RouterTiket.put("/updataTiket/:id", (req, res) => {
  const id = req.params.id;
  const {
    sender_id,
    sender_name,
    sender_email,
    sender_phone,
    sender_avatar,
    sender_role,
    department,
    type,
    level,
    cours_name,
    send_email,
    title,
    description,
    attached,
    post_type,
    main_id,
    reaply_to,
    read,
    moment,
    replay_description,
   
  } = req.body;


  let updatData = {
    sender_id,
    sender_name,
    sender_email,
    sender_phone,
    sender_avatar,
    sender_role,
    department,
    type,
    level,
    cours_name,
    send_email,
    title,
    description,
    attached,
    post_type,
    main_id,
    reaply_to,
    read,
    moment,
    replay_description,
  };
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    TiketModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res.status(200).json({ message: `${sender_name} بروز رسانی شد` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

RouterTiket.get("/getAllTikets", (req, res) => {
  TiketModel.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(400).json(err));
});

RouterTiket.get("/getTiket/:id", (req, res) => {
  const _id = req.params.id;

  TiketModel.find({ _id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(400).json(err));
});

RouterTiket.delete("/remove/:id/:allremove", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    TiketModel.findByIdAndRemove(id)
      .then((result) =>
        res
          .status(200)
          .json({
            message: `تیکت با موفقیت حذف شد`,
            type: "tiket",
            idTiket: id,
          })
      )
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = RouterTiket;
