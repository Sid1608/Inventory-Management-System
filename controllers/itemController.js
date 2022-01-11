const User = require("../models/User");
const Item = require("../models/Item");
const mongoose = require("mongoose")

exports.FSN1 = (req, res) => {
    var query1 = { date_purchased: { $lt: new Date((new Date()) - 43800 * 60 * 60 * 1000) } }; // we have to take the item_id of the item which we want to add into inventory. 
    Item.find(query1, function (err, foundItems) {
        if (!err) {
            res.status(200).json({ items: foundItems });
        }
        else {
            res.send(err);
        }
    })

}
exports.FSN2 = (req, res) => {
    var query2 = { date_purchased: { $lt: new Date((new Date()) - 2 * 43800 * 60 * 60 * 1000) } }; // we have to take the item_id of the item which we want to add into inventory. 
    Item.find(query2, function (err, foundItems) {
        if (!err) {
            res.status(200).json({ items: foundItems });
        }
        else {
            res.send(err);
        }
    })
}
exports.inventory = (req, res) => {
    Item.find((err, items) => {
        if (!err) {
            res.json({ items });
        } else {
            res.send(err);
        }
    })


}

exports.searchItem = function (req, res) {
    const item = req.params.itemId;

    Item.find({ item_name: item }, function (err, foundItem) {
        if (!err) {
            res.status(200).json({item:foundItem});
        }
        else {
            res.send(err);
        }
    })
}
exports.addItem = async (req, res) => {
    try {
        const newItem = await new Item({
            _id: new mongoose.Types.ObjectId(),
            item_name: req.body.item_name,
            expected_cost: req.body.expected_cost,
            item_description: req.body.item_description,
            item_count: req.body.item_count
        })
        const item = await newItem.save();
        res.status(200).json({ status: 'Item Added Successfully', item: item });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Item Not Added Successfully', item: false, error: err });
    }

}


exports.itemCost1 = (req, res) => {
    query = { expected_cost: { $lt: 10000 } }
    Item.find(query, function (err, foundItems) {
        if (err) {
            res.status(404).json({ error: err })
        }
        else {
            res.status(200).json({ items: foundItems })
        }
    })

}
exports.itemCost2 = (req, res) => {
    query = { expected_cost: { $lt: 100000, $gt: 10000 } }
    Item.find(query, function (err, foundItems) {
        if (err) {
            res.status(404).json({ error: err })
        }
        else {
            res.status(200).json({ items: foundItems })
        }
    })

}
exports.itemCost3 = (req, res) => {
    query = { expected_cost: { $gt: 100000 } }
    Item.find(query, function (err, foundItems) {
        if (err) {
            res.status(404).json({ error: err })
        }
        else {
            res.status(200).json({ items: foundItems })
        }
    })

}

exports.toInventory = (req, res) => {
    const item_name = req.params.item_name;
    console.log(item_name);
    Item.findOneAndUpdate(item_name, { $inc: { issued_count: -1 } }, function (err, doc) {
        if (err) {
            res.status(404).json({ error: err })
        }
        else {
            res.status(200).json({ doc: doc })
        }
    }
    )
}

exports.issuedDecreaser = (req, res) => {
    const item_id = req.params.itemId;
    Item.findById(item_id, (err, item) => {
        if (!err) {
            if (item) {
                const ord = {
                    _id: item._id,
                    item_name: item.item_name,
                    item_description: item.item_description,
                    item_id: item.item_id,
                    item_count: item.item_count,
                    expected_cost: item.expected_cost,
                    issued_count: item.issued_count + 1,
                    date_purchased: item.date_purchased
                }

                if (item.item_count == ord.issued_count) {
                    Item.findByIdAndDelete(item_id, (err) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json("Item issued successfully");
                        }
                    });
                }
                else {
                    Item.findByIdAndUpdate(item_id, { $set: ord }, (err) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json("item issued successfully")
                        }
                    });
                }

            } else {
                res.send("item not found");
            }
        } else {
            res.send(err);
        }
    })

}