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
    // サイクルの消去設定をtrueにし、その結果を変数resultに代入する
    const result: { erased: boolean } = await (
      await axios.put(`/api/cycles/erase-restore/${modalState.cycleId}/${1}`, {
        erased: true,
      })
    ).data;

    if (result) {
      dispatch(deleteCycle(modalState.cycleId));
      dispatch(hideModal());
    } else {
      alert("正しく消去出来ませんでした。");
    }
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
