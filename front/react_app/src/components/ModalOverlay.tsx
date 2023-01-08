import React from "react";

interface PropsIfc {
  children: React.ReactNode;
  closeModalAction: () => void;
  modalWidth: `w-${string}`;
}

const ModalOverlay = (props: PropsIfc) => {
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
          className={`bg-slate-50 rounded-lg ${props.modalWidth}`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default ModalOverlay;
