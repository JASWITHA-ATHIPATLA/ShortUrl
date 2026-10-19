 const express=require("express");
 const router=express.Router();

 router.get('/signup',(req,res)=>{
    res.render('user')
 });
 router.get('/login',(req,res)=>{
    res.render('userLogin');
 });

 module.exports=router;