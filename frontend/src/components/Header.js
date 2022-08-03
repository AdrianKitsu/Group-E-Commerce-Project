import { IoCartOutline, IoStorefront, IoSearch, IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      {/* Homepage */}
      <Logo>
        <Linkss to={"/"}>
          <IoStorefront size={50} />
        </Linkss>
      </Logo>
      {/* search icon with search bar */}
      <SearchContainer>
        <SearchIcon>
          <IoSearch size={20} />
        </SearchIcon>
        <SearchBar placeholder="This is Just Decoration"></SearchBar>
      </SearchContainer>
      {/* current cart */}
      <Cart>
        <LinkCart to={"/cart"}>
          <IoCartOutline size={30} />
        </LinkCart>
      </Cart>
      {/* past history */}
      <Order>
        <LinkOrder to={"/order"}>
          <IoCart size={20} />
          <Span>Order History</Span>
        </LinkOrder>
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

const LinkOrder = styled(Link)`
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
  margin-left: auto;
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
  max-width: 500px;
  width: auto;
  margin-top: 10px;
  border-radius: 10px;
  border-style: none;
  margin-left: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  vertical-align: middle;
  align-items: center;
  margin-left: auto;
`;

const Order = styled.div`
  margin-top: 17px;
  margin-right: 6px;
  margin-left: 14px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const Span = styled.span`
  font-size: 11px;
  font-family: var(--font-poppins);
`;
