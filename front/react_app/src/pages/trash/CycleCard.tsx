import {
  faArrowsSpin,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteErasedCycle } from "../../redux/erasedCyclesSlice";
import { showModal } from "../../redux/modalSlice";
import { CycleIfc } from "../../utils/cycle.interface";

interface CycleInfoProps {
  element: CycleIfc;
}

const CycleCard = (props: CycleInfoProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const MenuHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const DeleteMenuHandler = (
    e: React.FormEvent,
    cycleId: number,
    cycleName: string,
  ) => {
    e.preventDefault();
    setShowMenu(false);
    dispatch(showModal({ cycleId, cycleName }));
  };

  const RestoreMenuHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowMenu(false);
    await axios.put(`/api/cycles/erase-restore/${props.element.id}/${1}`);
    dispatch(deleteErasedCycle(props.element.id));
  };

  return (
    <div>
      <div className="flex h-28 select-none">
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
                    onClick={(e) => RestoreMenuHandler(e)}
                    className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-t-md"
                  >
                    復元する
                  </p>
                  <p
                    onClick={(e) =>
                      DeleteMenuHandler(e, props.element.id, props.element.name)
                    }
                    className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-b-md"
                  >
                    削除する
                  </p>
                </div>
              </div>
            )}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:bg-slate-300 px-3 py-2 mr-3 text-xl rounded transition duration-400"
              onClick={(e) => MenuHandler(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleCard;
