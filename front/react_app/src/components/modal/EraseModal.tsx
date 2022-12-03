import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, ModalIfc } from "../../redux/modalSlice";
import { CycleIfc } from "../../utils/cycle.interface";
import Modal from "./Modal";

interface PropsIfc {
  cycles: CycleIfc[];
  setCycles: React.Dispatch<React.SetStateAction<CycleIfc[]>>;
}

const EraseModal = (props: PropsIfc) => {
  const modalState: ModalIfc = useSelector((state: any) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "消去する"が押された際の処理
    await axios.put(`/api/cycles/erase-restore/${modalState.cycleId}/${1}`);
    props.setCycles(
      props.cycles.filter((cycle) => cycle.id != modalState.cycleId),
    );
    dispatch(hideModal(modalState));
  };
  return (
    <>
      <Modal buttonMessage="消去" confirmAction={confirmAction}>
        <p>{modalState.cycleName}を消去します。</p>
        <p>本当によろしいですか。</p>
      </Modal>
    </>
  );
};

export default EraseModal;