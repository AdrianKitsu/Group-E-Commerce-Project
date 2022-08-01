import styled from "styled-components";
import { useState } from 'react';

const CartEditForm = ({ item }) => {
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);

    const updateQuantity = (ev) => {
    ev.preventDefault();
    console.log("func" );
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
            setEditedQuantity(ev.target.value);
          }}
        />
        <InputButton onClick={updateQuantity}>Update</InputButton>
      </Form>
      <ItemTotal>Total price: </ItemTotal>
      <Delete>Delete</Delete>
    </Edit>
  );
};

const Edit = styled.li`
  width: 30%;
  margin-left: 1%;
  height: 250px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 30px;
`;
const Form = styled.form`
  font-size: 15px;
`;
const Label = styled.label``;
const Input = styled.input`
  margin-left: 10px;
`;
const InputButton = styled.button`
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
  }
`;

const ItemTotal = styled.div`
  font-size: 15px;
`;

const Delete = styled.button`
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
  }
`;

export default CartEditForm;
