import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteCycle } from "../../redux/cyclesSlice";
import { ModalOverlay } from "../../components/ModalOverlay";

interface Props {
  closeModalAction: () => void;
  cycleId: number;
  cycleName: string;
}

export const EraseCycleModal = (props: Props) => {
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "消去する"が押された際の処理
    // サイクルの消去設定をtrueにし、その結果を変数resultに代入する
    const result: { erased: boolean } = await (
      await axios.put(`/api/cycles/erase-restore/${props.cycleId}/${1}`, {
        erased: true,
      })
    ).data;

    if (result) {
      dispatch(deleteCycle(props.cycleId));
      props.closeModalAction();
    } else {
      alert("正しく消去出来ませんでした。");
    }
  };

  return (
    <>
      <ModalOverlay
        modalWidth="w-1/2"
        closeModalAction={props.closeModalAction}
      >
        <div className="p-12">
          <div className="flex flex-col items-center mb-6 text-lg">
            <p>{props.cycleName}を消去します。</p>
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
              onClick={props.closeModalAction}
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
