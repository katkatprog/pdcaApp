import React from "react";
import { CycleIfc } from "../../utils/cycle.interface";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/modalSlice";
import { hideMenu } from "../../redux/menuSlice";
import CycleCard from "../../components/CycleCard";

interface PropsIfc {
  element: CycleIfc;
}

const HomeCycleCard = (props: PropsIfc) => {
  const dispatch = useDispatch();

  const FavoriteHandler = (e: React.FormEvent, cycleId: number) => {
    e.preventDefault();
    dispatch(hideMenu());
    console.log("Favorite!");
    console.log(`CycleId: ${cycleId}`);
  };

  const ElaseModalHandler = (
    e: React.FormEvent,
    cycleId: number,
    cycleName: string,
  ) => {
    e.preventDefault();
    dispatch(hideMenu());
    dispatch(showModal({ cycleId, cycleName }));
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
              onClick={(e) =>
                ElaseModalHandler(e, props.element.id, props.element.name)
              }
              className="bg-slate-300 hover:bg-slate-400 px-3 py-1 rounded-b-md"
            >
              消去する
            </p>
          </>
        </CycleCard>
      </Link>
    </div>
  );
};

export default HomeCycleCard;
