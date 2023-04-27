const express = require('express')
const mongoose=require('mongoose');
const Order = mongoose.model("activeOrder");
const router = express.Router();
const requireLogin = require('../middleware&keys/requireLogin');

router.post('/placeorder',requireLogin,(req,res)=>{
    const {brand,url,quantity,price,fulfilled} = req.body;
    const orderedBy = req.user._id;
    const order = new Order({
        brand,quantity,price,orderedBy,fulfilled,url
    })
    order.save()
    .then(savedordered=>{
        return res.json({message:"order placed successfully"});
    })
})
router.get('/myorders',requireLogin,(req,res)=>{
    Order.find({orderedBy:req.user._id,fulfilled:false})
    .populate()
    .then(order=>{
        res.json(order)
    })
})
router.get('/allorders',requireLogin,(req,res)=>{
    Order.find({fulfilled:false})
    .then(allorders=>{
        // console.log(allorders)
        return res.json(allorders)
    })
})
router.post('/fforder',requireLogin,(req,res)=>{
    const {_id} = req.user;
    const {orderid} = req.headers;
    Order.findOne({_id:orderid})
    .then(orderdata=>{
        orderdata.fulfilled=true;
        orderdata.fulfilledBy=_id;
        orderdata.save()
    })
    .then(res.json({message:"order fulfilled"}))
})
router.get('/myfforder',requireLogin,(req,res)=>{
    Order.find({fulfilledBy:req.user._id})
    .populate()
    .then(myffordres=>{
        res.json(myffordres)
    })
})
router.post('/deleteorder',requireLogin,(req,res)=>{
    const {orderid} = req.headers;
    console.log("called me?",orderid)
    Order.deleteOne({_id:orderid})
    .then(resu=>{
        return res.send(resu)
    })
})

module.exports = router;