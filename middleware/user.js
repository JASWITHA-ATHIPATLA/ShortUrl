const {getUser}=require('../service/auth.js');
async function authenticateUser(req, res, next) {
   const userId=req.cookies?.uid;

   if(!userId){
    return res.redirect('/login');
   }
   const user=await getUser(userId);
   if(!user){
    return res.redirect('/login');
   }
   req.user=user;
   next();
}
module.exports={
    authenticateUser,
}
