import styled from "styled-components";
import Layout from "./components/layout/Layout";

const Title = styled.h1`
  font-weight: 100;
  color: red;
`;

const Title2 = styled(Title)`
  color: blue;
`;

function App() {
  return (
    <div>
      <Layout>
        <Title>Hello</Title>
        <Title2>Hello</Title2>
      </Layout>
    </div>
  );
}

export default App;
