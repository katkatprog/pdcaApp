import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { refreshCycle, setCycle } from "../../redux/cycleSlice";
import { RootState } from "../../redux/store";
import { EditCycleIfc } from "../../utils/cycle.interface";
import AboutCycle from "./AboutCycle";

const Cycle = () => {
  const params = useParams<{ cycleId: string }>();
  const cycle = useSelector((state: RootState) => state.cycle.value);
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string>("about");

  useEffect(() => {
    (async () => {
      const data: EditCycleIfc = await (
        await axios.get(`/api/cycles/${params.cycleId}/${1}`)
      ).data;
      dispatch(setCycle(data));
    })();

    return () => {
      dispatch(refreshCycle());
    };
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
          {mode === "about" && <AboutCycle></AboutCycle>}
        </main>
      </Layout>
    </>
  );
};

export default Cycle;
