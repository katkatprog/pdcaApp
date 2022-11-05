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
        <Title2>Home1</Title2>
        <Title2>Home2</Title2>
        <Title2>Home3</Title2>
        <Title2>Home4</Title2>
        <Title2>Home5</Title2>
      </Layout>
    </>
  );
};

export default Home;
