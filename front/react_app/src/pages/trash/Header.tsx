import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const searchHandler = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("search!");
};

export const Header = () => {
  return (
    <header className="flex justify-between h-20 items-center px-5 border-b border-slate-100">
      <h1 className="text-xl">消去したサイクル</h1>
      <div className="flex items-center">
        <form onSubmit={(e) => searchHandler(e)}>
          <input
            type="text"
            placeholder="検索"
            className="p-3 pr-8 rounded-md bg-slate-200 border-none outline-none"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="-ml-6" />
        </form>
      </div>
    </header>
  );
};
