import {
  faArrowsSpin,
  faCircleNotch,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { CycleIfc } from "../interfaces/cycle.interface";

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

  const MenuHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    console.log("Menu!");
    console.log(`CycleId: ${cycleId}`);
  };

  return (
    <>
      <Layout>
        <div className="flex justify-between h-20 items-center px-5 border-b border-slate-100">
          <h1 className="text-xl">作成したサイクル</h1>
          <div className="flex items-center">
            <form onSubmit={(e) => searchHandler(e)}>
              <input
                type="text"
                placeholder="検索"
                className="p-3 pr-8 rounded-md bg-slate-200 border-none outline-none"
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="-ml-6" />
            </form>
            <form>
              <input
                type="button"
                value="サイクルの作成"
                onClick={(e) => createHandler(e)}
                className="text-white bg-blue-600 ml-5 py-2 px-3 rounded-md border-none hover:cursor-pointer hover:bg-blue-700"
              />
            </form>
          </div>
        </div>
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
              <div className="flex h-20 transition duration-400 hover:bg-slate-300 hover:cursor-pointer">
                <div className="w-1/6 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faArrowsSpin}
                    className="text-5xl text-blue-600"
                  />
                </div>
                <div className="w-5/6 pt-2 border-b border-slate-100 flex justify-between">
                  <h2 className="text-lg">{ele.name}</h2>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="hover:bg-slate-200 px-3 py-2 mr-3 text-xl rounded"
                    onClick={(e) => MenuHandler(e, ele.id)}
                  />
                </div>
              </div>
            </Link>
          ))
        )}
      </Layout>
    </>
  );
};

export default Home;
