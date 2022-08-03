import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState();
  const [status, setStatus] = useState("loading");
  console.log(category);

  useEffect(() => {
    fetch(`/api/items/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data.data);
        setStatus("idle");
      });
  }, [category]);

  if (status === "loading") {
    return <>Loading</>;
  }

  return (
    <>
      <Container>
        <Div>
          {categories.map((theCategory) => {
            return (
              <Item>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "max-content",
                    hover: { cursor: "pointer" },
                  }}
                  to={`/item/${theCategory._id}`}
                >
                  <Img
                    key={theCategory}
                    src={theCategory.imageSrc}
                    alt={theCategory.name}
                  />
                  <Name>{theCategory.name}</Name>
                </NavLink>
              </Item>
            );
          })}
        </Div>
      </Container>
    </>
  );
};

export default Category;

const Container = styled.div`
  background-color: #ded7b1;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const Div = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 250px 250px 250px;
  row-gap: 20px;
  grid-gap: 20px;
  margin-top: 20px;
`;

const Item = styled.div`
  max-width: 250px;
  max-height: fit-content;
  width: auto;
  height: auto;
  border-radius: 8px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
`;

const Img = styled.img`
  display: flex;
  align-items: center;
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 8px;
  margin: 30px;
  margin-bottom: 3px;
`;

const Name = styled.p`
  font-family: var(--font-poppins);
  font-weight: bold;
  text-align: center;
  text-size-adjust: auto;
  max-width: 250px;
`;
