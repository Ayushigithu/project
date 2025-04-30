const express =require('express');
const router=express.Router();
const {handelGenerateNewShortURl,handleGetAnalysis}=require('../controllers/url')

router.route("/").get((req,res)=>{
    res.render("home.ejs")
}).post(handelGenerateNewShortURl);
router.route("/analytics/:shortId").get(handleGetAnalysis);

module.exports= router;