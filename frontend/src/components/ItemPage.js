import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AiFillCheckCircle } from "react-icons/ai";
import ItemDetail from "./ItemDetail";

const ItemPage = () => {
  const itemId = useParams().item;
  const [item, setItem] = useState({});
  const [message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`/api/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) setItem(data.data);
      });
  }, [itemId]);

  const addIntoCart = () => {
    // fetch(`/api/cart`, {
    //   method: "POST",
    //   body: JSON.stringify(item),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMessage(true);
    //     setTimeout(() => {
    //       setMessage(false);
    //     }, 3000);
    //   });

    setMessage(true);
  };

  return (
    <Wrapper>
      <Container>
        <ItemDetail item={item} />
      </Container>
      {!message ? (
        <PurchaseBox>
          <Buy>To buy, </Buy>
          <AddButton
            disabled={item?.numInStock > 0 ? false : true}
            onClick={addIntoCart}
          >
            Add to Cart
          </AddButton>
        </PurchaseBox>
      ) : (
        <CartMessage>
          <AiFillCheckCircle />
          Added to Cart
        </CartMessage>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  /* margin: 0; */
  /* border: 2px solid blue; */
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: var(--color-main-gray);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 425px) {
    background-color: beige;
  }
`;

const Container = styled.div`
  width: 70%;
  height: 380px;
  margin: 50px 10px;
  @media (max-width: 768px) {
    width: 80%;
    height: 500px;
    margin: 10px;
  }
   @media (max-width: 425px) {
   height: 420px;
  }
`;
const PurchaseBox = styled.div`
  width: 20%;
  height: 80px;
  border: 1px solid var(--color-font-darkgray);
  margin: 350px 10px 0 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  @media (max-width: 768px) {
    width: 30%;
    height: 58px;
    margin: 60px 10px;
    font-size: 13px;
  }
  @media (max-width: 425px) {
    height: 48px;

  }
`;
const AddButton = styled.button`
  width: 80%;
  height: 40px;
  font-size: 14px;
  background-color: var(--color-main-blue);
  color: white;
  text-align: center;
  padding: 7px;
  border: none;
  border-radius: 15px;
  transition: all 300ms ease;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(0.97);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    transform: scale(1);
    background-color: #515e63;
  }

  @media (max-width: 768px) {
    height: 30px;
      font-size: 13px;
  }
  @media (max-width: 425px) {
    height: 25px;
    font-size: 11px;
    padding: 5px;
  }
`;
const Buy = styled.span`
  /* margin-bottom: 5px; */
  font-size: 1em;
`;

const CartMessage = styled(PurchaseBox)`
  color: var(--color-point-pink);
  background-color: var(--color-main-white);
  font-size: 16px;
`;

export default ItemPage;
