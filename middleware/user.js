const {getUser}=require('../service/auth.js');
async function authenticateUser(req, res, next) {
   const tokenCookie=req.cookies?.token;
//    console.log(userheader);
//    const token=userheader && userheader.split("Bearer ")[1];
//    console.log(token);
   if(!tokenCookie){
    return res.status(401).json({message:"Unauthorized"});
   }
   const user=await getUser(tokenCookie);
   if(!user){
    return res.status(401).json({message:"Unauthorized"});
   }
   req.user=user;
   next();
}
function restrictTo(roles=[]){
   return function (req,res,next){
          if(!req.user) return res.redirect('/login');
          const userRole = req.user.role?.toLowerCase();
          const allowedRoles = roles.map((role) => role.toLowerCase());
          if(!allowedRoles.includes(userRole)) {
             return res.status(403).send("Unauthorized");
          }
          return next();
   };
}
module.exports={
    authenticateUser,
    restrictTo,
}
