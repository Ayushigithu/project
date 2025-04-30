const express= require("express");
const router =express.Router();
const {handelUserSignUp,handelUserLogin,}=require('../controllers/user')

router.route('/signup').get((req,res)=>{
    res.render("users/signup.ejs")
}).post(handelUserSignUp);

router.route('/login').get((req,res)=>{
    res.render("users/login.ejs")
}).post(handelUserLogin);

module.exports=router;