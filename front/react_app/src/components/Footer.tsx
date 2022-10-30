import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  height: 5vh;
  justify-content: center;
  align-items: center;
  background-color: #0bd;
  color: white;
  font-size: 1.1rem;

  /* フッターを固定する */
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

// StyledFooterを固定させるためのダミー。StyledFooterの下に配置させる。
const StyledFooterDummy = styled.div`
  height: 5vh;
`;

const Footer = () => {
  return (
    <>
      <StyledFooterDummy></StyledFooterDummy>
      <StyledFooter>@katkatprog</StyledFooter>
    </>
  );
};

export default Footer;
