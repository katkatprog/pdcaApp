import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";

interface MainProps {
  children: React.ReactNode;
}

const StyledLayout = styled.div`
  display: flex;
`;

const Layout = (props: MainProps) => {
  return (
    <>
      <StyledLayout>
        <Sidebar></Sidebar>
        <main className="w-4/5">{props.children}</main>
      </StyledLayout>
    </>
  );
};

export default Layout;
