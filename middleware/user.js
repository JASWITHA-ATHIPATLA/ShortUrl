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
module.exports={
    authenticateUser,
}
