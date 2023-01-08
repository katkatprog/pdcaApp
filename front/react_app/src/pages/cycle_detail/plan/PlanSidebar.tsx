import axios from "axios";
import React, { useEffect, useState } from "react";
import { Plan, Task } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../task/TaskCard";

interface PropsIfc {
  cycleId: number;
  round: number;
}

export const PlanSidebar = (props: PropsIfc) => {
  const [plan, setPlan] = useState<Plan>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      Promise.all([
        axios.get(`/api/plans/${props.cycleId}/${props.round}`),
        axios.get(`/api/tasks/${props.cycleId}/${props.round}`),
      ]).then(async (results) => {
        const planData = await results[0].data;
        const tasksData = await results[1].data;
        setPlan(planData);
        setTasks(tasksData);
      });
    })();
  }, []);

  return (
    <aside className="w-1/3 p-5 border-l border-l-slate-200">
      <h1 className="text-xl">この周の目標</h1>
      <p className="pl-3 text-gray-500">{plan?.goalInRound}</p>

      <h1 className="text-xl pt-3">タスク</h1>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task}></TaskCard>
      ))}
      <h1 className="text-xl pt-3">スケジュール</h1>
    </aside>
  );
};
