import axios from "axios";
import React, { useEffect, useState } from "react";
import { Plan } from "../../../utils/plan.interface";

interface PropsIfc {
  cycleId: number;
  round: number;
}

const PlanSidebar = (props: PropsIfc) => {
  const [plan, setPlan] = useState<Plan>();

  useEffect(() => {
    (async () => {
      const planData: Plan = await (await axios.get(`/api/plans/${props.cycleId}/${props.round}`)).data;
      setPlan(planData);
    })();
  }, []);

  return (
    <aside className="w-1/3 p-5 border-l border-l-slate-200">
      <h1 className="text-xl">この周の目標</h1>
      <p className="pl-3 text-gray-500">{plan?.goalInRound}</p>

      <h1 className="text-xl pt-3">タスク</h1>
      <h1 className="text-xl pt-3">スケジュール</h1>
    </aside>
  );
};

export default PlanSidebar;
