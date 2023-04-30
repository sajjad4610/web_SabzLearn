const experess = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const moment = require('moment-jalaali')
require("dotenv").config();
const CourseModel = require("../../Model/CourseModel");

const RouterCourse = experess.Router();


//! start upload Image

let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/coursesImage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadPhoto = multer({ storage: storageImage }).single("photo");


RouterCourse.post("/uploadImage", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    uploadPhoto(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        uploaded: `http://localhost:4000/coursesImage/${req.file.filename}`,
      });
    });
  }
});

//! end upload Image



//? start upload video

let storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/coursesVideo/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadVideo = multer({ storage: storageVideo }).single("video");

RouterCourse.post("/uploadvideo", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    uploadVideo(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        uploaded: `http://localhost:4000/coursesVideo/${req.file.filename}`,
      });
    });
    
  }
});

//? end upload video





RouterCourse.post("/insertcourse", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    const {
      name,
      titel,
      image,
      periodtime,
      references,
      teacher,
      cost,
      discount,
      section,
      courselevel,
      status,
      typecost,
      dissection,
      cvteacher,
      link,
    } = req.body;

    const dataCourse = {
      name,
      titel,
      image,
      periodtime,
      references,
      teacher,
      cost,
      discount,
      section,
      courselevel,
      status,
      typecost,
      dissection,
      cvteacher,
      Coursetopics: [],
      question:[],
      Notifications: [],
      link,
      salesnumber: 0,
      moment:moment().format('jYYYY/jMM/jDD')

    };
    let NewCourseModel = new CourseModel(dataCourse);

    NewCourseModel.save()
      .then((result) => {
        res.status(200).json({ message: `ثبت دوره ی جدید (${name})  با موفقیت انجام شد` });
      })
      .catch((err) => res.status(400).send([err.errors]));
  }
  
});

RouterCourse.put("/updata/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    titel,
    image,
    periodtime,
    references,
    teacher,
    cost,
    discount,
    section,
    courselevel,
    status,
    typecost,
    dissection,
    cvteacher,
    link,
  } = req.body;

  let updatData = {
    name,
    titel,
    image,
    periodtime,
    references,
    teacher,
    cost,
    discount,
    section,
    courselevel,
    status,
    typecost,
    dissection,
    cvteacher,
    link,
  };
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findByIdAndUpdate(id, updatData)
      .then((resalt) => {
        res.status(200).json({ message: `${name} بروز رسانی شد` });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

RouterCourse.get("/getcourse", (req, res) => {
  CourseModel.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(400).json(err));
});

RouterCourse.get("/getcourse/:id", (req, res) => {
  const _id = req.params.id;

  CourseModel.find({_id})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(400).json(err));
});

RouterCourse.delete("/remove/:id/:allremove", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findByIdAndRemove(id)
      .then((result) =>
        res.status(200).json({ message: `دوره (${result.name}) با موفقیت حدف شد` , type:'courses' , idcourse:id })
      )
      .catch((err) => res.status(400).json(err));
  }
});





//? start info course

RouterCourse.put("/setinfocourse/:id", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findByIdAndUpdate(id, {
      $push: { Coursetopics: req.body },
    }).then((result) => {
      res.status(200).json({ message: "محتوا با موفقیت اضافه شد" });
    });
  }
});
RouterCourse.get("/getcourseInfo", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.find({}, { Coursetopics: 1 })
      .then((result) => {
        let filterCoursetopics = result.flatMap((e0, index) => {
          e0.Coursetopics.forEach((e1) => {
            e1.id_topic = ` ${e1.id_topic}_${e0._id} `;
          });
          return e0.Coursetopics;
        });
        res.send(filterCoursetopics);
      })
      .catch((err) => res.status(400).json(err));
  }
});
RouterCourse.put("/removecourseInfo/:id/:allremove", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const id_topic = getMultiID.slice(0, indexspaceID);
  const id_course = getMultiID.slice(indexspaceID + 1);
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.updateOne(
      { _id: id_course },
      { $pull: { Coursetopics: { id_topic } } }
    ).then((result) => {
      res.status(200).json({ message: "محتوا با موفقیت حذف شد" , type:'courses_info' , idcourse:id_course  , id_topic});
    });
  }
});

//? end info course



//* تعداد فروش

RouterCourse.put("/SalesNumber/:operation/:id", (req, res) => {
  let { salesnumberdata } = req.body;
  const id = req.params.id;
  const operation = req.params.operation;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findById(id).then((sell) => {
      CourseModel.findByIdAndUpdate(id, {
        salesnumber:operation==='add'? salesnumberdata + sell.salesnumber :operation==='minus' ?  sell.salesnumber - salesnumberdata : 0,
      }).then((result) => {
        res.status(200).json({ message: `${operation}` });
      });
    });
  
  }
  
});

//*تعداد فروش




//! start Rate course

RouterCourse.put("/setRatecourse/:id", (req, res) => {
  const id = req.params.id;
  const { email, rate, isLogin } = req.body;
  let data = {
    email,
    rate,
    isLogin,
  };
  if (isLogin) {
    CourseModel.find({ _id: id }, { rank: 1, _id: 0 }).then((findRank) => {
      let findEmail = findRank[0].rank.some((e) => e.email === email);
      const authHeader = req.get("Authorization");
      const token = authHeader.split(" ")[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodeToken) {
        if (!findEmail) {
          CourseModel.findByIdAndUpdate(id, { $push: { rank: data } }).then(
            (result) => {
              res.status(200).json({ message: "رای شما با موفقیت ثبت شد" });
            }
          );
        } else {
          res
            .status(200)
            .json({ message: "شما یکبار به این دوره رای داده اید" });
        }
      } else {
        res.status(200).json({ message: "لطفا اول وارد شوید" });
      }
    });
  } else {
    res.status(200).json({ message: "لطفا اول وارد شوید" });
  }
});

RouterCourse.get("/GetRatecourse/:id", (req, res) => {
  const id = req.params.id;

  CourseModel.find({ _id: id }, { rank: 1, _id: 0 }).then((findRank) => {
    let filterRate = findRank[0].rank.map((e) => e.rate);

    if (filterRate.length > 0) {
      let AddRate = filterRate.reduce((s1, s2) => {
        return s1 + s2;
      });

      res.status(200).json({ rate: Math.ceil(AddRate / filterRate.length) });
    } else {
      res.status(200).json({ message: "Error" });
    }
  });
});

//!  end Rate course



//? start comment course
RouterCourse.put("/setcommentcourse/:id", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findByIdAndUpdate(id, {
      $push: { comment: req.body },
    }).then((result) => {
      res.status(200).json({ message: "کامنت بعد برسی توسط ادمین در سایت سبزلرن قرار میگیرد " });
    });
  }
});
RouterCourse.put("/passcommentcourse/:id", (req, res) => {
  const{check_comment}=req.body
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const id_course = getMultiID.slice(indexspaceID + 1);
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.updateMany({_id:id_course }, {$set:{ "comment.$[el].Stutus_comment":"تایید شده"}},{arrayFilters: [{"el.id_Comment":getMultiID}]})
    .then((result) => {

      
      res.status(200).json({ message: 'کامنت  تایید شد', result  });
    });
    

  }
});
RouterCourse.get("/getcoursecoment/:id", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.find({_id:id}, { comment: 1 })
      .then((result) => {
        let filtercomment = result.flatMap((e0, index) => {
          return e0;
        });
        res.send(filtercomment);
      })
      .catch((err) => res.status(400).json(err));
  }
});
RouterCourse.get("/getallcoursecomment", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.find({}, { comment: 1 })
      .then((result) => {
        let filtercomment = result.flatMap((e0, index) => {
          return e0.comment;
        });
        res.send(filtercomment);
      })
      .catch((err) => res.status(400).json(err));
  }
});
RouterCourse.put("/removecomment/:id/:Allremove", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const id_course = getMultiID.slice(indexspaceID + 1);

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.updateOne(
      { _id: id_course },
      { $pull: { comment: { id_Comment:getMultiID } } }
    ).then((result) => {
      res.status(200).json({ message: "کامت با موفقیت حذف شد" , type:'courses_comment' , idcourse:id_course  ,  id_Comment:getMultiID});
    });
  }
});
//? end comment course




//* start question course
RouterCourse.put("/setquestioncourse/:id", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.findByIdAndUpdate(id, {
      $push: { question: req.body },
    }).then((result) => {
      res.status(200).json({ message: "کامنت بعد برسی توسط ادمین در سایت سبزلرن قرار میگیرد " });
    });
  }
});
RouterCourse.put("/passquestioncourse/:id", (req, res) => {
  const{check_question}=req.body
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const id_course = getMultiID.slice(indexspaceID + 1);
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.updateMany({_id:id_course }, {$set:{ "question.$[el].Stutus_question":"تایید شده"}},{arrayFilters: [{"el.id_question":getMultiID}]})
    .then((result) => {

      
      res.status(200).json({ message: 'کامنت  تایید شد', result  });
    });

  }
});
RouterCourse.get("/getcoursecoment/:id", (req, res) => {
  const id = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.find({_id:id}, { question: 1 })
      .then((result) => {
        let filterquestion = result.flatMap((e0, index) => {
          return e0;
        });
        res.send(filterquestion);
      })
      .catch((err) => res.status(400).json(err));
  }
});
RouterCourse.get("/getallcoursequestion", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.find({}, { question: 1 })
      .then((result) => {
        let filterquestion = result.flatMap((e0, index) => {
          return e0.question;
        });
        res.send(filterquestion);
      })
      .catch((err) => res.status(400).json(err));
  }
});
RouterCourse.put("/removequestion/:id/:Allremove", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const id_course = getMultiID.slice(indexspaceID + 1);

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    CourseModel.updateOne(
      { _id: id_course },
      { $pull: { question: { id_question:getMultiID } } }
    ).then((result) => {
      res.status(200).json({ message: "کامت با موفقیت حذف شد" , type:'courses_question' , idcourse:id_course  ,  id_question:getMultiID});
    });
  }
});



//* end question course

module.exports = RouterCourse;
