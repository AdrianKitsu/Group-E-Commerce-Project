import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoRefresh } from "react-icons/io5";
import { SearchBarContext } from "../contexts/searchBarContext";

const HomePage = () => {
  const [items, setItems] = useState();
  const [status, setStatus] = useState("loading");

  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(SearchBarContext);

  // get all items
  useEffect(() => {
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setItems(data.data);
        setStatus("idle");
      });
  }, []);

  if (status === "loading") {
    return (
      <LoadPage>
        <Icon>
          <IoRefresh size={"80px"} />
        </Icon>
      </LoadPage>
    );
  }

  // create a filteredItem variable that will hold the items filtered based on search
  const filteredItems = items.results.filter((item) => {
    if (item.name.toLowerCase().includes(search)) {
      return item;
    }
  });

  return (
    <>
      <Container>
        <Wrapper>
          {
            //if the filteredItems array has no items tell the user
            filteredItems.length === 0 ? (
              <Oops>looks like nothing matches your search...</Oops>
            ) : (
              //display items based on what is serached in search bar will show everything if nothing is typed
              filteredItems.map((theItems) => {
                return (
                  <Item>
                    <Linkw to={`item/${theItems._id}`}>
                      <Img
                        key={theItems}
                        src={theItems.imageSrc}
                        alt={theItems.name}
                      />
                      <Name>{theItems.name}</Name>
                    </Linkw>
                  </Item>
                );
              })
            )
          }
        </Wrapper>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: var(--color-main-brown);
  padding-top: 14px;
  padding-bottom: 14px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
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

const Linkw = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
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

const Oops = styled.div`
  font-family: var(--font-poppins);
  width: 100vw;
`;
