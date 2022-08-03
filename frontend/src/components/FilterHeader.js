import styled from "styled-components";
import { Link } from "react-router-dom";

const FilterHeader = () => {
  return (
    <Header>
      <Filter>
        <div style={{ marginRight: "10px", fontSize: "15px" }}>Filters:</div>
        <Grid>
          <LinkFit to={`/items/category/Fitness`}>
            <ul>Fitness</ul>
          </LinkFit>

          <LinkLife to={`/items/category/Lifestyle`}>
            <ul>Lifestyle</ul>
          </LinkLife>

          <LinkMed to={`/items/category/Medical`}>
            <ul>Medical</ul>
          </LinkMed>

          <LinkGame to={`/items/category/Gaming`}>
            <ul>Gaming</ul>
          </LinkGame>

          <LinkEnt to={`/items/category/Entertainment`}>
            <ul>Entertainment</ul>
          </LinkEnt>

          <LinkPets to={`/items/category/Pets%20and%20Animals`}>
            <ul>Pets and Animals</ul>
          </LinkPets>
        </Grid>
      </Filter>
    </Header>
  );
};

export default FilterHeader;

const Header = styled.div`
  height: fit-content;
  padding: 5px;
  background-color: var(--color-filter-background);
`;

const Filter = styled.div`
  font-family: var(--font-poppins);
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const LinkFit = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const LinkLife = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const LinkMed = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const LinkGame = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const LinkEnt = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const LinkPets = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px;
  column-gap: 30px;
  row-gap: 10px;
`;
