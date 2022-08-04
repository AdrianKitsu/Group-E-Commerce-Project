import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";

const OrderPage = () => {
  const [orderList, setOrderList] = useState(null);
  // const user = "Marie";
  const user = useParams().user

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
      <Title> Order List </Title>
      {!orderList && <Message>loading ...</Message>}
      {orderList && orderList.length === 0 && (
        <Message>There is no order list under this user!</Message>
      )}
      {orderList && orderList.length > 0 && (
        <Container>
          {orderList.map((order) => {
            const totalPrice = order.purchasedItems.reduce((prev, curr) => {
              return prev + Number(curr.price.slice(1)) * curr.quantity;
            }, 0);

            return (
              <Order>
                <OrderNumber>
                  order number : {order._id}
                </OrderNumber>
                <SubTotal>
                  {" "}
                  Subtotal: $ <Span>{totalPrice.toFixed(2)}</Span>
                </SubTotal>
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
`;

const Order = styled.div`
  width: 80%;
  margin: 2% auto;
  font-family: var(--font-roboto);
  font-weight: 300;

  border-radius: 10px;
  background-color: var(--color-main-blue);
`;

const OrderNumber = styled.h2`
  font-size: 14px;
  font-weight: 400;
  position: relative;
  top: 20px;
  left: 42px;
  color: var(--color-font-darkgray);
`;
const Span = styled.span`
  color: white;
`;
const SubTotal = styled.div`
  width: 20%;
  height: 25px;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5% 1% auto;
  font-family: var(--font-poppins);
  font-weight: 600;
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
const Message = styled.div`
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  font-size: 26px;
  text-align: center;
  padding: 10px;
  font-family: var(--font-poppins);
`;
export default OrderPage;
