import {
  faArrowsSpin,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { CycleIfc } from "../../utils/cycle.interface";
import { Link } from "react-router-dom";

interface CycleInfoProps {
  element: CycleIfc;
}

const CycleCard = (props: CycleInfoProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showElaseModal, setShowElaseModal] = useState(false);

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

  const ElaseHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMenu(false);
    setShowElaseModal(true);
  };

  return (
    <div>
      <Link to={`/${props.element.id}`}>
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
                      onClick={(e) => ElaseHandler(e)}
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
      </Link>
      {showElaseModal && (
        <Modal
          cycleId={props.element.id}
          buttonMessage={"消去する"}
          setShowElaseModal={setShowElaseModal}
        >
          <p>
            <span>{props.element.name}</span> を消去します。
          </p>
          <p>本当によろしいですか。</p>
        </Modal>
      )}
    </div>
  );
};

export default CycleCard;
