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

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//  });

app.use(express.json());
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)



app.get("/",(req,res)=>{
    res.send("welcome to home page")
})


app.listen(process.env.PORT || 8080,()=>{
    console.log("Server started on port 8080");
})