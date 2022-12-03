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

const DeleteModal = (props: PropsIfc) => {
  const modalState: ModalIfc = useSelector((state: any) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "削除する"が押された際の処理
    await axios.delete(`/api/cycles/${modalState.cycleId}/${1}`);
    props.setCycles(
      props.cycles.filter((cycle) => cycle.id != modalState.cycleId),
    );
    dispatch(hideModal(modalState));
  };
  return (
    <>
      <Modal buttonMessage="削除" confirmAction={confirmAction}>
        <p>{modalState.cycleName}を消去します。</p>
        <p>削除すると元には戻せません。</p>
        <p>本当によろしいですか。</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
