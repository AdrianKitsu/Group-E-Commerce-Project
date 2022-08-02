import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";

const CartPage = () => {
    const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    {
      _id: 6544,
      quantity: 2,
      name: "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
      price: "$24.99",
      body_location: "Arms",
      category: "Fitness",
      imageSrc:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg...",
      numInStock: 9,
      companyId: 16384,
    },
    {
      _id: 6545,
      quantity: 1,
      name: "Bowflex EZ Pro Strapless Heart Rate Monitor Watch, Black",
      price: "$12.99",
      body_location: "Wrist",
      category: "Medical",
      imageSrc:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg...",
      numInStock: 5,
      companyId: 11385,
    },
  ]);
  const [subTotal, setSubTotal] = useState(
    cartItems.reduce((accu, curr) => {
      return Number(curr.price.slice(1)) * curr.quantity + accu;
    }, 0)
  );

  //   console.log(subTotal);

  //   useEffect(() => {
  //     fetch(`/api/items`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.status === 200) {
  //           setCartItems(data.data.results.slice(0, 2));
  //         }
  //       });
  //   }, []);

  const updateCart = (id, updatedPrice, editedQuantity) => {
    console.log("update-", id, updatedPrice, editedQuantity);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: editedQuantity };
      } else {
        return item;
      }
    });
    setCartItems(updatedCartItems);

    const updatedSubTotal = cartItems.reduce((accu, curr) => {
      if (curr._id === id) {
        return updatedPrice + accu;
      } else {
        return Number(curr.price.slice(1)) * curr.quantity + accu;
      }
    }, 0);
    console.log("updatedSubTotal", updatedSubTotal);
    setSubTotal(Number.parseFloat(updatedSubTotal).toFixed(2));

    //   const update = { ...item, quantity: editedQuantity };

    // fetch('/api/cart', {
    //  method: "PATCH",
    //  body: JSON.stringify(update),
    //  header: "Content-Type": "application/json",
    // }
    // )
    // .then((res) => res.json())
    // .then((data) => {
    //       console.log(data.data)
    //     })
    // .catch((err) => console.log(err));
  };

  const handleDelteItem = (itemId) => {
    // fetch('/api/cart', {
    //  method: "DELETE",
    //  body: JSON.stringify(itemId),
    //  header: "Content-Type": "application/json",
    // }
    // )
    // .then((res) => res.json())
    // .then((data) => {
    //       console.log(data.data)
    //     })
    // .catch((err) => console.log(err));

    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);

    const updatedSubTotal = cartItems.reduce((accu, curr) => {
      if (curr._id === itemId) {
        return  accu;
      } else {
        return Number(curr.price.slice(1)) * curr.quantity + accu;
      }
    }, 0);
    console.log("updatedSubTotal", updatedSubTotal);
    setSubTotal(Number.parseFloat(updatedSubTotal).toFixed(2));
  };

const handleCheckOut=()=>{
    //fetch POST to order endpoint
    navigate('/order')
}

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      {!cartItems && <div>Loading ...</div>}
      {cartItems && (
        <Container>
          {cartItems.map((item) => {
            return (
              <List key={item._id}>
                <ItemDetail item={item} detailed="false"/>
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
`;

const List = styled.li`
  width: 95%;
  height: 250px;
  /* border: 1px solid blue; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 10px;
  /* position: relative; */
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
