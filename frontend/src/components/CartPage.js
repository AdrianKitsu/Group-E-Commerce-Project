import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";

const CartPage = () => {
  const user = "Marie";
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(null);
  const [subTotal, setSubTotal] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    fetch(`/api/cart/${user}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.status === 200) {
          // console.log(data);
          setCartItems(data.data.purchasedItems);
          const totalPrice = data.data.purchasedItems.reduce((prev, curr) => {
            return prev + Number(curr.price.slice(1)) * curr.quantity;
          }, 0);
          setSubTotal(totalPrice.toFixed(2));
        }
      });
  }, [user]);

  
  //update quantity
  const updateCart = (_id, updatedPrice, editedQuantity) => {
    const update = { itemId: _id, quantity: editedQuantity };

    console.log("update-", update, typeof _id);

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

const emptyCart = () => {
    fetch(`/api/empty-cart/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("deletedd-result", data);
          setCartItems(null);
          setConfirm(true);

          setTimeout(() => {
            setConfirm(false);
            navigate("/");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  //checkout for order
  const handleCheckOut = () => {
    const orderObject = {
      user,
      purchasedItems: cartItems,
    };
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
          console.log("post order result", data);
          emptyCart();
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Wrapper>
      <Title>{`${user}'s Shopping Cart`}</Title>
            
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

      {confirm && <Message>your order has been confirmed</Message>}
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
  padding: 5px 35px;
  font-family: var(--font-poppins);
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  font-size: 13px;
  /* border: 1px solid purple; */
`;

const List = styled.li`
  width: 95%;
  height: 230px;
  /* border: 1px solid green; */
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
    /* background-color: var(--color-point-pink); */
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
export default CartPage;
