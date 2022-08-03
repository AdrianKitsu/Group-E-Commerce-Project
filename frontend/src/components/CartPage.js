import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";

const CartPage = () => {
  const user = "ourUser";
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  
  // console.log("cartItems-", cartItems);

  useEffect(() => {
    fetch(`/api/cart/${user}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.status === 200) {
          setCartItems(data.data.purchasedItems);

          const totalPrice = data.data.purchasedItems.reduce((prev, curr) => {
            // console.log(Number(curr.price.slice(1)) * curr.quantity);
            // console.log("accu", accu);
            return prev + Number(curr.price.slice(1)) * curr.quantity;
          }, 0);

          setSubTotal(totalPrice.toFixed(2));
        }
      });
  }, []);


  //update quantity
  const updateCart = (_id, updatedPrice, editedQuantity) => {
    const update = { itemId: _id, quantity: editedQuantity };

    console.log("update-", update, typeof(_id));

    fetch(`/api/cart/${user}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("update-result", data);
        }
      })
      .catch((err) => console.log(err));

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
  };

  // delete item
  const handleDelteItem = (_id) => {
    console.log("id", _id);
    fetch(`/api/cart/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("deleted_result", data);
      })
      .catch((err) => console.log(err));

    const updatedCartItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCartItems);
    const updatedSubTotal = cartItems.reduce((accu, curr) => {
      if (curr._id === _id) {
        return accu;
      } else {
        return accu + Number(curr.price.slice(1)) * curr.quantity;
      }
    }, 0);
    // console.log("updatedSubTotal", updatedSubTotal);
    setSubTotal(updatedSubTotal.toFixed(2));
  };

  //post order for checkout
  const handleCheckOut = () => {
    const orderObject = {
      user,
      purchasedItems: cartItems,
    };
    fetch(`/api/order`, {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("post order result", data);
          window.alert("your order is confirmed!");
          navigate("/order");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Wrapper>
      <Title>{`${user}'s Shopping Cart`}</Title>
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
  /* border: 1px solid red; */
`;

const List = styled.li`
  width: 95%;
  height: 230px;
  border: 1px solid green;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 10px;
  /* position: relative; */
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const SubTotal = styled.div`
  width: 20%;
  height: 20px;
  margin: 1% 2.5% 1% auto;
  font-family: var(--font-poppins);
  font-weight: 600;
  /* padding: 10px; */
  @media (max-width: 768px) {
  margin: 1% 2% 1% auto;
  font-size: 12px;
  }
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
