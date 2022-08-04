import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  // sets the param to identify the category
  const { category } = useParams();
  const [categories, setCategories] = useState();
  const [status, setStatus] = useState("loading");
  console.log(category);

  useEffect(() => {
    fetch(`/api/items/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        // setCategories basically grabs all items in the same cat
        setCategories(data.data);
        setStatus("idle");
      });
  }, [category]);

  if (status === "loading") {
    return (
      <LoadPage>
        <CircularProgress size={"100px"} />
      </LoadPage>
    );
  }

  return (
    <>
      <Container>
        <Div>
          {/* //mapping through array of data */}
          {categories.map((theCategory) => {
            return (
              <Item>
                {/* redirects you to another page that has all items accordig to category */}
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "max-content",
                    hover: { cursor: "pointer" },
                  }}
                  // where you are being redirected to
                  to={`/item/${theCategory._id}`}
                >
                  <Img
                    // key will return an individual key for every item
                    key={theCategory}
                    // src will grab all images of all the items
                    src={theCategory.imageSrc}
                    alt={theCategory.name}
                  />
                  {/* // gets the name of all items to be displayed below img  */}
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
  background-color: var(--color-main-brown);
  padding-top: 14px;
  padding-bottom: 14px;
`;

const Div = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 250px 250px 250px 250px;
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
  transition: transform 250ms, box-shadow 0.25s ease-in-out;
  :hover {
    transform: translateY(-7px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
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

const LoadPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-main-blue);
  background-color: var(--color-main-brown);
`;
