import {
  faArrowsSpin,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CycleIfc } from "../interfaces/cycle.interface";

interface CycleInfoProps {
  element: CycleIfc;
}

const CycleCard = (props: CycleInfoProps) => {
  const MenuHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    console.log("Menu!");
    console.log(`CycleId: ${cycleId}`);
  };

  return (
    <div className="flex h-20 transition duration-400 hover:bg-slate-300 hover:cursor-pointer">
      <div className="w-1/6 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faArrowsSpin}
          className="text-5xl text-blue-600"
        />
      </div>
      <div className="w-5/6 pt-2 border-b border-slate-100 flex justify-between">
        <h2 className="text-lg">{props.element.name}</h2>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="hover:bg-slate-200 px-3 py-2 mr-3 text-xl rounded"
          onClick={(e) => MenuHandler(e, props.element.id)}
        />
      </div>
    </div>
  );
};

export default CycleCard;
