import styled from "styled-components";
import { useState } from "react";

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
        <Inputfield>
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
        </Inputfield>
        <UpdateButton onClick={handleUpdateQuantity}>Update</UpdateButton>
      </Form>
      <ItemTotal>Total price: $ {totalPrice.toFixed(2)} </ItemTotal>
      <DeleteButton onClick={delelteItem}>Delete</DeleteButton>
    </Edit>
  );
};

const Edit = styled.div`
  /* border: 1px solid red; */
  width: 30%;
  margin-left: 15px;
  padding: 2% 1%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: var(--font-roboto);

  @media (max-width: 768px) {
    padding: 10% 1%;
  }
  @media (max-width: 425px) {
    width: 100%;
    margin-left: 0;
    margin-top: 2%;
    padding: 1%;
    align-items: center;
  }
`;
const Form = styled.form`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;

const Inputfield = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.label`
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const Input = styled.input`
  margin-left: 5px;
  @media (max-width: 768px) {
    width: 45%;
  }
`;
const UpdateButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  width: 60px;
  height: 25px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    transform: scale(0.95);
    background-color: var(--color-point-pink);
    color: var(--color-main-white);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
  @media (max-width: 425px) {
    margin: 10px;
    width: 50px;
    height: 20px;
    font-size: 12px;
    border-radius: 4px;
  }
`;

const ItemTotal = styled.div`
  font-size: 15px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 13px;
  }
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
  @media (max-width: 425px) {
    width: 50px;
    height: 20px;
    font-size: 12px;
    border-radius: 4px;
  }
`;

export default CartEditForm;
