import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";

interface MainProps {
  children: React.ReactNode;
}

const StyledMain = styled.main`
  flex: 4;
`;

const StyledLayout = styled.div`
  display: flex;
`;

const Layout = (props: MainProps) => {
  return (
    <>
      <StyledLayout>
        <Sidebar></Sidebar>
        <StyledMain>{props.children}</StyledMain>
      </StyledLayout>
    </>
  );
};

export default Layout;
