import {
  faArrowsSpin,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { CycleIfc } from "../../interfaces/cycle.interface";

interface CycleInfoProps {
  element: CycleIfc;
}

const CycleCard = (props: CycleInfoProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const MenuHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const FavoriteHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    setShowMenu(false);
    console.log("Favorite!");
    console.log(`CycleId: ${cycleId}`);
  };

  const ElaseHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    setShowMenu(false);
    console.log("Elase!");
    console.log(`CycleId: ${cycleId}`);
  };

  return (
    <div>
      <div className="flex h-28 transition duration-400 hover:bg-slate-200 hover:cursor-pointer select-none">
        <div className="w-1/6 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faArrowsSpin}
            className="text-5xl text-blue-600"
          />
        </div>
        <div className="w-5/6 pt-2 border-b border-slate-100 flex justify-between">
          <h2 className="text-lg">{props.element.name}</h2>
          <div className="flex justify-between">
            {showMenu && (
              <div>
                <div className="mt-3 mr-3 menu">
                  <p
                    onClick={(e) => FavoriteHandler(e, props.element.id)}
                    className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-t-md"
                  >
                    お気に入りに登録
                  </p>
                  <p
                    onClick={(e) => ElaseHandler(e, props.element.id)}
                    className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-b-md"
                  >
                    消去する
                  </p>
                </div>
              </div>
            )}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:bg-slate-300 px-3 py-2 mr-3 text-xl rounded transition duration-400 z-10"
              onClick={(e) => MenuHandler(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleCard;
