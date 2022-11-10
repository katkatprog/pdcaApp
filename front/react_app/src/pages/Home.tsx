import {
  faArrowsSpin,
  faCircleNotch,
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
  height: 80px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 2px solid #eff3f4;
  h1 {
    font-size: 1.2rem;
  }
`;

const StyledHeaderRight = styled.div`
  display: flex;
`;

const StyledSearchForm = styled.form`
  input {
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

const StyledCard = styled.div`
  display: flex;
  /* padding-top: 15px; */
  height: 80px;
  &:hover {
    /* margin-left: 15px; */
    background-color: #cacaca;
    transition: all 0.4s;
    cursor: pointer;
  }
  h2 {
    font-size: 1.1rem;
    margin: 0;
  }
`;

const StyledCardLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCardRight = styled.div`
  flex: 9;
  padding-top: 10px;
  border-bottom: 1px solid #eff3f4;
`;
const StyledArrowsSpin = styled(FontAwesomeIcon)`
  font-size: 50px;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/cycles?userId=1");
      setCycles(response.data);
      setIsLoading(false);
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
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{ fontSize: "50px" }}
            />
          </div>
        ) : (
          cycles.map((ele) => (
            <Link key={ele.id} to={`/${ele.id}`}>
              <StyledCard>
                <StyledCardLeft>
                  <StyledArrowsSpin icon={faArrowsSpin} />
                </StyledCardLeft>
                <StyledCardRight>
                  <h2>{ele.name}</h2>
                </StyledCardRight>
              </StyledCard>
            </Link>
          ))
        )}
      </Layout>
    </>
  );
};

export default Home;
