import {
  faArrowsSpin,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cycle } from "@prisma/client";
import { RootState } from "../redux/store";
import { hideMenu, showMenu } from "../redux/menuSlice";

interface PropsIfc {
  element: Cycle;
  hoverCss?: string;
  children: React.ReactNode;
}

const CycleCard = (props: PropsIfc) => {
  const menuState = useSelector((state: RootState) => state.menu.value);
  const dispatch = useDispatch();

  const MenuHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    if (menuState.visible) {
      dispatch(hideMenu());
    } else {
      dispatch(showMenu(cycleId));
    }
  };

  return (
    <div>
      <div className={`flex h-28 select-none ${props.hoverCss}`}>
        <div className="w-1/6 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faArrowsSpin}
            className="text-5xl text-blue-600"
          />
        </div>
        <div className="w-5/6 pt-2 border-b border-slate-100 flex justify-between">
          <h2 className="text-lg">{props.element.name}</h2>
          <div className="flex justify-between">
            {menuState.visible && menuState.cycleId === props.element.id && (
              <div>
                <div className="mt-3 mr-3 menu">{props.children}</div>
              </div>
            )}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:bg-slate-300 px-3 py-2 mr-3 text-xl rounded transition duration-400"
              onClick={(e) => MenuHandler(e, props.element.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleCard;
