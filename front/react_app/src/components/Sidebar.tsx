import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowsSpin,
  faCircleUser,
  faHeart,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const StyledSidebar = styled.aside`
  background-color: #eff3f4;
  flex: 1;
  min-height: 100vh;
  padding-top: 25px;
  user-select: none;
  p {
    margin: 0 25px 0 25px;
    border-radius: 5px;
    padding: 10px;
    &:hover {
      background-color: #cacaca;
      transition: all 0.4s;
    }
  }
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  padding-right: 10px;
  font-size: 1.4rem;
`;
const StyledFavorites = styled.div`
  margin-left: 25px;
`;

const Sidebar = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const favoriteClickHandler = () => {
    setShowFavorites(!showFavorites);
  };
  return (
    <StyledSidebar>
      <p>
        <StyledFontAwesomeIcon icon={faCircleUser} />
        kat
      </p>
      <Link to="/">
        <p>
          <StyledFontAwesomeIcon icon={faArrowsSpin} />
          作成したサイクル
        </p>
      </Link>
      <p onClick={favoriteClickHandler}>
        <StyledFontAwesomeIcon icon={faHeart} />
        <span style={{ marginRight: "10px" }}>お気に入り</span>
        {showFavorites ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </p>
      {showFavorites && (
        <StyledFavorites>
          <Link to="/2">
            <p>
              <StyledFontAwesomeIcon icon={faArrowsSpin} />
              お気に入り1
            </p>
          </Link>
          <Link to="/4">
            <p>
              <StyledFontAwesomeIcon icon={faArrowsSpin} />
              お気に入り2
            </p>
          </Link>
        </StyledFavorites>
      )}
      <Link to="/trash">
        <p>
          <StyledFontAwesomeIcon icon={faTrash} />
          消去したサイクル
        </p>
      </Link>
      <p>
        <StyledFontAwesomeIcon icon={faRightFromBracket} />
        サインアウト
      </p>
    </StyledSidebar>
  );
};

export default Sidebar;
