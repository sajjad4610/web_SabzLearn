const experess = require("express");
const jwt = require("jsonwebtoken");
const ValidYup = require("yup");
const moment = require("moment-jalaali");
const HashBcry = require("bcryptjs");
const multer = require("multer");

const USermodel = require("../../Model/USermodel");

const RouterUser = experess.Router();

//? Start Upload Avatar

let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/AvatarImage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadPhoto = multer({ storage: storageImage }).single("avatar");

RouterUser.post("/uploadAvatar/:id", (req, res) => {
  let _id = req.params.id;
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

      USermodel.findByIdAndUpdate(
        { _id },
        { avatar: `http://localhost:4000/AvatarImage/${req.file.filename}` }
      ).then((e) => {});
      return res.status(200).json({
        uploaded: `http://localhost:4000/AvatarImage/${req.file.filename}`,
      });
    });
  }
});

//? End Upload Avatar

const yupSchema = ValidYup.object().shape({
  username: ValidYup.string()
    .required("پر کردن این فیلد اجباری است")
    .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
    .max(12, "نام کاربری باید حداکثر 12 کاراکتر باشد"),
  email: ValidYup.string()
    .required("پر کردن این فیلد اجباری است")
    .email("فرمت ایمیل صحیح نیست"),
  phone: ValidYup.string()
    .required("پر کردن این فیلد اجباری است")
    .min(11, " شماره موبایل باید حداقل 11 کاراکتر باشد")
    .max(11, "شماره موبایل باید حداکثر 11 کاراکتر باشد"),
  role: ValidYup.string(),
  name: ValidYup.string(),
  family: ValidYup.string(),
  github: ValidYup.string(),
  // courses: ValidYup.array(),
  // card: ValidYup.array(),
});

RouterUser.get("/getAll", async (req, res) => {
  USermodel.find({})
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ err: `خطا از سمت سرور` }));
});
RouterUser.get("/getuser/:id", async (req, res) => {
  let getId = req.params.id;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.findById(getId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ err: `خطا از سمت سرور` }));
  }
});
RouterUser.put("/update/:id", (req, res) => {
  yupSchema
    .validate(req.body)

    .then(async (result) => {
      let getId = req.params.id;
      let { username, email, phone, role, password } = req.body;

      const authHeader = req.get("Authorization");
      const token = authHeader.split(" ")[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      if (decodeToken) {
        if (decodeToken.user.role === "admin") {
          USermodel.findByIdAndUpdate(getId, {
            username,
            email,
            phone,
            role,
            password,
          })
            .then((resu) => {
              res.send([
                {
                  message: ` تغییرات  ${username} با موفقیت انجام شد`,
                  err: false,
                },
              ]);
            })
            .catch((err) => {
              res.send([
                {
                  message: "این ایمیل قبلا ثبت شده",
                  type: "unique",
                  path: "email",
                },
              ]);
            });
        } else {
          res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
        }
      } else {
        res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
      }
    })
    .catch((error) => {
      res.status(422).json([
        {
          path: error.params.path,
          validVlue: error.params.value,
          message: error.message,
        },
      ]);
    });
});
RouterUser.put("/updateInfoUser/:id", (req, res) => {
  yupSchema
    .validate(req.body)

    .then(async (result) => {
      let getId = req.params.id;

      let { username, email, phone, name, family, github } = req.body;

      const authHeader = req.get("Authorization");
      const token = authHeader.split(" ")[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      if (decodeToken) {
        USermodel.findByIdAndUpdate(getId, {
          username,
          email,
          phone,
          name,
          family,
          github,
        })
          .then((resu) => {
            res.send([
              {
                message: ` تغییرات  ${username} با موفقیت انجام شد`,
                err: false,
              },
            ]);
          })
          .catch((err) => {
            res.send([
              {
                message: "این ایمیل قبلا ثبت شده",
                type: "unique",
                path: "email",
              },
            ]);
          });
      } else {
        res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
      }
    })
    .catch((error) => {
      res.status(422).json([
        {
          path: error.params.path,
          validVlue: error.params.value,
          message: error.message,
        },
      ]);
    });
});
RouterUser.put("/updatePassUser/:id", (req, res) => {
  let HashPass;
  let getId = req.params.id;
  let { password, nowPass } = req.body;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    USermodel.find({ _id: getId }).then(async (resu) => {
      if (resu.length > 0) {
        let getPassOfDb = resu.map((e) => {
          return e.password;
        });
        let CheckPassHash = await HashBcry.compare(nowPass, getPassOfDb[0]);
        if (CheckPassHash) {
          password.length < 8
            ? (HashPass = "")
            : (HashPass = await HashBcry.hash(password, 10));
          await USermodel.findByIdAndUpdate(getId, {
            password: HashPass,
          })
            .then((resu) => {
              res.send([
                {
                  message: ` تغییرات  رمز با موفقیت انجام شد`,
                  err: false,
                },
              ]);
            })
            .catch((err) => {});
        } else {
          res.send([
            {
              message: `رمز  فعلی اشتباه است`,
              err: true,
            },
          ]);
        }
      }
    });
  }

  //   res.status(422).json([
  //     {
  //       path: error.params.path,
  //       validVlue: error.params.value,
  //       message: error.message,
  //     },
  //   ]);
});
RouterUser.delete("/remove/:id/:allremove", (req, res) => {
  let getId = req.params.id;
  const authHeader = req.get("Authorization");
  try {
    const token = authHeader.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodeToken) {
      if (decodeToken.user.role === "admin") {
        USermodel.findByIdAndDelete(getId)
          .then((result) => {
            return res.status(200).json({
              message: `کاربر ${result.username} حذف شد`,
              type: "user",
              idUser: getId,
            });
          })
          .catch((err) => res.status(500).json({ err: `خطا از سمت سرور` }));
      } else {
        res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
      }
    } else {
      res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
    }
  } catch {}
});

//! start Add course to user

RouterUser.put("/addcousesUser", (req, res) => {
  let {
    courseId,
    courseName,
    courseCost,
    courseDiscount,
    courseStatus,
    dataTime,
    selectUserEmail,
    DiscountCodePercent = 0,
    courseImg = "",
    courseLink,
    userId,
    userName,
    idAddCourse,
  } = req.body;

  let data = {
    dataTime,
    courseName,
    courseCost,
    courseDiscount,
    courseStatus,
    courseId,
    DiscountCodePercent,
    courseLink,
    courseImg,
    selectUserEmail,
    userId,
    userName,
    idAddCourse,
    moment: moment().format("jYYYY/jMM/jDD"),
  };

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateOne(
      { email: selectUserEmail },
      { $push: { courses: data } }
    ).then((result) => {
      res.status(200).json({ message: ` دوره به ${userName} اضافه شد` });
    });
  } else {
  }
});

RouterUser.get("/allgetUserCoure", (req, res) => {
  USermodel.find({}, { courses: 1, _id: 1 }).then((result) => {
    let filtercourses = result.flatMap((e0, index) => {
      e0.courses.forEach((e1) => {
        e1.courseName === e1.courseName;
      });
      return e0.courses;
    });
    res.send(filtercourses);
  });
});
RouterUser.get("/onegetUserCoure/:id", (req, res) => {
  let _id = req.params.id;
  USermodel.find({ _id }, { courses: 1, _id: 1 }).then((result) => {
    let filtercourses = result.flatMap((e0, index) => {
      e0.courses.forEach((e1) => {
        e1.courseName === e1.courseName;
      });
      return e0.courses;
    });
    res.send(filtercourses);
  });
});
RouterUser.put("/removeSimilarcousesUser/:id/:allremove", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const idUser = getMultiID.slice(0, indexspaceID);
  const courseId = getMultiID.slice(indexspaceID + 1);

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateOne(
      { _id: idUser },
      { $pull: { courses: { courseId } } }
    ).then((result) => {
      res.status(200).json({
        message: ` دوره  مورد نظر حذف شد`,
        type: "remove_course_user",
        idcourse: courseId,
        idUser,
        getMultiID,
      });
    });
  }
});

//! end Add course to user

//*  start Add course to card

RouterUser.put("/addcousesCard", (req, res) => {
  let {
    dataTime,
    userEmail,
    courseId,
    courseName,
    courseCost,
    courseDiscount,
    courseStatus,
    courseImg,
    courseLink,
    idcard,
  } = req.body;

  let data = {
    dataTime,
    courseName,
    courseCost,
    courseDiscount,
    courseStatus,
    courseId,
    courseImg,
    idcard,
    courseLink,
    moment: moment().format("jYYYY/jMM/jDD"),
  };

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateOne({ email: userEmail }, { $push: { card: data } }).then(
      (result) => {
        res.status(200).json({ message: ` ${courseName} به سبد خریداضافه شد` });
      }
    );
  } else {
  }
});
RouterUser.put("/removecousesCard/:iduser/:idcard", (req, res) => {
  let iduser = req.params.iduser;
  let idcard = req.params.idcard;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateOne({ _id: iduser }, { $pull: { card: { idcard } } }).then(
      (result) => {
        res.status(200).json({ message: `` });
      }
    );
  } else {
  }
});
RouterUser.put("/removeSimilarCard/:courseId", (req, res) => {
  let courseId = req.params.courseId;
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateMany({}, { $pull: { card: { courseId } } }).then(
      (result) => {
        res.status(200).json({ message: "removeSimilarCard" });
      }
    );
  } else {
  }
});

//*  end Add course to card

//? start  notification  ///////////////////////////////////////////////////

RouterUser.put("/insertnotification", (req, res) => {
  let { selectUser, message, sender, dataTime, idMessage } = req.body;

  let data = {
    idMessage,
    message,
    sender,
    dataTime,
    selectUser,
    moment: moment().format("jYYYY/jMM/jDD"),
  };

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    if (selectUser === "All User") {
      USermodel.updateMany(
        { role: "user" },
        { $push: { notification: data } }
      ).then((result) => {
        res
          .status(200)
          .json({ message: `پیغام به ${selectUser} ارسال شد`, result });
      });
    } else if (selectUser === "All Admin") {
      USermodel.updateMany(
        { role: "admin" },
        { $push: { notification: data } }
      ).then((result) => {
        res
          .status(200)
          .json({ message: `پیغام به ${selectUser} ارسال شد`, result });
      });
    } else if (selectUser === "All") {
      USermodel.updateMany({}, { $push: { notification: data } }).then(
        (result) => {
          res
            .status(200)
            .json({ message: `پیغام به ${selectUser} ارسال شد`, result });
        }
      );
    } else {
      USermodel.updateOne(
        { email: selectUser },
        { $push: { notification: data } }
      ).then((result) => {
        res
          .status(200)
          .json({ message: `پیغام به ${selectUser} ارسال شد`, result });
      });
    }
  } else {
  }
});

RouterUser.put("/EditeNotification/:id", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const idMessage = getMultiID.slice(0, indexspaceID);
  const idUser = getMultiID.slice(indexspaceID + 1);


  let { selectUser, message } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {

    USermodel.updateOne({ email: selectUser },{$set:{ "notification.$[el].message": message}},{ arrayFilters: [{ "el.idMessage": idMessage }]})
    .then((result) => {
     res.status(200).json({ message: ` پیغام  ${selectUser} آپدیت شد` });
    });
  } else {
  }
});

RouterUser.get("/getnotification", (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    USermodel.findById(decodeToken.user.userid).then((result) => {
      res.send(result.notification);
    });
  } else {
  }
});
RouterUser.get("/allgetnotification", (req, res) => {
  const authHeader = req.get("Authorization");

  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.find({}, { notification: 1, _id: 1 }).then((result) => {
      let filterNotification = result.flatMap((e0, index) => {
        e0.notification.forEach((e1) => {
          e1.idMessage = ` ${e1.idMessage}_${e0._id} `;
        });
        return e0.notification;
      });

      res.send(filterNotification);
    });
  } else {
  }
});
RouterUser.put("/removenotificationbell", (req, res) => {
  let { idMessage, email } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    USermodel.updateOne(
      { email },
      { $pull: { notification: { idMessage } } }
    ).then((result) => {
      res.status(200).json(result);
    });
  }
});
RouterUser.put("/removenotificationtabel/:id/:allremove", (req, res) => {
  const getMultiID = req.params.id;
  const indexspaceID = getMultiID.search("_");
  const idMessage = getMultiID.slice(0, indexspaceID);
  const idUser = getMultiID.slice(indexspaceID + 1);

  const removeSimilar = req.params.allremove;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    if (removeSimilar === "false") {
      USermodel.updateOne(
        { _id: idUser },
        { $pull: { notification: { idMessage } } }
      ).then((result) => {
        res.status(200).json({ message: ` پیغام های مورد نظر حذف شد` });
      });
    }
    if (removeSimilar === "true") {
      USermodel.updateMany({}, { $pull: { notification: { idMessage } } }).then(
        (result) => {
          res.status(200).json({ message: `تمام پیغام های مشابه حذف شد` });
        }
      );
    }
  }
});

//?  end  notification  ///////////////////////////////////////////////////

//!start  chat  ///////////////////////////////////////////////////

RouterUser.put("/insertchat/:id", (req, res) => {
  let _id = req.params.id;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodeToken) {
    if (decodeToken.user.role === "admin") {
      USermodel.updateOne({ _id }, { $push: { chat: req.body } }).then(
        (result) => {
          res.status(200).json({ message: `پیغام ارسال شد`, result });
        }
      );
    }
  } else {
  }
});

RouterUser.put("/removecommentchat", (req, res) => {
  const { id_Box, id_user } = req.body;

  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodeToken) {
    USermodel.updateOne(
      { _id: id_user },
      { $pull: { chat: { id_Comment: id_Box } } }
    ).then((result) => {
      res.status(200).json({
        message: "کامت با موفقیت حذف شد",
        type: "courses_commentchat",
        iduser: id_user,
        id_Comment: id_Box,
      });
    });
  }
});

//! end  chat  ///////////////////////////////////////////////////

module.exports = RouterUser;
