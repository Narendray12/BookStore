const router = require("express").Router();
const User =require("../models/user")
// const bcrypt = require("bcrypt")
router.post("/sign-up",async(req,res)=>{
    try {
        const {username,email,password,address}=req.body;
        if(username.length<4){
            return res.status(400).json({message:"username length should be greater than 3"})
        }
        const existingusername=await User.findOne({username:username});
        if(existingusername){
            return res.status(400).json({message:"username already exist"})
        }
        const existingemail=await User.findOne({email:email});
        if(existingemail){
            return res.status(400).json({message:"email already exist"})
        }

        if (password.length<=5) {
            return res.status(400).json({message:"password should be greater than 5"})
        }
        // const hasspass= await bcrypt.hash(password,10);
        const newUser = new User({
            username:username,
            email:email,
            password:password,
            address:address
        });
        await newUser.save();
        return res.status(200).json({message:"Sign up successful"})
    } catch (error) {
        console.log(500).json({message:"error from backend"})
    }
})

router.post("/sign-up",async(req,res)=>{
    try {
        const [username,password]=req.body;
        
    } catch (error) {
        console.log(500).json({message:"error from backend"})
    }
})

module.exports=router