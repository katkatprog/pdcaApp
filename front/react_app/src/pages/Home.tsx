import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const Title = styled.h1`
  font-weight: 100;
  color: red;
`;

const Title2 = styled(Title)`
  color: blue;
`;
const Home = () => {
  return (
    <>
      <Layout>
        <Title>Home</Title>
        <Title2>Home</Title2>
      </Layout>
    </>
  );
};

export default Home;
