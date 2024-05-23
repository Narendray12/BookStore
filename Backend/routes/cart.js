const router = require("express").Router();
const User =require("../models/user")
const {authenticationToken} = require("./userAuth")

router.put("/add-to-cart",authenticationToken, async (req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData = await User.findById(id);
        const isbookincart =userData.cart.includes(bookid);
        if(isbookincart){
            return res.json({
                status:"success",
                message:"book is already in cart"
            })
        }
            await User.findByIdAndUpdate(id,{
                $push:{
                    cart:bookid
                }
            })
            return res.json({
                status:"success",
                message:"book added in cart"
            })
        
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.put("/remove-from-cart/:bookid",authenticationToken,async (req,res)=>{
    try {
        const {bookid}=req.params;
        const {id}=req.headers;
        await user.findByIdAndUpdate(id,{
            $pull:{
                cart:bookid
            }
        })
        return res.json({
            status:"success",
            message:"book removed from cart"
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.put("/get-user-cart",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status:"success",
            data:cart
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

module.exports = router;