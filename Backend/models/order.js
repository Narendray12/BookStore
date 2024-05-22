const mongoose=require("mongoose")

const order = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out for delivery", "DElivered","canceled"]
    },
},{timestamps:true})

module.exports=mongoose.model("order",order)