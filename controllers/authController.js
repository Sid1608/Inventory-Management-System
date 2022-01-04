const User=require("../models/User");
const bcrypt = require("bcrypt");//asynchronous function 
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")

///Register User
exports.registerUser = async (req,res)=>{
    
    try{
        //generate new password
        console.log(req.body.password);
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //create new user
        console.log(req.body.username);
        const newUser= await new User({
            _id: new mongoose.Types.ObjectId(),
            username:req.body.username,
            password:hashedPassword,
            department:req.body.department,
            name:req.body.name
        })
        //save user and respond
        const user=await newUser.save();
        res.status(200).json({status: 'ok',user:user});
    }catch(err){
        console.log(err);
        res.status(500).json({status: 'error',user:false,error:err});
    }
}


//Login User
exports.login=async (req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    console.log(username,password);
    try{
        const user =await User.findOne({username:req.body.username});
        !user && res.status(404).send({status:"oops user not found!",user:false});
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json({status:"wrong password",user:false});
        if(username==="admin"){
            res.status(200).json({status: 'admin',user:user});
        }
        else{
            res.status(200).json({status: 'user',user:user});
        }

        
        
    }catch(err){
        res.status(500).json(err)
    }

}

