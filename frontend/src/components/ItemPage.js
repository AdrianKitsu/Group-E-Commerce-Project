import { useEffect } from "react";
import { useNavigate, useParams, userNavigate } from "react-router-dom";
import styled from "styled-components";
import items from "../data/items.json";
import companies from "../data/companies.json";

const ItemPage = () => {
  const { itemId } = useParams();

//until I get the access to the endpoint, I am using local backend data
  const item = items.find((item) => item._id === 6543);
  const company = companies.find((com) => com._id === item?.companyId);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/cart", { state: item });
  };
  
  return (
    <Wrapper>
      <Detail>
        <Img src={item.imageSrc} alt={item.name} />
        <Description>
          <Name>{item.name}</Name>
          <Price>{item.price}</Price>
          <Category>{item.category}</Category>
          <Stock>
            <Span>stock: </Span>
            {item.numInStock}
          </Stock>
          <Company>
            {company.name}, {company.country}
          </Company>
          <CompanyURL>{company.url}</CompanyURL>
        </Description>
      </Detail>
      <PurchaseBox>
        <Buy>To buy, </Buy>
        <AddButton
          disabled={item?.numInStock > 0 ? false : true}
          onClick={handleAdd}
        >
          Add to Cart
        </AddButton>
      </PurchaseBox>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  padding: 30px;
  justify-content: space-between;
  border: 1px solid black;
`;

const Detail = styled.div`
  background-color: #a5becc;
  width: 65%;
  height: 360px;
  margin-left: 20px;
  padding: 20px;
  display: flex;
`;
const Img = styled.img`
  display: block;
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 8px;
`;

const Description = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0;
`;
const Price = styled.p`
  font-style: italic;
`;
const Category = styled.p``;

const Stock = styled.p``;
const Span = styled.span`
  font-weight: 600;
`;
const Company = styled.p``;
const CompanyURL = styled.a`
  color: #7c3e66;
`;
const PurchaseBox = styled.div`
  width: 15%;
  height: 80px;
  border: 1px solid grey;
  margin: 200px 20px 0 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AddButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 14px;
  background-color: #243a73;
  color: white;
  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
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
    background-color: #243a73;
  }
`;
const Buy = styled.span`
  margin-bottom: 5px;
`;
export default ItemPage;


