import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toggle from "../../components/Toggle";
import { setCycle } from "../../redux/cycleSlice";
import { RootState } from "../../redux/store";
import { EditCycleIfc } from "../../utils/interface";

interface PropsIfc {
  setShowEditCycleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCycleModal = (props: PropsIfc) => {
  const cycle = useSelector((state: RootState) => state.cycle.value);
  const params = useParams<{ cycleId: string }>();
  const dispatch = useDispatch();

  const [cycleName, setCycleName] = useState("");
  const [goal, setGoal] = useState("");
  const [about, setAbout] = useState("");
  const [watchFromAnyone, setWatchFromAnyone] = useState(false);
  const [suspend, setSuspend] = useState(false);

  useEffect(() => {
    setCycleName(cycle.name);
    setGoal(cycle.goal);
    setAbout(cycle.about || "");
    setWatchFromAnyone(cycle.watchFromAnyone);
    setSuspend(cycle.suspend);
  }, []);

  return (
    <>
      <div
        onClick={() => props.setShowEditCycleModal(false)}
        className="bg-black/[.3] h-full w-full fixed inset-0 flex items-center justify-center z-10"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-slate-50 px-8 py-8 flex flex-col justify-center items-center rounded-lg w-3/6"
        >
          <div className="w-full">
            <h1 className="text-xl">サイクルの編集</h1>
            <p className="my-2">サイクル名</p>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-slate-200 border-none outline-none"
              value={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
              required
            />
            <p className="my-2">目標</p>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-slate-200 border-none outline-none"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
            <p className="my-2">概要</p>
            <textarea
              className="w-full p-2 rounded-md bg-slate-200 border-none outline-none resize-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <p className="my-2">サイクル公開</p>
            <Toggle
              state={watchFromAnyone}
              setState={setWatchFromAnyone}
            ></Toggle>
            <p className="my-2">保留にする</p>
            <Toggle state={suspend} setState={setSuspend}></Toggle>
          </div>
          <div className="flex w-full justify-end">
            <button
              className="text-white bg-blue-500 text-lg px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={async () => {
                await axios.put<EditCycleIfc>(
                  `/api/cycles/update/${params.cycleId}/${1}`,
                  {
                    name: cycleName,
                    goal: goal,
                    about: about,
                    watchFromAnyone: watchFromAnyone,
                    suspend: suspend,
                  },
                );
                dispatch(
                  setCycle({
                    name: cycleName,
                    goal: goal,
                    about: about,
                    watchFromAnyone: watchFromAnyone,
                    suspend: suspend,
                  }),
                );
                props.setShowEditCycleModal(false);
              }}
            >
              保存する
            </button>
            <button
              onClick={() => props.setShowEditCycleModal(false)}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-3"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCycleModal;
