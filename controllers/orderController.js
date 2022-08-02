

const Order= require("../models/Order")
const mongoose = require("mongoose")
const sendMail=require("../utils/helpers/index")

// getting all order: for admin
exports.allOrders=function(req,res){
		Order.find(function (err, orders) {
			if (!err) {
				res.status(200).json({orders:orders});
			}
			else {
				res.send(err);
			}
		})
}


//getting specific user order History: for user
exports.orderHistoryUser= function(req,res){
    Order.find({user_id:req.params.userId},(err,orders)=>{
        if(!err){
            res.status(200).json({orders:orders});
        }else{
            res.send(err);
        }
    })
}



// for Searching order by orderid and for Order Details
exports.searchOrder = function(req,res){
 Order.findOne({_id :req.params.orderId}).
  populate('user_id').
  exec(function (err, foundOrder) {
    if(!err){
        res.send({order:foundOrder});
    }
    else{
        res.send(err)
    }
  });
}
//Search the orders by Date
exports.searchByOrderDate = function (req, res) {

    let date = new Date(req.params.orderDate);
    let date_converted = date.toDateString();

    Order.find(function (err, orders) {
        if (!err) {

            let result = [];
            let i;
            for (i = 0; i < orders.length; i++) {

                const date_to_be = new Date(orders[i].order_date);
                let temp = date_to_be.toDateString();

                if (temp === date_converted)
                    result.push(orders[i]);
            }

            console.log(result);
            res.send(result);
        }
        else {
            res.send(err);
        }
    })

}
//Getting Recent Orders: to be display in user dashboard
exports.recentOrder =async (req,res)=>{
    try{
        const user_id=req.params.userId
        const result= await Order.find().sort({'order_date':-1}).limit(1);
        if(result){
            res.status(200).json({order:result[0]});
        }else{
            res.status(200).json({err:"you have not ordered anything"});
        }
    }catch(err){
        res.status(404).json({error:err})
    }
   
}



//User order items :only user
exports.orderItem =async (req,res)=>{
    try{
        const newOrder = await new Order({
            _id:new mongoose.Types.ObjectId(),
            user_id:req.body.user_id,
            item_count:req.body.item_count,
            remark:req.body.remark,
            order_date:Date.now(),
            total_cost:req.body.total_cost,
            issued_items:req.body.issued_items,
        });
        const order=await newOrder.save();
        console.log(order);
        res.status(201).json({status: 'Succesfully added a new Order',Order:order});
    }catch(err){
        console.log(err);
        res.status(500).json({status: 'Order Not Added Successfully',order:false,error:err});
    }


}


//Reject Order  Request
exports.rejectOrder =async (req,res)=>{
    try{
        const order_id=req.params.orderId;
        const order_details=await Order.findOne({_id:order_id}).populate("user_id")
        console.log(order_details)
        console.log(order_details?.user_id)
        Order.deleteOne({_id:order_id},(err)=>{
            if(err){
                res.status(500).json(err);
            }else{
                const payload={
                    from:process.env.MAIL_USERNAME,
                    to:order_details.user_id?.email,
                    subject:"Order Rejection Mail",
                    text:"sorry " + order_details.user_id?.name + " you order has  not been issued"
                }
                console.log(payload)
                console.log("sending email notification");
                sendMail(payload,function(err,data){
                    if(err){
                        console.log('error sending mail',err);
                        res.status(400).json("mail not sent");
                    }else{
                        res.status(200).json("order rejected successfully")
                    }
                });
                
            }

        });
    }catch(error){
        console.log(error)
    }
      
}




// Accept Order Request
exports.acceptOrder =async(req,res)=>{
    const order_id=req.params.orderId;
    console.log(order_id);
    const order_details=await Order.findOne({_id:order_id}).populate("user_id")
    Order.find({_id:order_id},(err,order)=>{
        if(!err){
               if(order){
                    Order.updateOne({_id:order_id},{$set:{isVerified:true}},(err)=>{
                        if(err){
                            res.status(500).json(err);
                        }else{
                            
                            const payload={
                                from:process.env.MAIL_USERNAME,
                                to:order_details.user_id?.email,
                                subject:"Order Acception Mail",
                                text:"Hi " + order_details.user_id?.name + " your order has  not been accepted"
                            }
                            console.log(payload)
                            console.log("sending email notification");
                            sendMail(payload,function(err,data){
                                if(err){
                                    console.log('error sending mail',err);
                                    res.status(400).json("mail not sent");
                                }else{
                                    res.status(200).json("order accepted successfully")
                                }
                            });
                            // res.status(200).json("order verified successfully")
                        }
                    });

            }else{
                res.send("order not found");
            }
        }else{
            res.send(err);
        }
    })
    
}

