const mongoose =require("mongoose")

const bookingSchema= new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})

const bookingModel=mongoose.model("booking", bookingSchema)

module.exports= bookingModel