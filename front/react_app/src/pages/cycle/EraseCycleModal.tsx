import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCycle } from "../../redux/cyclesSlice";
import { hideModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import ModalOverlay from "../../components/modal/ModalOverlay";

const EraseCycleModal = () => {
  const modalState = useSelector((state: RootState) => state.modal.value);
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "消去する"が押された際の処理
    // サイクルの消去設定をtrueにし、その結果を変数resultに代入する
    const result: { erased: boolean } = await (
      await axios.put(`/api/cycles/erase-restore/${modalState.cycleId}/${1}`, {
        erased: true,
      })
    ).data;

    if (result) {
      dispatch(deleteCycle(modalState.cycleId));
      closeModalAction();
    } else {
      alert("正しく消去出来ませんでした。");
    }
  };

  // Modalを閉じるアクション
  const closeModalAction = () => dispatch(hideModal());

  return (
    <>
      <ModalOverlay modalWidth="w-1/2" closeModalAction={closeModalAction}>
        <div className="p-12">
          <div className="flex flex-col items-center mb-6 text-lg">
            <p>{modalState.cycleName}を消去します。</p>
            <p>本当によろしいですか。</p>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-red-500 text-lg px-4 py-2 rounded-md hover:bg-red-600 w-2/5"
              onClick={confirmAction}
            >
              消去
            </button>
            <button
              onClick={() => {
                dispatch(hideModal());
              }}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-6 w-2/5"
            >
              キャンセル
            </button>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};

export default EraseCycleModal;
