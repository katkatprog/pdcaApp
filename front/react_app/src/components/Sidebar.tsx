import React, { useState } from "react";
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

const Sidebar = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const favoriteClickHandler = () => {
    setShowFavorites(!showFavorites);
  };
  return (
    <aside className="w-1/5 bg-slate-100 min-h-screen pt-6 select-none">
      <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
        <FontAwesomeIcon icon={faCircleUser} className="pr-3 text-2xl" />
        kat
      </p>
      <Link to="/">
        <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
          <FontAwesomeIcon icon={faArrowsSpin} className="pr-3 text-2xl" />
          作成したサイクル
        </p>
      </Link>
      <p
        onClick={favoriteClickHandler}
        className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400"
      >
        <FontAwesomeIcon icon={faHeart} className="pr-3 text-2xl" />
        <span style={{ marginRight: "10px" }}>お気に入り</span>
        {showFavorites ? (
          <FontAwesomeIcon icon={faAngleUp} className="pr-3 text-2xl" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} className="pr-3 text-2xl" />
        )}
      </p>
      {showFavorites && (
        <div className="ml-6">
          <Link to="/2">
            <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
              <FontAwesomeIcon icon={faArrowsSpin} className="text-2xl" />
              お気に入り1
            </p>
          </Link>
          <Link to="/4">
            <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
              <FontAwesomeIcon icon={faArrowsSpin} className="text-2xl" />
              お気に入り2
            </p>
          </Link>
        </div>
      )}
      <Link to="/trash">
        <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
          <FontAwesomeIcon icon={faTrash} className="pr-3 text-2xl" />
          消去したサイクル
        </p>
      </Link>
      <p className="my-0 mx-6 p-2 rounded-md hover:bg-slate-300 transition duration-400">
        <FontAwesomeIcon icon={faRightFromBracket} className="pr-3 text-2xl" />
        サインアウト
      </p>
    </aside>
  );
};

export default Sidebar;
