const express = require("express");
const jwt = require("jsonwebtoken");
const moment = require('moment-jalaali')

const Routergetme = express.Router();
Routergetme.get('/me',async(req,res ,next)=>{
    const authHeader=req.get('Authorization')
    if(authHeader){
        try{
            const token =authHeader.split(" ")[1]
            const decodeToken =jwt.verify(token,process.env.JWT_SECRET)
            if(decodeToken){
                res.status(200).json({decodeToken})
            }else{
                
                res.status(422).json({ err: "شما مجوز درسترسی  ندارید" });
            }

        }catch{

        }

    }else{
        res.status(422).json({ err: "لطفا اول لاگین کنید" });

    }
   


})




module.exports= Routergetme ;