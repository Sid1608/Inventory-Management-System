const router = require("express").Router();
const User = require("../models/User");
const { updateUser, deleteUser, allUsers } = require("../controllers/userController")
const { allOrders, searchOrder, orderHistoryAll, rejectOrder, acceptOrder, searchByOrderDate } = require("../controllers/orderController");
const { inventory, searchItem, FSN1, FSN2, toInventory, issuedItems, addItem, itemCost1, itemCost2, itemCost3, issuedDecreaser } = require("../controllers/itemController");
const { IssuedItem, deleteIssuedItem, issueItem } = require("../controllers/issuedItemController")
//1.Inventory/Item Route
router.get("/inventory",inventory);
router.get("/fsn1",FSN1);
router.get("/fsn2",FSN2);
router.patch("/toInventory/:item_name", toInventory);
router.post("/addItem",addItem);
router.get("/searchItem/:itemId",searchItem);
router.get("/C",itemCost1);
router.get("/B",itemCost2);
router.get("/A",itemCost3);

// 2.Orders Route
router.get("/orders",allOrders);
router.get("/searchOrder/:orderId",searchOrder);
router.get("/searchByOrderDate/:orderDate", searchByOrderDate);
router.delete("/rejectOrder/:orderId",rejectOrder);
router.patch("/acceptOrder/:orderId",acceptOrder);

//3.Issued Items Route
router.get("/IssuedItems", IssuedItem);
router.patch("/issuedDecreaser/:itemId", issuedDecreaser);
router.delete("/deleteIssuedItem/:item_id", deleteIssuedItem);
router.post("/issueItem", issueItem);

//4. Users Route       
router.get("/users",allUsers);
router.patch("/updateUser",updateUser);
router.delete("/deleteUser/:username",deleteUser);




module.exports=router;