import { Task } from "@prisma/client";
import React, { useState } from "react";
import { ModalOverlay } from "../../../components/ModalOverlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

interface Props {
  closeModalAction: () => void;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export const EditTaskModal = (props: Props) => {
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
      <ModalOverlay
        modalWidth="w-1/2"
        closeModalAction={props.closeModalAction}
      >
        <div className="p-12">
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
                  props.setTask(result);
                  props.closeModalAction();
                } else {
                  alert("タスクを正常に更新出来ませんでした");
                }
              }}
            >
              保存する
            </button>
            <button
              onClick={props.closeModalAction}
              className="text-white bg-slate-500 text-lg px-4 py-2 rounded-md hover:bg-slate-600 ml-3"
            >
              キャンセル
            </button>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};
