import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";

interface MainProps {
  children: React.ReactNode;
}

const StyledMain = styled.main`
  text-align: center;
`;

const Layout = (props: MainProps) => {
  return (
    <>
      <Header></Header>
      <StyledMain>{props.children}</StyledMain>
      <Footer></Footer>
    </>
  );
};

export default Layout;
