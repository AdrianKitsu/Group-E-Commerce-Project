import styled from "styled-components";
import { useEffect, useState } from "react";

const CartEditForm = ({ item, updateCart, delelteItem }) => {
  // console.log('item', item)
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);
  // console.log('editedQuantity', editedQuantity, typeof(editedQuantity))
  const [totalPrice, setTotalPrice] = useState(
    Number(item.price.slice(1)) * item.quantity
  );

  const handleUpdateQuantity = (ev) => {
    ev.preventDefault();
    const updatedPrice = Number(item.price.slice(1)) * Number(editedQuantity);
    setTotalPrice(updatedPrice);
    updateCart(item._id, updatedPrice, editedQuantity);
  };

  return (
    <Edit>
      <Form>
        <Label for="quantity">Qty:</Label>
        <Input
          type="number"
          min="0"
          max={item.numInStock + ""}
          value={editedQuantity}
          onChange={(ev) => {
            setEditedQuantity(Number(ev.target.value));
          }}
        />
        <UpdateButton onClick={handleUpdateQuantity}>Update</UpdateButton>
      </Form>
      <ItemTotal>Total price: $ {totalPrice} </ItemTotal>
      <DeleteButton onClick={delelteItem}>Delete</DeleteButton>
    </Edit>
  );
};

const Edit = styled.div`
  width: 30%;
  margin-left: 15px;
  height: 230px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 30px 90px 30px;
  font-family: var(--font-roboto);
`;
const Form = styled.form`
  font-size: 15px;
`;
const Label = styled.label``;
const Input = styled.input`
  margin-left: 10px;
`;
const UpdateButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  width: 60px;
  height: 25px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    transform: scale(0.95);
    background-color: var(--color-point-pink);
    color: var(--color-main-white);
  }
`;

const ItemTotal = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  width: 60px;
  height: 25px;
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms ease;

  :hover {
    transform: scale(0.95);
    background-color: var(--color-point-pink);
    color: var(--color-main-white);
  }
`;

export default CartEditForm;
