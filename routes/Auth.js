const router=require("express").Router();
const User=require("../models/User");
const bcrypt = require("bcrypt");

const {registerUser,login} =require("../controllers/authController.js");

//1.Register
router.post("/register",registerUser);

//2.Login Route
router.post("/login",login);



module.exports=router;