import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import CycleCard from "../../components/CycleCard";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import { hideMenu } from "../../redux/menuSlice";
import { showModal } from "../../redux/modalSlice";
import { Cycle } from "@prisma/client";

interface PropsIfc {
  element: Cycle;
}

const TrashedCycleCard = (props: PropsIfc) => {
  const dispatch = useDispatch();

  const DeleteModalHandler = (
    e: React.FormEvent,
    cycleId: number,
    cycleName: string,
  ) => {
    e.preventDefault();
    dispatch(hideMenu());
    dispatch(showModal({ cycleId, cycleName }));
  };

  const RestoreHandler = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      <CycleCard element={props.element}>
        <p
          onClick={(e) => RestoreHandler(e)}
          className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-t-md"
        >
          復元する
        </p>
        <p
          onClick={(e) =>
            DeleteModalHandler(e, props.element.id, props.element.name)
          }
          className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-b-md"
        >
          削除する
        </p>
      </CycleCard>
    </div>
  );
};

export default TrashedCycleCard;
