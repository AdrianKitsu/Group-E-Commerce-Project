import { IoCartOutline, IoStorefront, IoSearch } from "react-icons/io5";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        <IoStorefront size={50} />
      </Logo>
      <SearchContainer>
        <SearchIcon>
          <IoSearch size={20} />
        </SearchIcon>

        <SearchBar></SearchBar>
      </SearchContainer>
      <Cart>
        <IoCartOutline size={30} />
      </Cart>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  padding: 14px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-left: -8px;
  margin-top: -8px;
  background-color: var(--color-main-blue);
`;

const Logo = styled.div`
  color: var(--color-main-white);
  margin-left: 10px;
`;

const Cart = styled.div`
  color: var(--color-main-white);
  margin-top: 10px;
  margin-right: 20px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const SearchBar = styled.input`
  height: 30px;
  width: 500px;
  margin-top: 10px;
  border-radius: 10px;
  border-style: none;
  margin-left: 10px;
`;

const SearchContainer = styled.div``;

const SearchIcon = styled.span`
  color: var(--color-main-white);
`;
