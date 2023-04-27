const express = require('express');
const { JWT_SECRET } = require('./keys');
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(200).json({err:"please log in first1"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(200).json({err:"please log in first"})
        }
        const {_id} = payload;
        User.findById(_id)
        .then(userdata=>{
            req.user=userdata,
            next()
        })
    })
}