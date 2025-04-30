const express=require("express");
const router=express.Router();
const URL = require("../models/url.js");
const { restrictTo } = require("../middleware/auth.js");
// const {checkAuth }=require('../middleware/auth.js')

router.get("/admin/urls",restrictTo(['ADMIN']),async(req,res)=>{
  // if (!req.user) return res.redirect("user/login");
  const allurls = await URL.find({ });
  return res.render("static", {
    urls: allurls,
  });
});


router.get("/",restrictTo(['NORMAL','ADMIN']),async(req,res)=>{
    // if (!req.user) return res.redirect("user/login");
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("static", {
      urls: allurls,
    });
});

module.exports=router;