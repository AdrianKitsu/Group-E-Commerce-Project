import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(null);

  //   console.log(cartItems);

  useEffect(() => {
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) setCartItems(data.data.results.slice(0, 2));
      });
  }, []);



  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      {!cartItems && <div>Loading ...</div>}
      {cartItems && (
        <Container>
          {cartItems.map((item) => {
            item = { ...item, quantity: 2 };
            return (
              <List>
                <ItemDetail item={item} />
                <CartEditForm item={item}  />
              </List>
            );
          })}
        </Container>
      )}
      <SubTotal> Subtotal: </SubTotal>
      <CheckOut>Proceed to Checkout</CheckOut>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 30px 0;
  background-color: #ded7b1;
`;
const Title = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 600;
  padding-left: 35px;
  font-family: var(--font-poppins);
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
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
  /* padding: 10px; */
`;
const CheckOut = styled.button`
  display: block;
  width: 20%;
  height: 38px;
  background-color: var(--color-main-blue);
  border: none;
  border-radius: 18px;
  margin: 0 3% 0 auto;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    opacity: 0.8;
    transform: scale(0.95);
  }
`;

export default CartPage;
