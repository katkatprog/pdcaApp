import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import CheckBox from "../../../components/CheckBox";
import { fixDateTzAndFormat } from "../../../utils/fixDateTzAndFormat";
import EditTaskModal from "./EditTaskModal";

interface PropsIfc {
  task: Task;
}

export const TaskCard = (props: PropsIfc) => {
  const [showModal, setShowModal] = useState(false);
  const [complete, setComplete] = useState(props.task.complete);
  const [task, setTask] = useState(props.task);

  return (
    <>
      <div
        className={`p-1  border-b border-b-slate-200 flex items-center transition-all ${
          complete && "bg-slate-300"
        }`}
      >
        <div className="w-1/6">
          <CheckBox
            state={complete}
            onClickAction={async () => {
              // Taskの完了設定をしつつ、結果を変数resultに代入
              const result: { complete: boolean } = await (
                await axios.put(`/api/tasks/update-complete/${task.id}`, {
                  complete: !complete,
                })
              ).data;

              // resultに値が入っていれば、画面側の反映も行う
              if (result) {
                setComplete(result.complete);
              } else {
                alert("タスクのチェックを正常に出来ませんでした");
              }
            }}
          ></CheckBox>
        </div>
        <div className="w-5/6">
          <p className="text-xl">
            {task.name}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="ml-3 text-gray-500 cursor-pointer"
              onClick={() => setShowModal(true)}
            ></FontAwesomeIcon>
          </p>
          {task.startDate && task.endDate && (
            <p className="pl-3 text-gray-500">
              {fixDateTzAndFormat(task.startDate)}~
              {fixDateTzAndFormat(task.endDate)}
            </p>
          )}
          <p className="pl-3">{task.about}</p>
        </div>
      </div>
      {showModal && (
        <EditTaskModal
          closeModalAction={() => setShowModal(false)}
          task={props.task}
          setTask={setTask}
        ></EditTaskModal>
      )}
    </>
  );
};
