const experess = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid')
const ArticlesModel = require("../../Model/ArticlesModel");
const moment = require('moment-jalaali')

require("dotenv").config();



let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/ArticleImage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadImageArticle = multer({ storage: storageImage }).single("photo");



const RouterArticle = experess.Router();


RouterArticle.post("/uploadImage", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    uploadImageArticle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        uploaded: `http://localhost:4000/ArticleImage/${req.file.filename}`,
      });
    });
  }
});



RouterArticle.post("/insertArticle", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const {
      name,
      titel,
      image,
      writer,
      dissection,
      link,
      html

   
    } = req.body;

    const dataCourse = {
      name,
      titel,
      image,
      writer,
      dissection,
      link,
      html,
      moment:moment().format('jYYYY/jMM/jDD')

    };
    let NewArticleModel = new ArticlesModel(dataCourse);

    NewArticleModel.save()
      .then((result) => {
        res.status(200).json({ message: `ثبت مقاله ی جدید (${name}) با موفقیت انجام شد `});
      })
      .catch((err) => res.status(400).send([err.errors]));
  }
});



RouterArticle.get("/getArticle", (req, res) => {

    ArticlesModel.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.status(400).json(err));
  
});


RouterArticle.put("/updataArticle/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    titel,
    image,
    writer,
    dissection,
    link,
    html
 
  } = req.body;

  const updatData = {
    name,
    titel,
    image,
    writer,
    dissection,
    link,
    html
  };
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    ArticlesModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res.status(200).json({ message:` مقاله (${name}) بروز رسانی شد` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});


RouterArticle.delete("/remove/:id/:allremove", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    ArticlesModel.findByIdAndRemove(id)
    .then((result) => res.status(200).json({message:`مقاله (${result.name}) با موفقیت حذف شد`}))
    .catch((err) => res.status(400).json(err));
  }});


module.exports = RouterArticle;
