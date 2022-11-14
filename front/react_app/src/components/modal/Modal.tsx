import React from "react";

interface PropsIfc {
  cycleId: number;
  buttonMessage: string;
  children: React.ReactNode; //ここで、Modalの前半部分に表示するテキストを受け取る。スタイルは付けなくて良い
  setShowElaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = (props: PropsIfc) => {
  // 確定ボタンが押されたときの処理
  const confirmAction = () => {
    props.setShowElaseModal(false);
    // ここに、消去や削除の処理を追加していく…
  };
  return (
    <>
      <div
        onClick={() => props.setShowElaseModal(false)}
        className="bg-black/[.3] h-full w-full fixed inset-0 flex items-center justify-center"
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
              onClick={() => props.setShowElaseModal(false)}
            >
              {props.buttonMessage}
            </button>
            <button
              onClick={() => {
                confirmAction();
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
