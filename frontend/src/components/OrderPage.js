import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";

const OrderPage = () => {
  const [orderList, setOrderList] = useState([]);
  const { user } = useParams();
  console.log("orderList", orderList);

  useEffect(() => {
    fetch(`/api/order/${user}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.orders);
        if (data.status === 200) setOrderList(data.data.orders);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <Wrapper>
      <Title>{user}'s Order List </Title>

      {orderList.length === 0 && <div>Loading ...</div>}
      {orderList.length > 0 && (
        <Container>
          {orderList.map((order) => {
          
            const totalPrice = order.purchasedItems.reduce((prev, curr) => {
              return prev + Number(curr.price.slice(1)) * curr.quantity;
            }, 0);
              console.log("totalPrice", totalPrice)
            return (
              <Order>
                <OrderNumber>order number : {order._id}</OrderNumber>
                <SubTotal> Subtotal: $  {totalPrice.toFixed(2)}</SubTotal>
                {order.purchasedItems.map((item) => {
                  return (
                    <EachItem key={item._id}>
                      <ItemDetail item={item} detailed="false" />
                    </EachItem>
                  );
                })}
              </Order>
            );
          })}
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 5px 0;
  background-color: var(--color-main-brown);
`;

const Title = styled.h2`
  width: 100%;
  font-size: 26px;
  font-weight: 600;
  padding: 5px;
  text-align: center;
  font-family: var(--font-poppins);
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;

  /* border: 1px solid red; */
`;

const Order = styled.div`
  width: 80%;
  margin: 2% auto;
  font-family: var(--font-roboto);
  font-weight: 300;
  color: white;
  background-color: var(--color-main-blue);
`;

const OrderNumber = styled.h2`
  font-size: 12px;
  padding: 10px;
`;
const SubTotal = styled.div`
  width: 20%;
  height: 25px;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5% 1% auto;
  font-family: var(--font-poppins);
  font-weight: 600;
  /* border: 1px solid green; */
  background-color: var(--color-point-pink);
  color: white;
`;
const EachItem = styled.li`
  width: 90%;
  margin: 0 auto;
  height: 230px;
  /* border: 1px solid blue; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 10px;
  /* position: relative; */
  @media (max-width: 768px) {
  }
`;

export default OrderPage;

// {totalPrice.toFixed(2)}
