import { IoCartOutline, IoStorefront, IoSearch, IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        <Linkss to={"/"}>
          <IoStorefront size={50} />
        </Linkss>
      </Logo>

      <SearchContainer>
        <SearchIcon>
          <IoSearch size={20} />
        </SearchIcon>
        <SearchBar placeholder="This is Just Decoration"></SearchBar>
      </SearchContainer>

      <Cart>
        <LinkCart to={"/cart"}>
          <IoCartOutline size={30} />
        </LinkCart>
      </Cart>
      <Order>
        <LinkCart to={"/order"}>
          <IoCart size={20} />
          <Span>Orders</Span>
        </LinkCart>
      </Order>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  padding: 14px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-main-blue);
`;

const Logo = styled.div`
  color: var(--color-main-white);
  margin-left: 10px;
`;

const Linkss = styled(Link)`
  text-decoration: none;
  color: var(--color-main-white);
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const LinkCart = styled(Link)`
  text-decoration: none;
  color: var(--color-main-white);
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const Cart = styled.div`
  color: var(--color-main-white);
  margin-top: 10px;
  margin-right: -120px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const SearchIcon = styled.div`
  color: var(--color-main-white);
  margin-top: 15px;
`;

const SearchBar = styled.input`
  height: 30px;
  width: 500px;
  margin-top: 10px;
  border-radius: 10px;
  border-style: none;
  margin-left: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  vertical-align: middle;
`;

const Order = styled.div`
  margin-top: 17px;
  margin-right: 6px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const Span = styled.span`
  font-size: 11px;
  font-family: var(--font-poppins);
  padding: 2px;
`;
