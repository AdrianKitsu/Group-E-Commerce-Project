const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

/// create an order
const createOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { user, purchasedItems } = req.body;
  const _id = uuidv4();
  try {
    await client.connect();
    const db = client.db("ecommerce");
    //if there are no items in purchased items array return error
    if (purchasedItems.length <= 0) {
      return res.status(400).json({
        status: 400,
        data: req.body,
        message: "Looks like your cart is empty",
      });
    }
    // if there are items in array create new order
    const order = await db.collection("orders").insertOne({ _id, ...req.body });
    //update numInStock for items purchased
    await purchasedItems.forEach((item) => {
      //updating how much is in stock
      const newInStock = Number(item.numInStock) - Number(item.quantity);
      const _id = item._id;
      //updating each item based on their id
      /////////-----does not work-------/////
      ////will need to figure out how to update each item in purchasedItems
      await db.collection("items").updateOne(
        { _id },
        { $set: { numInStock: newInStock } }
      );
    });
    return res
      .status(200)
      .json({ status: 200, data: order, message: "new order created" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

module.exports = { createOrder };
