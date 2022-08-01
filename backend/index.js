"use strict";

const express = require("express");
const morgan = require("morgan");
const { getItems, getItem } = require("./handlers");
const {
  itemsByCategory,
  itemByBodypart,
  itemByCompany,
} = require("./itemFilterHandlers");

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

  //---------------REST endpoints ---------------------//
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

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
