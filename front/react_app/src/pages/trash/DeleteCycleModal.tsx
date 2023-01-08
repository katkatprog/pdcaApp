import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import ModalOverlay from "../../components/ModalOverlay";

interface Props {
  closeModalAction: () => void;
  cycleId: number;
  cycleName: string;
}

export const DeleteCycleModal = (props: Props) => {
  const dispatch = useDispatch();
  const confirmAction = async () => {
    // "削除する"が押された際の処理
    await axios.delete(`/api/cycles/${props.cycleId}/${1}`);
    dispatch(deleteErasedCycle(props.cycleId));
    props.closeModalAction();
  };

  return (
    <>
      <ModalOverlay
        modalWidth="w-1/2"
        closeModalAction={props.closeModalAction}
      >
        <div className="p-12">
          <div className="flex flex-col items-center mb-6 text-lg">
            <p>{props.cycleName}を削除します。</p>
            <p>削除すると元には戻せません。</p>
            <p>本当によろしいですか。</p>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-red-500 text-lg px-4 py-2 rounded-md hover:bg-red-600 w-2/5"
              onClick={confirmAction}
            >
              削除
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
