const User=require("../models/User");
const bcrypt = require("bcrypt");//asynchronous function 
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")
//handle errors
//E11000 duplicate key error collection: node-auth.users index: email_1 dup key: { email: "mario@gmail.com" } 11000
///we can not do a custom message for a error like unique. above inf will be present in error.code
const handleErrors=(err)=>{
    //message propery contain inf about all errors
    console.log(err.message,err.code)
    let errors={username:'', password:''};

    //incorrect email address
    if(err.message==='incorrect username'){
        errors.email='that username is not registered'
    }
    //incorrect password
    if(err.message === 'Incorrect Password'){
        errors.password='that password is not correct'
    }

    //duplicate erro code 
    if(err.code === 11000){
        errors.email = 'that username is already registered';
        return errors;
    }
    // console.log(errors);
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;

}


//jwt expects a time in second while cookie expects a time in milliseconds
const maxAge=3*24*60*60;

const createToken=(id)=>{
    return jwt.sign({id},'net ninja secret',{//return a token with a signature. the header automatically get applied  
        expiresIn:maxAge
    });
}


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
            email:req.body.email,
            password:hashedPassword,
            department:req.body.department,
            name:req.body.name
        })
        //save user and respond
        const user=await newUser.save();
        res.status(200).json({status: 'ok',user:user});
    }catch(err){
        console.log(err);
        const errors= handleErrors(err);
        res.status(400).json({errors});
    }
}


//Login User
exports.login=async (req,res)=>{
    const {username,password} = req.body;//destructring
    try {
        const user=await User.login(username,password);
        const token=createToken(user._id);
        //httpOnly: can't access and change in frontend js
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user});
    } catch (err) {
        const errors= handleErrors(err);
        console.log(errors,);
        res.status(400).json({errors});
    }


}

