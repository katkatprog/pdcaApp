import React, { useState } from "react";
import { Cycle } from "@prisma/client";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideMenu } from "../../redux/menuSlice";
import CycleCard from "../../components/CycleCard";
import EraseCycleModal from "../cycle/EraseCycleModal";

interface PropsIfc {
  element: Cycle;
}

const HomeCycleCard = (props: PropsIfc) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const FavoriteHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    dispatch(hideMenu());
    console.log("Favorite!");
    console.log(`CycleId: ${cycleId}`);
  };

  const closeModalAction = () => {
    setShowModal(false);
  };

  const eraseHandler = (e: React.FormEvent) => {
    e.preventDefault(); //Linkタグの内部からのクリックのため、これが無いとページ遷移してしまう
    setShowModal(true);
  };

  return (
    <div>
      <Link to={`/${props.element.id}`}>
        <CycleCard
          element={props.element}
          hoverCss="transition duration-400 hover:bg-slate-200"
        >
          <>
            <p
              onClick={(e) => FavoriteHandler(e, props.element.id)}
              className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-t-md"
            >
              お気に入りに登録
            </p>
            <p
              onClick={(e) => eraseHandler(e)}
              className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-b-md"
            >
              消去する
            </p>
          </>
        </CycleCard>
      </Link>
      {showModal && (
        <EraseCycleModal
          cycleId={props.element.id}
          cycleName={props.element.name}
          closeModalAction={closeModalAction}
        ></EraseCycleModal>
      )}
    </div>
  );
};

export default HomeCycleCard;
