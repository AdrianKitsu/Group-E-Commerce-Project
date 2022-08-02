
//creating a variable containing the item details
let itemDetails = await db.collection("items").findOne({ _id: itemId });
//the price of a particular item
const price = itemDetails.price;
//taking away the $ at the start of the string
const afterPrice = price.substring(price.indexOf("$") + 1);
//converting the string of price of item into a number
const numPrice = parseFloat(afterPrice);

//if itemDetails is falsy return an error that item is not found
if (!itemDetails) {
  return res
    .status(404)
    .json({ status: 404, data: itemDetails, message: "item not found" });
}
//checking if index of item exists
const itemIndex = userCart.purchasedItems.findIndex(
  (item) => item.itemId === itemId
);
{
    //check if product exists in purchasedItems, just add the previous quantity with new quantity and update total price
    if (itemIndex !== -1) {
      //updating quantity
      // cart.purchasedItems[itemIndex].quantity = quantity;
      // //updating total
      // cart.purchaseditems[itemIndex].total =
      //   cart.purchasedItems[itemIndex].quantity * numPrice;
      // //updateing price
      // cart.purchasedItems[itemIndex].price = itemDetails.price;
      //updateing sub total ----- this is what I think was giving me an error reading 0
      // cart.subtotal = cart.purchasedItems
      //   .map((item) => item.total)
      //   .reduce((a, b) => a + b);

      const data = await db.collection("cart").updateOne(
        {
          user,
          "purchasedItems.quantity": cart.purchasedItems[itemIndex].quantity,
        },
        { $set: { "puchasedItems.$.quantity": quantity } }
      );
      console.log(data);
    }
    //check if quantity is greater than 0 the item to the item to purchasedItems array
    else if (quantity > 0) {
      //insert one?

      // const data = await db.collection("cart").insertOne({user}
      //   itemId,
      //   quantity,
      //   ...cart.purchasedItems,
      // });
      usersCart.purchasedItems.push({
        itemId,
        quantity,
        price: itemDetails.price,
        total: numPrice * quantity,
      });
      console.log(data);

      // cart.subTotal = cart.purchasedItems
      //   .map((item) => item.total)
      //   .reduce((a, b) => a + b);
    }
    // if quantity of price is 0 throw the error - do I need this
    else {
      return res.status(400).json({
        type: "Invalid",
        msg: "Invalid request",
      });
    }
    // .save is no longer a function
    //   let data = await cart.save();
    return res.status(200).json({
      status: 200,
      data,
      message: "cart successful",
    });