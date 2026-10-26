const User=require("../models/user.js");
const {setUser}=require('../service/auth.js');
// const {v4:uuid}=require("uuid");

async function handleUserSignup(req,res){
    const {username,email,password}=req.body;
   const user = await User.create(
        {
            name:username,
            email:email,
            password:password,
        }
    )
    if(!user){
        res.status(400).json({message:"User not created"});
    }
    else{
        res.redirect('/url');
    }
}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email:email,password:password});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    // const sessionId=uuid();
   const token= await setUser(user);
    res.cookie("token", token);
    return res.redirect('/url');
}
module.exports={
    handleUserSignup,
    handleUserLogin,
}