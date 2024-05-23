const router = require("express").Router();
const Book =require("../models/book")
const Order = require("../models/order");
const user = require("../models/user");
const User = require("../models/user") 
const {authenticationToken} = require("./userAuth")

router.post("/place-order",authenticationToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body
        for(const orderData of order){
            const newOrder = new Order({user:id,book:orderData._id})
            const orderDatafromDB=await newOrder.save();
            await User.findByIdAndUpdate(id,{
                $push:{
                    rders:orderDatafromDB._id
                }
            })
            await User.findByIdAndUpdate(id,{
                $pull:{
                    cart:orderData._id
                }
            })

        }
        return res.json({
            status:"success",
            message:"order placed successfully"
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.get("/get-order-history",authenticationToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        })
        const orderData=userData.orders.reverse()
        return res.json({
            status:"success",
            data:orderData
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.get("/get-all-order",authenticationToken,async (req,res)=>{
    try {
        const userData = await User.find().populate({
            path:"orders",
        }).populate({
            path:"user"
        }).sort({createdAt:-1})
        
        return res.json({
            status:"success",
            data:orderData
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.put("/update-status/:id",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({
            status:"success",
            message:"status updated successfully"
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})
module.exports=router