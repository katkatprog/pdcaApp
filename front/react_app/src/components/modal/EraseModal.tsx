import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCycle } from "../../redux/cyclesSlice";
import { hideModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import Modal from "./Modal";

const EraseModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "消去する"が押された際の処理
    await axios.put(`/api/cycles/erase-restore/${modalState.cycleId}/${1}`);
    dispatch(deleteCycle(modalState.cycleId));
    dispatch(hideModal());
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
