import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import { hideModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import ModalOverlay from "./ModalOverlay";

const DeleteModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "削除する"が押された際の処理
    await axios.delete(`/api/cycles/${modalState.cycleId}/${1}`);
    dispatch(deleteErasedCycle(modalState.cycleId));
    closeModalAction();
  };

  // Modalを閉じるアクション
  const closeModalAction = () => dispatch(hideModal());

  return (
    <>
      <ModalOverlay modalWidth="w-1/2" closeModalAction={closeModalAction}>
        <div className="p-12">
          <div className="flex flex-col items-center mb-6 text-lg">
            <p>{modalState.cycleName}を削除します。</p>
            <p>削除すると元には戻せません。</p>
            <p>本当によろしいですか。</p>
          </div>
          <div>
            <button
              className="text-white bg-red-500 text-lg px-4 py-2 rounded-md hover:bg-red-600"
              onClick={confirmAction}
            >
              削除
            </button>
            <button
              onClick={closeModalAction}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-6"
            >
              キャンセル
            </button>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};

export default DeleteModal;
