import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import CheckBox from "../../../components/CheckBox";

interface PropsIfc {
  task: Task;
}

const TaskCard = (props: PropsIfc) => {
  const [name, setName] = useState(props.task.name);
  const [about, setAbout] = useState(props.task.about);
  const [complete, setComplete] = useState(props.task.complete);
  const [startDate, setStartDate] = useState(props.task.startDate);
  const [endDate, setEndDate] = useState(props.task.endDate);

  return (
    <div className="p-1  border-b border-b-slate-200">
      <CheckBox
        state={complete}
        onClickAction={async () => {
          setComplete(!complete);
          await axios.put(`/api/tasks/update-complete/${props.task.id}`);
        }}
      ></CheckBox>
      <p>
        {name}
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="ml-3 text-gray-500 cursor-pointer text-xl"
        ></FontAwesomeIcon>
      </p>
      <p className="pl-3 text-gray-500">{about}</p>
      {startDate && endDate && (
        <p className="pl-3 text-gray-500">
          {startDate.toString()} ~ {endDate.toString()}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
