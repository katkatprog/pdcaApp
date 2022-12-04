import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/modalSlice";

interface PropsIfc {
  buttonMessage: string;
  children: React.ReactNode; //ここで、Modalの前半部分に表示するテキストを受け取る。スタイルは付けなくて良い
  confirmAction: () => Promise<void>;
}

const Modal = (props: PropsIfc) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={(e) => dispatch(hideModal())}
        className="bg-black/[.3] h-full w-full fixed inset-0 flex items-center justify-center z-10"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-slate-50 px-24 py-12 flex flex-col justify-center items-center rounded-lg"
        >
          <div className="flex flex-col items-center mb-6 text-lg">
            {props.children}
          </div>
          <div>
            <button
              className="text-white bg-red-500 text-lg px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => props.confirmAction()}
            >
              {props.buttonMessage}
            </button>
            <button
              onClick={() => {
                dispatch(hideModal());
              }}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-6"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
