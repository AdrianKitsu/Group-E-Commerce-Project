const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//adding item to cart or creating cart if no cart exist

const creatingCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //the logged in user's id, itemId and quantity of item
  const { itemId, quantity } = req.body;
  const user = req.params.user;
  //create random id
  const _id = uuidv4();

  try {
    await client.connect();
    const db = client.db("ecommerce");
    // finding a cart based on user
    let usersCart = await db.collection("cart").findOne({ user });

    //if cart does not exist for user
    if (!usersCart) {
      //no cart exist for user, must create new cart
      //inserting a new item into cart
      cart = await db.collection("cart").insertOne({
        _id,
        user,
        purchasedItems: [
          {
            itemId,
            quantity,
            total: numPrice * quantity,
            price,
          },
        ],
        subTotal: numPrice * quantity,
      });

      return res
        .status(200)
        .json({ status: 200, data: cart, message: "new cart created" });
    }
    //if cart exists
    else {
      const data = await db.collection("cart").update(
        {
          user,
        },
        { $push: { purchasedItems: req.body } }
      );

      return res
        .status(200)
        .json({ status: 200, data: data, message: "new item added" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//retrieving a cart

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const user = req.params.user;
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const cart = await db.collection("cart").findOne({ user });

    if (cart) {
      return res
        .status(200)
        .json({ status: 200, data: cart, message: "cart retreieved" });
    } else {
      return res
        .status(404)
        .json({ status: 404, data: cart, message: "cart not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { creatingCart, getCart };
