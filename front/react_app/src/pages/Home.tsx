import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { CycleIfc } from "../interfaces/cycle.interface";

const StyledHeader = styled.header`
  display: flex;
  border-bottom: solid #eff3f4;
  h1 {
    flex: 1;
    font-size: 1.2rem;
    margin: 12px 0 12px 20px;
  }
`;

const StyledHeaderRight = styled.div`
  flex: 1;
  display: flex;
`;

const StyledSearchForm = styled.form`
  input {
    margin-top: 10px;
    padding: 10px 30px 10px 10px;
    border-radius: 5px;
    background-color: #eff3f4;
    border: none;
    outline: none;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-left: -25px;
`;

const StyledCreateForm = styled.form`
  input {
    color: white;
    background-color: #0057d8;
    margin-top: 8px;
    margin-left: 20px;
    padding: 8px 10px;
    border-radius: 5px;
    border: none;
    &:hover {
      cursor: pointer;
      background-color: #0049b6;
    }
  }
`;

const searchHandler = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("search!");
};

const createHandler = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("create!");
};

const Home = () => {
  const [cycles, setCycles] = useState<CycleIfc[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/cycles?userId=1");
      setCycles(response.data);
    })();
  }, []);

  return (
    <>
      <Layout>
        <StyledHeader>
          <h1>作成したサイクル</h1>
          <StyledHeaderRight>
            <StyledSearchForm onSubmit={(e) => searchHandler(e)}>
              <input type="text" placeholder="検索" />
              <StyledFontAwesomeIcon icon={faMagnifyingGlass} />
            </StyledSearchForm>
            <StyledCreateForm>
              <input
                type="button"
                value="サイクルの作成"
                onClick={(e) => createHandler(e)}
              />
            </StyledCreateForm>
          </StyledHeaderRight>
        </StyledHeader>
        <ul>
          {cycles.map((ele) => (
            <li key={ele.id}>{ele.name}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default Home;
