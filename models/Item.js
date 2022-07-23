const mongoose=require('mongoose');

const ItemSchema =new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    item_name:{
        type: String,
        required: true,
    },
    expected_cost:{
        type:Number,
        default:0,
       
    },
    item_description:{
        type:String,
        default:"",
       
    },
    item_count:{
        type:Number,
        default:1,
    },
    issued_count:{
        type:Number,
        default:0,
        
    },
    date_purchased:{
        type:Date,
        require: true,
    }
   
},
{
    timestamps: true
}

);

module.exports=mongoose.model("Item",ItemSchema);
