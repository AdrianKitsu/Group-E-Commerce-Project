"use strict";

const express = require("express");
const morgan = require("morgan");
const { getItems, getItem, getCompany } = require("./handlers/handlers");
const { itemsInStock, itemsOutOfStock } = require("./handlers/stockHandler");
const {
  itemsByCategory,
  itemByBodypart,
  itemByCompany,
} = require("./handlers/itemFilterHandlers");
const { createOrder, getOrders } = require("./handlers/orderHandlers1");
const {
  addItemToCart,
  creatingCart,
  getCart,
} = require("./handlers/cartHandlers");
const { updateQuantity } = require("./handlers/updateCartHandler");
const { deleteItem } = require("./handlers/deleteCartHandlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //---------------item endpoints ---------------------//
  //GET all items
  //returns an array if objects
  .get("/api/items", getItems)

  //GET a particular item based on ID
  //returns an object
  .get("/api/items/:itemId", getItem)

  //GET an array of items based on the same category
  .get("/api/items/category/:category", itemsByCategory)

  //GET an array of items based on the same body part
  .get("/api/items/body-part/:bodypart", itemByBodypart)

  //GET an array of items based on the same company
  .get("/api/items/company/:companyId", itemByCompany)

  //GET items array based on if they're in stock
  .get("/api/items-instock", itemsInStock)

  //GET items array based on if they're out of stock
  .get("/api/items-out-of-stock", itemsOutOfStock)

  //-------------- Company endpoints --------------------------//

  //GET a company based on ID, return an object
  .get("/api/companies/:companyId", getCompany)

  //---------------- Order endpoints ---------------------------//

  //POST creating an order for checkout --- does not work
  .post("/api/order/:user", createOrder)

  // GET for retrieving all the orders
  .get("/api/order/:user", getOrders)
  //GET for retreiving an order based on the order _id

  //------------------------CART endpoints ---------------------------//

  //POST for creating new cart if cart does not exist and adding non repeatable items to cart
  .post("/api/cart/:user", creatingCart)

  //GET for retrieveing a cart
  .get("/api/cart/:user", getCart)

  //patch to update the quantity of the item
  .patch("/api/cart/:user", updateQuantity)

  //delete item in cart
  .delete("/api/cart/:user", deleteItem)

  // ------------------- this is our catch all endpoint -------------------//

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
