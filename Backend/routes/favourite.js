const router = require("express").Router();
const User =require("../models/user")
const {authenticationToken} = require("./userAuth")

router.put("add-book-to-favourite",authenticationToken, async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData = await User.findById(id);
        const isBookFavourite=userData.fevourites.include(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"book is already in favourites"})
        }
        await user.findbyIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"book added in favourites"})
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.put("delete-book-from-favourite",authenticationToken, async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData = await User.findById(id);
        const isBookFavourite=userData.fevourites.include(bookid);
        if(isBookFavourite){
            await user.findbyIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        
        return res.status(200).json({message:"book removed from favourites"})
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

router.get("/get-favourite-books",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status:"success",
            data:favouriteBooks
        })
    } catch (error) {
        res.status(500).json({message:`error from backend ${error}`})
    }
})

module.exports = router