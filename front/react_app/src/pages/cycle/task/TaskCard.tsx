import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import CheckBox from "../../../components/CheckBox";
import { EditTaskIfc } from "../../../utils/interface";
import EditTaskModal from "./EditTaskModal";

interface PropsIfc {
  task: Task;
}

const TaskCard = (props: PropsIfc) => {
  const [task, setTask] = useState(props.task);
  const [showModal, setShowModal] = useState(false);

  const [complete, setComplete] = useState(props.task.complete);
  const [nameOnModal, setNameOnModal] = useState(props.task.name);
  const [aboutOnModal, setAboutOnModal] = useState(props.task.about);
  const [startDateOnModal, setStartDateOnModal] = useState(
    props.task.startDate,
  );
  const [endDateOnModal, setEndDateOnModal] = useState(props.task.endDate);

  return (
    <>
      <div className="p-1  border-b border-b-slate-200">
        <CheckBox
          state={complete}
          onClickAction={async () => {
            setComplete(!complete);
            await axios.put(`/api/tasks/update-complete/${task.id}`);
          }}
        ></CheckBox>
        <p>
          {task.name}
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="ml-3 text-gray-500 cursor-pointer text-xl"
            onClick={() => setShowModal(true)}
          ></FontAwesomeIcon>
        </p>
        <p className="pl-3 text-gray-500">{task.about}</p>
        {task.startDate && task.endDate && (
          <p className="pl-3 text-gray-500">
            {task.startDate.toString()} ~ {task.endDate.toString()}
          </p>
        )}
      </div>
      {showModal && (
        <EditTaskModal closeModalAction={() => setShowModal(false)}>
          <h1 className="text-xl">タスクの編集</h1>
          <p className="my-2">タスク名</p>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-slate-200 border-none outline-none"
            value={nameOnModal}
            onChange={(e) => setNameOnModal(e.target.value)}
            required
          />
          <p className="my-2">概要</p>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-slate-200 border-none outline-none"
            value={aboutOnModal || ""}
            onChange={(e) => setAboutOnModal(e.target.value)}
            required
          />
          <p className="my-2">期間</p>
          <div>
            <input
              type="text"
              className="w-1/3 p-2 rounded-md bg-slate-200 border-none outline-none"
              // value={}
              required
            />
            <span className="mx-2 text-xl">~</span>
            <input
              type="text"
              className="w-1/3 p-2 rounded-md bg-slate-200 border-none outline-none"
              // value={}
              required
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              className="text-white bg-blue-500 text-lg px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={async () => {
                await axios.put<EditTaskIfc>(
                  `/api/tasks/update/${props.task.id}`,
                  {
                    name: nameOnModal,
                    about: aboutOnModal,
                    startDate: startDateOnModal,
                    endDate: endDateOnModal,
                  },
                );
                setTask({
                  id: task.id,
                  name: nameOnModal,
                  about: aboutOnModal,
                  complete: complete,
                  cycleId: task.cycleId,
                  endDate: endDateOnModal,
                  startDate: startDateOnModal,
                  round: task.round,
                });
                setShowModal(false);
              }}
            >
              保存する
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-3"
            >
              キャンセル
            </button>
          </div>
        </EditTaskModal>
      )}
    </>
  );
};

export default TaskCard;
