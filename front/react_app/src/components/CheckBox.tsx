import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  state: boolean;
  onClickAction: () => Promise<void>;
}

export const CheckBox = (props: Props) => {
  return (
    <div
      className={`text-slate-100 h-7 w-7 flex items-center justify-center
        select-none rounded-md border-2 transition-all cursor-pointer
        ${
          props.state
            ? "bg-blue-500 border-blue-400"
            : "bg-slate-200 border-slate-300"
        }`}
      onClick={() => {
        props.onClickAction();
      }}
    >
      {props.state && <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>}
    </div>
  );
};
