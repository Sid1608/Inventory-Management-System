const mongoose=require('mongoose');

const UserSchema =new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId
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
    
   
},
{
    timestamps: true
}

);

module.exports=mongoose.model("User",UserSchema);