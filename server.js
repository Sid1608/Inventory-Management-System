const express=require("express");
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB = require("./config/db");
const authRoutes=require("./routes/Auth.js"); 
const userRoutes=require("./routes/Users.js");
const adminRoutes=require("./routes/Admin.js");
const cookieParser = require('cookie-parser');

dotenv.config();
const app=express();
app.use(cookieParser())
//MongoDb Connection
connectDB();
//Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)



app.get("/",(req,res)=>{
    res.send("welcome to home page")
})


app.listen(8080,()=>{
    console.log("Server started on port 8080");
})