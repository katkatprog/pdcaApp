import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import EditCycleModal from "./EditCycleModal";

const AboutCycle = () => {
  const [showEditCycleModal, setShowEditCycleModal] = useState(false);
  const cycle = useSelector((state: RootState) => state.cycle.value);

  const openCycleEditModal = () => {
    setShowEditCycleModal(true);
  };

  return (
    <aside className="w-1/3 p-5 border-l border-l-slate-200">
      <h1 className="text-xl">目標</h1>
      <p className="pl-3 text-gray-500">{cycle.goal}</p>

      <h1 className="text-xl pt-3">概要</h1>
      <p className="pl-3 text-gray-500">{cycle.about}</p>

      <h1 className="text-xl pt-3">サイクルの公開</h1>
      {cycle.watchFromAnyone ? (
        <p className="pl-3 text-gray-500">公開する</p>
      ) : (
        <p className="pl-3 text-gray-500">非公開</p>
      )}

      <FontAwesomeIcon
        icon={faPenToSquare}
        className="pt-3 text-gray-500 cursor-pointer text-xl"
        onClick={openCycleEditModal}
      ></FontAwesomeIcon>

      {showEditCycleModal && (
        <EditCycleModal
          setShowEditCycleModal={setShowEditCycleModal}
        ></EditCycleModal>
      )}
    </aside>
  );
};

export default AboutCycle;
