import React from "react";

interface PropsIfc {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
// stateがtrueならtoggleがon、falseならtoggleがoff

const Toggle = (props: PropsIfc) => {
  return (
    <div className="select-none" onClick={() => props.setState(!props.state)}>
      <div
        className={`h-7 w-14 rounded-lg transition-all flex items-center px-1 ${
          props.state ? "bg-green-500 pl-8" : "bg-gray-400"
        }`}
      >
        <div className="rounded-full h-5 w-5 bg-gray-50"></div>
      </div>
    </div>
  );
};

export default Toggle;
