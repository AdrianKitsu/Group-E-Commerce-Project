import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";
import { IoRefresh } from "react-icons/io5";
import { SearchBarContext } from "../contexts/searchBarContext";

const OrderPage = () => {
  const [orderList, setOrderList] = useState(null);

  //when order page is opened we get the user from params
  const user = useParams().user;

  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(SearchBarContext);

  //get user's order list fetch
  useEffect(() => {
    fetch(`/api/order/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setOrderList(data.data.orders);
        } else if (data.status === 404) {
          setOrderList(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [user]);

  if (!orderList) {
    return (
      <Wrapper>
        <Title> Order List </Title>
        <LoadPage>
          <Icon>
            <IoRefresh size={"80px"} />
          </Icon>
        </LoadPage>
      </Wrapper>
    );
  }

  // create a filteredItem variable that will hold the items in the category filtered based on search
  const filteredItems = orderList.filter((order) => {
    if (order._id.toLowerCase().includes(search)) {
      return order;
    }
  });

  return (
    <Wrapper>
      <Title> Order List </Title>

      {orderList && orderList.length === 0 && (
        <Message>There are no orders for this user!</Message>
      )}
      {orderList && orderList.length > 0 && (
        <Container>
          {
            //if the filteredItems array has no orders tell the user
            filteredItems.length === 0 ? (
              <Message>
                looks like nothing matches your search... Please try another
                order number.
              </Message>
            ) : (
              //display the order that matches in the search bar
              filteredItems.map((order) => {
                const totalPrice = order.purchasedItems.reduce((prev, curr) => {
                  return prev + Number(curr.price.slice(1)) * curr.quantity;
                }, 0);

                return (
                  <Order key={order._id}>
                    <Head>
                      <OrderNumber>
                        order number : <Span>{order._id} </Span>
                      </OrderNumber>
                      <SubTotal>
                        Subtotal: $ <Span>{totalPrice.toFixed(2)}</Span>
                      </SubTotal>
                    </Head>

                    {order.purchasedItems.map((item) => {
                      return (
                        <EachItem key={item._id}>
                          <ItemDetail item={item} detailed="false" />
                        </EachItem>
                      );
                    })}
                  </Order>
                );
              })
            )
          }
        </Container>
      )}
    </Wrapper>
  );
};

const LoadPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-main-blue);
  background-color: var(--color-main-brown);
`;

const Icon = styled.div`
  animation: rotation 2s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
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
  padding: 15px;
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
  margin-bottom: 3%;
  font-family: var(--font-roboto);
  font-weight: 300;
  border-radius: 10px;
  background-color: var(--color-main-blue);
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  align-items: center;
  color: var(--color-font-darkgray);
`;
const OrderNumber = styled.h3`
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;
const Span = styled.span`
  font-size: 13px;
  color: var(--color-font-darkgray);
`;
const SubTotal = styled.h2`
  height: 25px;
  border-radius: 5px;
  margin-top: 5px;
  font-family: var(--font-poppins);
  font-weight: 600;
`;
const EachItem = styled.li`
  width: 90%;
  margin: 0 auto;
  height: 230px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    height: 320px;
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
