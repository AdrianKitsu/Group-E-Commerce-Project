import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import styled from "styled-components";
import { AiFillCheckCircle } from "react-icons/ai";
import ItemDetail from "./ItemDetail";
import { IoRefresh } from "react-icons/io5";

const ItemPage = () => {
  //hardcoded userName
  const user = "Marie";

  //itemId from path="/item/:item"
  const itemId = useParams().item;

  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(0);

  //by message, the purchase box shows "add to cart" or "added to cart"
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();


   //when itemPage is opened, fetch get getItem
  useEffect(() => {
    if (itemId) {
      fetch(`/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) setItem(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [itemId]);


//when item data received, fetch getCompany by the companyId
  useEffect(() => {
    if (item) {
      fetch(`/api/companies/${item.companyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) setCompany(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [item]);

//when pressing the add button
  const addIntoCart = () => {

    // POST request : create cart
    fetch(`/api/cart/${user}`, {
      method: "POST",
      body: JSON.stringify({ ...item, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => console.log(err.message));
  };
 

  return (
    <>
      {!company && (
        <LoadPage>
          <Icon>
            <IoRefresh size={"80px"} />
          </Icon>
        </LoadPage>
      )}
      {item && company && (
        <Wrapper>
          <Container>
            <ItemDetail item={item} company={company} detailed="true" />
          </Container>
          {!message ? (
            <PurchaseBox>
              <Quantity>
                <Label for="quantity">Quantity:</Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max={item.numInStock + ""}
                  value={quantity}
                  onChange={(ev) => setQuantity(Number(ev.target.value))}
                />
              </Quantity>
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
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: var(--color-main-brown);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
 
`;

const Container = styled.div`
  width: 70%;
  height: 380px;
  margin: 50px 10px;

  @media (max-width: 768px) {
    width: 80%;
    height: 500px;
    margin: 20px;
  }
  @media (max-width: 425px) {
    height: 420px;
  }
`;

const PurchaseBox = styled.div`
  width: 20%;
  height: 80px;
  border: 1px solid var(--color-font-darkgray);
  margin: 340px 10px 0 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  @media (max-width: 768px) {
    width: 40%;
    height: 70px;
    margin: 0;
  }
 
`;
const AddButton = styled.button`
  width: 80%;
  height: 35px;
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
const Quantity = styled.form`
  margin-bottom: 5px;
  font-size: 1em;
`;
const Label = styled.label``;
const Input = styled.input`
  width: 30px;
  height: 14px;
  margin-left: 10px;
  font-size: 13px;
`;

const CartMessage = styled(PurchaseBox)`
  color: var(--color-point-pink);
  background-color: var(--color-main-white);
  font-size: 16px;
`;

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
export default ItemPage;
