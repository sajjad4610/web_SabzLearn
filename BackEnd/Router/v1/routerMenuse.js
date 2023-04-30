const experess = require("express");
const jwt = require("jsonwebtoken");
const moment = require('moment-jalaali')

const MenuesModel = require("../../Model/MenuesModel");

const RouterMenuse = experess.Router();

RouterMenuse.post("/insertfathermenue", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const { linkfather, namefather, parent, namechild, linkchild } = req.body;

    const datafathermenue = {
      linkfather,
      namefather,
      parent,
      namechild,
      linkchild,
      moment:moment().format('jYYYY/jM/jD')

    };
    let NewMenuesModel = new MenuesModel(datafathermenue);

    NewMenuesModel.save()
      .then((result) => {
        res
          .status(200)
          .json({ message: `ثبت  منو اصلی جدید (${namefather}) با موفقیت انجام شد`});
      })
      .catch((err) => res.status(400).send([err.errors]));
  }
});

RouterMenuse.post("/insertchildmenue", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const { namechild, linkchild, parent, namefather, linkfather } = req.body;

    const datachildmenue = {
      namechild,
      linkchild,
      parent,
      namefather,
      linkfather,
      moment:moment().format('jYYYY/jM/jD')

    };

    let NewMenuesModelChild = new MenuesModel(datachildmenue);

    NewMenuesModelChild.save()
      .then((result) => {
        res
          .status(200)
          .json({ message: `ثبت  منو فرزند جدید (${namechild}) با موفقیت انجام شد` });
      })
      .catch((err) => res.status(400).send([err.errors]));
  }
});

RouterMenuse.get("/getMenuse", (req, res) => {


    MenuesModel.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.status(400).json(err));
  
});

RouterMenuse.put("/updataMenusefather/:id", (req, res) => {
  const id = req.params.id;
  const { namechild, linkchild, namefather, linkfather,parent } = req.body;

  const updatData = { namechild, linkchild, namefather, linkfather ,parent};
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    MenuesModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res.status(200).json({ message: `منو اصلی ${namefather}  بروز رسانی شد` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});
RouterMenuse.put("/updataMenusechild/:id", (req, res) => {
  const id = req.params.id;
  const { namechild, linkchild, namefather, linkfather,parent } = req.body;

  const updatData = { namechild, linkchild, namefather, linkfather ,parent};
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    MenuesModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res.status(200).json({ message:`منو فرزند ${namechild}  بروز رسانی شد` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

RouterMenuse.delete("/remove/:id/:allremove", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    MenuesModel.findByIdAndRemove(id)
      .then((result) =>
        res.status(200).json({ message:result.namechild==="__"?` منوی اصلی ${result.namefather} حذف شد`:` منوی فرزند ${result.namechild} حذف شد` })
      )
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = RouterMenuse;
