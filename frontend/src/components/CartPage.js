import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(null);
  console.log(cartItems);

  useEffect(() => {
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) setCartItems(data.data.results.slice(0, 5));
      });
  }, []);

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>

      {!cartItems && <div>Loading ...</div>}
      {cartItems && (
        <Container>
          {cartItems.map((item) => {
            return (
              <List>
                <ItemDetail item={item} />
                <Edit>
                  <Form>
                    <Label for="quantity">Qty:</Label>
                    <Input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="50"
                    />
                  </Form>
                  <ItemTotal>Total price: </ItemTotal>
                  <Delete>Delete</Delete>
                </Edit>
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
  margin: 0;
  padding: 30px 0;
  background-color: #ded7b1;
`;
const Title = styled.div`
  width: 100%;
  height: 50px;
  font-size: 26px;
  font-weight: 800;
  padding: 30px;
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
const Edit = styled.li`
  width: 30%;
  margin-left: 1%;
  height: 250px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 30px;
`;
const Form = styled.form`
  font-size: 15px;
`;
const Label = styled.label``;
const Input = styled.input`
  margin-left: 10px;
`;

const ItemTotal = styled.div`
  font-size: 15px;
`;

const Delete = styled.button`
  width: 60px;
  height: 28px;
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  border-radius: 7px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    transform: scale(0.95);
  }
`;

const SubTotal = styled.h2`
  text-align: right;
  margin-right: 120px;
  padding: 10px;
`;
const CheckOut = styled.button`
  display: block;
  width: 180px;
  height: 40px;
  background-color: var(--color-main-blue);
  border: none;
  border-radius: 18px;
  margin: 5px 20px 20px auto;
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
