import {
  faArrowsSpin,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { CycleIfc } from "../interfaces/cycle.interface";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #eff3f4;
  h1 {
    font-size: 1.2rem;
    margin: 12px 0 12px 20px;
  }
`;

const StyledHeaderRight = styled.div`
  display: flex;
  margin-right: 20px;
`;

const StyledSearchForm = styled.form`
  input {
    margin-top: 8px;
    padding: 10px 30px 10px 10px;
    border-radius: 5px;
    background-color: #eff3f4;
    width: 20vw;
    border: none;
    outline: none;
  }
`;

const StyledMagnifyingGlass = styled(FontAwesomeIcon)`
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

const StyledContainer = styled.div`
  margin-top: 10px;
`;

const StyledCard = styled.div`
  display: flex;
  /* padding-top: 15px; */
  height: 70px;
  margin-bottom: 10px;
  &:hover {
    margin-left: 15px;
    transition: all 0.4s;
    cursor: pointer;
  }
  h2 {
    flex: 9;
    font-size: 1.1rem;
    border-bottom: 1px solid #eff3f4;
    margin: 0;
  }
`;

const StyledArrowsSpin = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 50px;
  align-items: center;
  color: #0057d8;
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
              <StyledMagnifyingGlass icon={faMagnifyingGlass} />
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
        <StyledContainer>
          {cycles.map((ele) => (
            <Link key={ele.id} to={`/${ele.id}`}>
              <StyledCard>
                <StyledArrowsSpin icon={faArrowsSpin} />
                <h2>{ele.name}</h2>
              </StyledCard>
            </Link>
          ))}
        </StyledContainer>
      </Layout>
    </>
  );
};

export default Home;
