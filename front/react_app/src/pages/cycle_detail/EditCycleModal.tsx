import { Cycle } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ModalOverlay } from "../../components/ModalOverlay";
import { Toggle } from "../../components/Toggle";

interface PropsIfc {
  cycle: Cycle;
  setCycle: React.Dispatch<React.SetStateAction<Cycle>>;
  setShowEditCycleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCycleModal = (props: PropsIfc) => {
  const params = useParams<{ cycleId: string }>();

  const [cycleName, setCycleName] = useState(props.cycle.name);
  const [goal, setGoal] = useState(props.cycle.goal);
  const [about, setAbout] = useState(props.cycle.about);
  const [watchFromAnyone, setWatchFromAnyone] = useState(
    props.cycle.watchFromAnyone,
  );
  const [suspend, setSuspend] = useState(props.cycle.suspend);

  const closeModalAction = () => {
    props.setShowEditCycleModal(false);
  };

  const saveCycleAction = async () => {
    // サイクルのupdateをしつつ、結果(updateされたサイクル)を変数resultに代入
    const result: Cycle = await (
      await axios.put(`/api/cycles/update/${params.cycleId}/${1}`, {
        name: cycleName,
        goal: goal,
        about: about,
        watchFromAnyone: watchFromAnyone,
        suspend: suspend,
      })
    ).data;
    // DBへの反映に成功した(resultが存在している)ならば、画面側への反映も行う
    if (result) {
      props.setCycle(result);
      closeModalAction();
    } else {
      alert("サイクルの変更を正しく行えませんでした");
    }
  };

  return (
    <>
      <ModalOverlay modalWidth="w-1/2" closeModalAction={closeModalAction}>
        <div className="px-12 py-12 flex flex-col justify-center items-center ">
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
              value={about || ""}
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
              onClick={saveCycleAction}
            >
              保存する
            </button>
            <button
              onClick={closeModalAction}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-3"
            >
              キャンセル
            </button>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};
