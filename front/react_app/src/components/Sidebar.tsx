import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: #eff3f4;
  flex: 1;
  min-height: 100vh;
  div {
    margin: 25px;
  }
  p {
    margin: 10px auto;
    padding: 8px;
    border-radius: 5px;
    &:hover {
      background-color: #cacaca;
      transition: all 0.4s;
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <div>
        <p>kat</p>
        <Link to="/">
          <p>作成したサイクル</p>
        </Link>
        <p>お気に入り</p>
        <Link to="/trash">
          <p>消去したサイクル</p>
        </Link>
        <p>サインアウト</p>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
