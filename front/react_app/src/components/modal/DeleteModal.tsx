import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import { hideModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import Modal from "./Modal";

const DeleteModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "削除する"が押された際の処理
    await axios.delete(`/api/cycles/${modalState.cycleId}/${1}`);
    dispatch(deleteErasedCycle(modalState.cycleId));
    dispatch(hideModal());
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
