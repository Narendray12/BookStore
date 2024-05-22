const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()
require("./connection/connection");
const user =require("./routes/user")
const Books = require("./routes/book")
app.use("/api/v1",user)
app.use("/api/v1",Books)
app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})