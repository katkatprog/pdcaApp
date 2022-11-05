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

const Footer = () => {
  return (
    <>
      <StyledFooter>@katkatprog</StyledFooter>
    </>
  );
};

export default Footer;
