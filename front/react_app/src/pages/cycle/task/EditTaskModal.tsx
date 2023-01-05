import React, { ReactNode } from "react";

interface Props {
  closeModalAction: () => void;
  children: ReactNode;
}

const EditTaskModal = (props: Props) => {
  return (
    <>
      <div
        onClick={() => props.closeModalAction()}
        className="bg-black/[.3] h-full w-full fixed inset-0 flex items-center justify-center z-10"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-slate-50 px-8 py-8 flex flex-col justify-center items-center rounded-lg w-3/6"
        >
          <div className="w-full">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default EditTaskModal;
