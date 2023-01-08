import React from "react";

interface PropsIfc {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
// stateがtrueならtoggleがon、falseならtoggleがoff

export const Toggle = (props: PropsIfc) => {
  return (
    <div className="select-none">
      <div
        className={`h-7 w-14 rounded-lg flex items-center px-1 ${
          props.state ? "bg-green-500 justify-end" : "bg-gray-400"
        }`}
        onClick={() => props.setState(!props.state)}
      >
        <div className="rounded-full h-5 w-5 bg-gray-50"></div>
      </div>
    </div>
  );
};
