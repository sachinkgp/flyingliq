const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware&keys/keys');


router.post('/signup',(req,res)=>{
    const {name,email,mobileNo,password}  = req.body
    if(!name || !email || !mobileNo || !password){
        return res.json({err:"please provide all values"})
    }else{
        const user = new User({
            name,
            email,
            mobileNo,
            password
        })
        user.save()
        .then(user=>{
            res.json({message:"user saved sucessfully"})
        })
    }
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email})
    .then(userData=>{
        if(!userData || userData.password!=password){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        if(userData.password==password){
            const token = "Bearer "+jwt.sign({_id:userData._id},JWT_SECRET)
            const {_id,name,email} = userData
            console.log(userData)
            return res.json({token,user:{_id,name,email}})
        }
        else{
            console.log("hi")
            return res.status(422).json({error:"Invalid Email or password"})
        }
    })
})

module.exports = router;