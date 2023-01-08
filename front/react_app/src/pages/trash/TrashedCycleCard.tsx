import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import { hideMenu } from "../../redux/menuSlice";
import { Cycle } from "@prisma/client";
import { DeleteCycleModal } from "./DeleteCycleModal";
import { CycleCardTemplate } from "../../components/CycleCardTemplate";

interface PropsIfc {
  element: Cycle;
}

export const TrashedCycleCard = (props: PropsIfc) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const DeleteModalHandler = () => {
    dispatch(hideMenu());
    setShowModal(true);
  };

  const RestoreHandler = async () => {
    const result: { erased: boolean } = await (
      await axios.put(`/api/cycles/erase-restore/${props.element.id}/${1}`, {
        erased: false,
      })
    ).data;

    if (result.erased === false) {
      dispatch(hideMenu());
      dispatch(deleteErasedCycle(props.element.id));
    } else {
      alert("サイクルを正しく復元できませんでした。");
    }
  };

  // Modalを閉じるアクション
  const closeModalAction = () => {
    setShowModal(false);
  };

  return (
    <div>
      <CycleCardTemplate element={props.element}>
        <p
          onClick={RestoreHandler}
          className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-t-md"
        >
          復元する
        </p>
        <p
          onClick={DeleteModalHandler}
          className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-b-md"
        >
          削除する
        </p>
      </CycleCardTemplate>
      {showModal && (
        <DeleteCycleModal
          closeModalAction={closeModalAction}
          cycleId={props.element.id}
          cycleName={props.element.name}
        ></DeleteCycleModal>
      )}
    </div>
  );
};
