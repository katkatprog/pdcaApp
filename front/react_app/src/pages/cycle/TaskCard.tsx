import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import React, { useState } from "react";

interface PropsIfc {
  task: Task;
}

const TaskCard = (props: PropsIfc) => {
  // const [name, setName] = useState("");
  // const [about, setAbout] = useState<string | null>()
  // const [statusId, setstatusId] = useState(second)
  // useEffect(() => {}, []);

  return (
    <div className="p-1  border-b border-b-slate-200">
      <div
        className={`text-slate-100 h-7 w-7 flex items-center justify-center
        select-none rounded-md border-2 transition-all 
        ${
          props.task.statusId === 1
            ? "bg-blue-500 border-blue-400"
            : "bg-slate-200 border-slate-300"
        }`}
      >
        {props.task.statusId === 1 && (
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        )}
      </div>

      <p>
        {props.task.name}
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="ml-3 text-gray-500 cursor-pointer text-xl"
        ></FontAwesomeIcon>
      </p>
      <p className="pl-3 text-gray-500">{props.task.about}</p>
      {props.task.startDate && props.task.endDate && (
        <p className="pl-3 text-gray-500">
          {props.task.startDate.toString()} ~ {props.task.endDate.toString()}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
