const {getUser, }=require("../service/auth.js");

function checkForAuthentication(req,res,next){
  const token = req.cookies?.uid;
  req.user=null;
  if(!token) return next();
  const user = getUser(token);
  req.user=user;
  return next();
};
function restrictTo(roles){
  return function(req,res,next){
    if(!req.user)return res.redirect("user/login");
    if(!roles.includes(req.user.role)) return res.end("unAuthorized");

    return next();
  }
};


// async function restrictToLoginUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;
  
//     if(!userUid) return res.redirect("user/login");
//     const user = getUser(userUid);
//     // console.log(user);
  
//     if(!user) return res.redirect("user/login");
  
//     req.user = user;
//     next();
//   }
//   async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.uid;
  
//     const user = getUser(userUid);
  
//     req.user = user;
//     next();
//   }


module.exports={
  checkForAuthentication,restrictTo,
}
