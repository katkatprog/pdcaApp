import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { CycleIfc } from "../../utils/cycle.interface";

const Cycle = () => {
  const params = useParams<{ cycleId: string }>();
  const [cycle, setCycle] = useState<CycleIfc>({
    id: 0,
    name: "",
    about: "",
    goal: "",
    userId: 0,
    favorite: false,
    watchFromAnyone: false,
    erased: false,
    suspend: false,
  });
  const [mode, setMode] = useState<string>("about");

  useEffect(() => {
    (async () => {
      const data = await (
        await axios.get(`/api/cycles/${params.cycleId}/${1}`)
      ).data;
      setCycle(data);
    })();
  }, []);
  return (
    <>
      <Layout>
        <header className="flex h-20 items-center px-5 border-b border-slate-200">
          <div className="w-2/3 ">
            <h1 className="text-xl">{cycle.name}</h1>
          </div>
          <div className="w-1/3 border-l border-l-slate-200 h-20 flex items-center">
            <h1 className="pl-5">{mode}</h1>
          </div>
        </header>
        <main className="flex px-5">
          <article className="w-2/3">
            <div>
              <h1>Plan</h1>
            </div>
            <div>
              <h1>Do</h1>
            </div>
            <div>
              <h1>Check</h1>
            </div>
            <div>
              <h1>Action</h1>
            </div>
          </article>
          <aside className="w-1/3 p-5 border-l border-l-slate-200">
            <h1 className="text-xl">目標</h1>
            <p className="pl-3">{cycle.goal}</p>

            <h1 className="text-xl pt-3">概要</h1>
            <p className="pl-3">{cycle.about}</p>

            <h1 className="text-xl pt-3">サイクル公開</h1>
            {cycle.watchFromAnyone ? (
              <FontAwesomeIcon
                icon={faToggleOn}
                className="pl-3 text-3xl cursor-pointer"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faToggleOff}
                className="pl-3 text-3xl cursor-pointer"
              ></FontAwesomeIcon>
            )}

            <h1 className="text-xl pt-3">保留にする</h1>
            {cycle.suspend ? (
              <FontAwesomeIcon
                icon={faToggleOn}
                className="pl-3 text-3xl cursor-pointer"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faToggleOff}
                className="pl-3 text-3xl cursor-pointer"
              ></FontAwesomeIcon>
            )}
          </aside>
        </main>
      </Layout>
    </>
  );
};

export default Cycle;
