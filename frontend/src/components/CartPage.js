import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";
import { IoRefresh } from "react-icons/io5";

const CartPage = () => {
  //hardcoded userName
  const user = "Marie";

  // states update by fetch result
  const [cartItems, setCartItems] = useState(null);
  const [subTotal, setSubTotal] = useState(null);
  const [confirm, setConfirm] = useState(false);

  //going back to homepage when order is confirmed
  const navigate = useNavigate();

  //when cartPage is opened, fetch getCart request
  useEffect(() => {
    fetch(`/api/cart/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "cart not found") {
          setCartItems([]);
        }
        if (data.status === 200) {
          setCartItems(data.data.purchasedItems);

          //calculate subtotal price of items
          const totalPrice = data.data.purchasedItems.reduce((prev, curr) => {
            return prev + Number(curr.price.slice(1)) * curr.quantity;
          }, 0);
          setSubTotal(totalPrice.toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  }, [user]);

  //update quantity of the item function
  const updateCart = (_id, updatedPrice, editedQuantity) => {
    // PATCH request: update quantity
    const update = { itemId: _id, quantity: editedQuantity };

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
          //if successful, update states on the frontend
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

          setSubTotal(Number.parseFloat(updatedSubTotal).toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  };

  // delete item function
  const handleDelteItem = (_id) => {
    // DELETE request: deleteItem from user's cart
    fetch(`/api/cart/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //if the result is success, update states on the fronend
          const updatedCartItems = cartItems.filter((item) => item._id !== _id);
          setCartItems(updatedCartItems);

          const updatedSubTotal = cartItems.reduce((accu, curr) => {
            if (curr._id === _id) {
              return accu;
            } else {
              return accu + Number(curr.price.slice(1)) * curr.quantity;
            }
          }, 0);

          setSubTotal(updatedSubTotal.toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  };

  //proceed to checkout for order
  const handleCheckOut = () => {

    //post body
    const orderObject = {
      user,
      purchasedItems: cartItems,
    };

    // POST request : creating a new order
    fetch(`/api/order/${user}`, {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setConfirm(true);
          setCartItems(null);
          setTimeout(() => {
            setConfirm(false);
            navigate("/");
          }, 1200);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      {!cartItems && (
        <LoadPage>
          <Icon>
            <IoRefresh size={"80px"} />
          </Icon>
        </LoadPage>
      )}
      {cartItems && cartItems.length === 0 && (
        <Message>There is no item in your cart !</Message>
      )}
      {cartItems && cartItems.length > 0 && (
        <>
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
          <SubTotal> Subtotal: $ {subTotal}</SubTotal>
          <CheckOut onClick={handleCheckOut}>Proceed to Checkout</CheckOut>
        </>
      )}

      {confirm && <Message>your order has been confirmed !</Message>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 10px 0;
  background-color: var(--color-main-brown);
`;

const Title = styled.div`
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
  padding-top: 10px;
  font-size: 13px;
`;

const List = styled.li`
  width: 95%;
  height: 230px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    height: 480px;
  }
`;

const SubTotal = styled.div`
  width: 20%;
  height: 20px;
  margin: 1% 2.5% 1% auto;
  font-family: var(--font-poppins);
  font-weight: 600;

  @media (max-width: 768px) {
    width: 80%;
    height: 30px;
    margin: 5px auto;
    text-align: center;
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
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 35px;
    margin: 5px auto;
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
export default CartPage;
