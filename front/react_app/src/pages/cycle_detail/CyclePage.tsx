import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cycle } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import AboutCycle from "./AboutCycle";
import PlanSidebar from "./plan/PlanSidebar";

const CyclePage = () => {
  const params = useParams<{ cycleId: string }>();
  const [cycle, setCycle] = useState<Cycle>();
  const [mode, setMode] = useState<string>("about");
  const [latestRound, setLatestRound] = useState<number>(0);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [roundArray, setRoundArray] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCycle: Cycle = await (
        await axios.get(`/api/cycles/${params.cycleId}/${1}`)
      ).data;

      setCycle(fetchedCycle);
      const fetchedRound: number = await (
        await axios.get(`/api/plans/latest-round/${params.cycleId}`)
      ).data;
      setLatestRound(fetchedRound);
      setSelectedRound(fetchedRound);

      // 最新のroundまでが入った整数の配列(ページネーションに使用)
      updateRoundArray(fetchedRound, fetchedRound);
    })();
  }, []);

  // ページ番号が格納された配列を作る関数(ページネーションに使用)
  const updateRoundArray = (selectedRound: number, latestRound: number) => {
    const numberOfShowRounds = 5; //ページネーションで画面表示させるラウンド数
    const tmpRoundArray: number[] = []; //表示させるラウンドを格納する配列
    if (latestRound < numberOfShowRounds) {
      // ページ数が少ない場合
      for (let i = 1; i <= latestRound; i++) {
        tmpRoundArray.push(i);
      }
    } else {
      // ページ数が多い場合 → numOfShowRoundsのページ数に留める
      const halfOfShowRounds = Math.floor(numberOfShowRounds / 2); //ページネーションで表示させるラウンド数の半分

      if (selectedRound <= halfOfShowRounds) {
        for (let i = 1; i <= numberOfShowRounds; i++) {
          tmpRoundArray.push(i);
        }
      } else if (selectedRound > latestRound - halfOfShowRounds) {
        for (let i = latestRound; i > latestRound - numberOfShowRounds; i--) {
          tmpRoundArray.push(i);
        }
      } else {
        tmpRoundArray.push(selectedRound);
        for (let i = 1; i <= halfOfShowRounds; i++) {
          tmpRoundArray.push(selectedRound + i);
          tmpRoundArray.push(selectedRound - i);
        }
      }
    }

    tmpRoundArray.sort((a, b) => a - b);
    setRoundArray(tmpRoundArray);
  };

  return (
    <>
      {cycle ? (
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
              <div
                onClick={() => {
                  setMode("Plan");
                }}
              >
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
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-3xl"
                ></FontAwesomeIcon>
                {roundArray.map((round) => (
                  <span
                    className={`p-2 rounded-md text-slate-50 mx-1 select-none ${
                      round === selectedRound
                        ? "bg-gray-600"
                        : "bg-gray-400 cursor-pointer"
                    }`}
                    key={round}
                    onClick={() => {
                      setSelectedRound(round);
                      updateRoundArray(round, latestRound);
                      setMode("about");
                    }}
                  >
                    {round}
                  </span>
                ))}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-3xl"
                ></FontAwesomeIcon>
              </div>
            </article>
            {mode === "about" && (
              <AboutCycle
                cycle={cycle}
                setCycle={
                  setCycle as React.Dispatch<React.SetStateAction<Cycle>>
                }
              ></AboutCycle>
            )}
            {mode === "Plan" && (
              <PlanSidebar
                round={selectedRound}
                cycleId={Number(params.cycleId) | 0}
              ></PlanSidebar>
            )}
          </main>
        </Layout>
      ) : (
        <h1>no cycle</h1>
      )}
    </>
  );
};

export default CyclePage;
