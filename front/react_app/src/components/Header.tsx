import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  height: 7vh;
  align-items: center;
  background-color: #0bd;
  color: #f2f2f2;
  font-size: 1.1rem;

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

// StyledHeaderを固定させるためのダミー。StyledHeaderの下に配置させる。
const StyledHeaderDummy = styled.div`
  height: 7vh;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <h1>PDCA App</h1>
      </StyledHeader>
      <StyledHeaderDummy></StyledHeaderDummy>
    </>
  );
};

export default Header;
