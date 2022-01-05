const mongoose=require('mongoose');

const IssuedItemSchema =new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    item_name:{
        type: String,
    },
    username:{
        type: String,
    } 
},
{
    timestamps: true
}

);

module.exports=mongoose.model("IssuedItem",IssuedItemSchema);