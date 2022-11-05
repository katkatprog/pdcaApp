import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  display: flex;
  height: 7vh;
  align-items: center;
  background-color: #0bd;
  color: #f2f2f2;
  font-size: 1.1rem;
  top: 0;

  /* ヘッダーを固定する */
  position: fixed;
  width: 100vw;
  z-index: 1;

  h1 {
    margin-left: 3vw;
    font-size: 1.7rem;
  }

  a {
    color: #f2f2f2;
  }
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Link to="/">
          <h1>PDCA App</h1>
        </Link>
      </StyledHeader>
    </>
  );
};

export default Header;
