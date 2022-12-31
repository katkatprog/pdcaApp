import React, { useEffect, useState } from "react";
import { CycleIfc } from "../../utils/cycle.interface";

interface PropsIfc {
  setShowEditCycleModal: React.Dispatch<React.SetStateAction<boolean>>;
  cycle: CycleIfc;
}

const EditCycleModal = (props: PropsIfc) => {
  const [cycleName, setCycleName] = useState("");
  const [goal, setGoal] = useState("");
  const [about, setAbout] = useState("");
  const [watchFromAnyone, setWatchFromAnyone] = useState(false);
  const [suspend, setSuspend] = useState(false);

  useEffect(() => {
    setCycleName(props.cycle.name);
    setGoal(props.cycle.goal);
    setAbout(props.cycle.about || "");
    setWatchFromAnyone(props.cycle.watchFromAnyone);
    setSuspend(props.cycle.suspend);
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
            <p className="my-2">保留にする</p>
          </div>
          <div className="flex w-full justify-end">
            <button
              className="text-white bg-blue-500 text-lg px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => {
                console.log("save");
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
