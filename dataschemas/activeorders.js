const mongoose=  require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const activeOrderSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    url:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    orderedBy:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    fulfilled:{
        type:Boolean,
        required:true
    },
    fulfilledBy:{
        type:ObjectId,
        ref:"User"
    },
})

mongoose.model("activeOrder",activeOrderSchema);