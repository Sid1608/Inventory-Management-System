const express=require("express");
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const cors=require("cors");
const authRoutes=require("./routes/Auth.js"); 
const userRoutes=require("./routes/Users.js");
const adminRoutes=require("./routes/Admin.js");

dotenv.config();
const app=express();

//MongoDb Connection
mongoose.connect(process.env.MONGO_URL,(err)=>{
    if(err) {throw err;}
    console.log('conneted to mongodb')
})

//Middlewares
app.use(cors());
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