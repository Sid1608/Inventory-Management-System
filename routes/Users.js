const router=require("express").Router();
const User=require("../models/User");

const {orderHistoryUser,orderItem,recentOrder} =require("../controllers/orderController");



//1.Dashboard Route
router.get("/dashboard/:userId",recentOrder);

//1. Order-Items Route
router.post("/orderItem",orderItem)

//Order History Route
router.get("/orderHistory/:userId",orderHistoryUser)



module.exports=router;