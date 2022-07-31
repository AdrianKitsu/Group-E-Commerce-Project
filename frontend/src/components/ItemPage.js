import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ItemPage = () => {
  const itemId = useParams().item;
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) setItem(data.data);
      });
  }, [itemId]);

  const handleAdd = () => {
    navigate("/cart", { state: item });
  };

  return (
    <Wrapper>
      <Detail>
        <Img src={item.imageSrc} alt={item.name} />
        <Description>
          <Name>{item.name}</Name>
          <Price>
            Price : <PriceSpan>{item.price}</PriceSpan>
          </Price>
          <Stock>
            Stock :<Span> {item.numInStock}</Span>
          </Stock>
          <Category>
            Category: <Span>{item.category}</Span>
          </Category>
          <Company>
            made by <Span>{item.companyId}</Span>
          </Company>
          <CompanyURL>company website: {item.companyId} </CompanyURL>
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
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #dddddd;
`;

const Detail = styled.div`
  background-color: var(--color-main-white);
  width: 70%;
  height: 350px;
  margin: 50px 20px;
  padding: 20px;
  display: flex;
  border-radius: 10px;
`;
const Img = styled.img`
  display: block;
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 8px;
  margin: 30px 10px;
`;

const Description = styled.div`
  margin: 20px 50px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0;
  border-bottom: 1px solid #7c3e66;
  padding-bottom: 8px;
`;
const Price = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const PriceSpan = styled.span`
  font-weight: 600;
  color: #7c3e66;
  font-size: 18px;
`;

const Stock = styled.p`
  margin: 5px 0;
`;

const Span = styled.span`
  color: #7c3e66;
  font-size: 15px;
  font-weight: 500;
`;
const Category = styled.p`
  margin: 10px 0;
`;

const Company = styled.p`
  margin-top: 30px;
`;
const CompanyURL = styled.a`
  margin-top: 15px;
  text-decoration: underline;
`;
const PurchaseBox = styled.div`
  width: 15%;
  height: 80px;
  border: 1px solid #7c3e66;
  margin: 350px 20px 0 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AddButton = styled.button`
  width: 80%;
  height: 40px;
  font-size: 14px;
  background-color: var(--color-main-blue);
  color: white;
  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
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
`;
const Buy = styled.span`
  margin-bottom: 5px;
`;
export default ItemPage;
