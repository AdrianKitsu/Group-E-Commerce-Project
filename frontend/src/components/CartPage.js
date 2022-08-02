import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";

const CartPage = () => {
  const user = "ourUser";
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  console.log("cart-", cart);
  // 0: {itemId: 6544, quantity: 3, total: 74.97, price: '$24.99'}
  // 1: {quantity: 2, itemId: 6543}
  // 2: {quantity: 2, itemId: 6544}

  console.log("cartItems-", cartItems);

  useEffect(() => {
    fetch(`/api/cart/${user}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.status === 200) {
          setCart(data.data.purchasedItems);
            setSubTotal(
              data.data.purchasedItems.reduce((accu, curr) => {
                return Number(curr.price.slice(1)) * curr.quantity + accu;
              }, 0)
            );
        }
      });
  }, []);


  useEffect(async () => {
    if (cart) {
      try {
        const promises = await Promise.all(
          cart.map((item) => fetch(`/api/items/${item.itemId}`))
        );

        const itemsArr = await Promise.all(promises.map((res) => res.json()));
        console.log(itemsArr);

        setCartItems(
          itemsArr.map((item) => {
            const theItem = cart.find((el) => el.itemId === item.data._id);
            return { ...item.data, quantity: theItem.quantity };
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [cart]);

  //update quantity
  const updateCart = (_id, updatedPrice, editedQuantity) => {
    console.log("update-", _id, updatedPrice, editedQuantity);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === _id) {
        return { ...item, quantity: editedQuantity };
      } else {
        return item;
      }
    });
    setCartItems(updatedCartItems);

    const updatedSubTotal = cartItems.reduce((accu, curr) => {
      if (curr._id === _id) {
        return updatedPrice + accu;
      } else {
        return Number(curr.price.slice(1)) * curr.quantity + accu;
      }
    }, 0);
    console.log("updatedSubTotal", updatedSubTotal);
    setSubTotal(Number.parseFloat(updatedSubTotal).toFixed(2));

    //   const update = { _id,  quantity: editedQuantity};

    // fetch('/api/cart', {
    //  method: "PATCH",
    //  body: JSON.stringify(update),
    //  header: "Content-Type": "application/json",
    // }
    // )
    // .then((res) => res.json(update))
    // .then((data) => {
    //       console.log(data.data)
    //     })
    // .catch((err) => console.log(err));
  };

  // delete item
  const handleDelteItem = (_id) => {
    // fetch('/api/cart/userId', {
    //  method: "DELETE",
    //  body: JSON.stringify(_id),
    //  header: "Content-Type": "application/json",
    // }
    // )
    // .then((res) => res.json())
    // .then((data) => {
    //       console.log(data.data)
    //     })
    // .catch((err) => console.log(err));

    const updatedCartItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCartItems);
    const updatedSubTotal = cartItems.reduce((accu, curr) => {
      if (curr._id === _id) {
        return accu;
      } else {
        return Number(curr.price.slice(1)) * curr.quantity + accu;
      }
    }, 0);
    console.log("updatedSubTotal", updatedSubTotal);
    setSubTotal(Number.parseFloat(updatedSeubTotal).toFixed(2));
  };

  //post order
  const handleCheckOut = () => {
    //fetch POST to order endpoint
    // fetch(`/api/order/userId`, {
    //   method: "POST",
    //   body: JSON.stringify(),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //
    //   });
    navigate("/order");
  };

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      {cartItems.length === 0 && <div>Loading ...</div>}
      {cartItems.length > 0 && (
        <Container>
          {cartItems.map((item) => {
            return (
              <List key={item._id}>
                <ItemDetail item={item} detailed="false" />
                <CartEditForm
                  item={item}
                  updateCart={updateCart}
                  delelteItem={() => handleDelteItem(item._id)}
                />
              </List>
            );
          })}
        </Container>
      )}
      <SubTotal> Subtotal: $ {subTotal}</SubTotal>
      <CheckOut onClick={handleCheckOut}>Proceed to Checkout</CheckOut>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 10px 0;
  background-color: #ded7b1;
`;
const Title = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 600;
  padding: 5px 35px;
  font-family: var(--font-poppins);
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  font-size: 13px;
   border: 1px solid red;
`;

const List = styled.li`
  width: 95%;
  height: 230px;
  border: 1px solid blue;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 10px;
  /* position: relative; */
   @media (max-width: 768px) {
   
  }
`;

const SubTotal = styled.div`
  width: 20%;
  height: 20px;
  margin: 1% 2.5% 1% auto;
  font-family: var(--font-poppins);
  font-weight: 600;
  /* padding: 10px; */
`;
const CheckOut = styled.button`
  display: block;
  width: 20%;
  height: 38px;
  background-color: var(--color-main-blue);
  border: none;
  border-radius: 18px;
  margin: 0 4% 0 auto;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    opacity: 0.8;
    transform: scale(0.95);
    /* background-color: var(--color-point-pink); */
  }
`;

export default CartPage;

// {
//       _id: 6544,
//       quantity: 2,
//       name: "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
//       price: "$24.99",
//       body_location: "Arms",
//       category: "Fitness",
//       imageSrc:
//         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg...",
//       numInStock: 9,
//       companyId: 16384,
//     },
//     {
//       _id: 6545,
//       quantity: 1,
//       name: "Bowflex EZ Pro Strapless Heart Rate Monitor Watch, Black",
//       price: "$12.99",
//       body_location: "Wrist",
//       category: "Medical",
//       imageSrc:
//         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg...",
//       numInStock: 5,
//       companyId: 11385,
//     },
