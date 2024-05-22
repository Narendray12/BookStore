const router = require("express").Router();
const User =require("../models/user")
const jwt = require("jsonwebtoken")
const Book = require("../models/book")
const {authenticationToken} = require("./userAuth")

router.post("/add-book",authenticationToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:`Not admin ${error}`})
        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        await book.save();
        res.status(200).json({message:"book added successfully"})
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

module.exports= router;