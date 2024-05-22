const router = require("express").Router();
const User =require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {authenticationToken} = require("./userAuth")
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
        const hasspass= await bcrypt.hash(password,10);
        const newUser = new User({
            username:username,
            email:email,
            password:hasspass,
            address:address
        });
        await newUser.save();
        return res.status(200).json({message:"Sign up successful"})
    } catch (error) {
        console.log(500).json({message:"error from backend"})
    }
})

router.post("/sign-in", async (req,res)=>{
    try {
        const {username,password}=req.body;
        const existinguser = await User.findOne({username});
        if(!existinguser){
            res.status(400).json({message:"invalid credentials"})
        }
        await bcrypt.compare(password,existinguser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    {
                        name:existinguser.username
                    },
                    {
                        role:existinguser.role
                    }
                ]
                const token = jwt.sign({authClaims},"bookstore123",{expiresIn:"30d"});
                res.status(200).json(
                    {
                        id:existinguser._id,role:existinguser.role,
                        token:token
                }
            );
            }
            else{
                res.status(400).json({message:"Invalid credentials"})
            }
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.get("/get-user-information",authenticationToken, async(req,res)=>{
    try {
        const {id}= req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.put("/update-address",authenticationToken,async (req,res)=>{
    try {
        const {id}= req.headers;
        const {adress}=req.body;
        await User.findByIdAndUpdate(id,{address:adress});
        return res.status(200).json({message:"address updated"})
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

module.exports=router