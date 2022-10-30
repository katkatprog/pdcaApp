import styled from "styled-components";

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
      <Title>Hello</Title>
      <Title2>Hello</Title2>
    </div>
  );
}

export default App;
