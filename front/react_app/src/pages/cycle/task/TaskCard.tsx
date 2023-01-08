import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckBox from "../../../components/CheckBox";
import { fixDateTzAndFormat } from "../../../utils/fixDateTzAndFormat";
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
    props.task.startDate ? new Date(props.task.startDate) : null,
  );
  const [endDateOnModal, setEndDateOnModal] = useState(
    props.task.endDate ? new Date(props.task.endDate) : null,
  );

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
            <DatePicker
              className="w-1/3 p-2 rounded-md bg-slate-200 border-none outline-none"
              dateFormat="yyyy/MM/dd"
              selected={startDateOnModal}
              onChange={(date) => {
                setStartDateOnModal(date);
              }}
            ></DatePicker>
            <span className="mx-2 text-xl">~</span>
            <DatePicker
              className="w-1/3 p-2 rounded-md bg-slate-200 border-none outline-none"
              dateFormat="yyyy/MM/dd"
              selected={endDateOnModal}
              onChange={(date) => setEndDateOnModal(date)}
            ></DatePicker>
          </div>

          <div className="flex w-full justify-end">
            <button
              className="text-white bg-blue-500 text-lg px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={async () => {
                // Taskの更新をしつつ、結果(更新されたTask)を変数resultに代入
                const result: Task = await (
                  await axios.put(`/api/tasks/update/${props.task.id}`, {
                    name: nameOnModal,
                    about: aboutOnModal,
                    startDate: startDateOnModal,
                    endDate: endDateOnModal,
                  })
                ).data;

                // 変数resultの中身があれば、画面側にも反映する
                if (result) {
                  setTask(result);
                  setShowModal(false);
                } else {
                  alert("タスクを正常に更新出来ませんでした");
                }
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
