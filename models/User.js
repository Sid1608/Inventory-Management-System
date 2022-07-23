const mongoose=require('mongoose');
const bcrypt = require("bcrypt");//asynchronous function

const UserSchema =new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    password:{
        type: String,
        required: true,
        min:6
    },
    department:{
        type:String,
        default:"",
       
    },
    name:{
        type:String,
        default:"",
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
   
},
{
    timestamps: true
}

);
//static method to login users
UserSchema.statics.login=async function(username,password){
    const user =await this.findOne({username});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password')
    }
    throw Error("incorrect username")

}

//Mongoose Hooks: Special function which fires after a certain mongoose event happens
//for example we can make hook which fires when we save to db, delete from db.


//fire a function after new user saved to db
//post here does not refers to post req but something happening after something else is happened
//this will fire whenever we save new document to the database
// userSchema.post('save',function(doc,next){
//     console.log('new user was created and saved',doc)
//     next();
// })


//fire a function before doc saved to db
//save instance of new user locally we can get access to this instance using this keyword.
//with arrow function we can not that instance
// userSchema.pre('save',function(next){
//     console.log("user about to be created and saved",this);
//     next();
// })


module.exports=mongoose.model("User",UserSchema);
