import React from "react";
import moment from "moment";
import editIcon from "./../../assets/editTask-icon.svg";
import checkIcon from "./../../assets/check-icon.svg";
import listIcon from "./../../assets/list-black-icon.svg";
import clockIcon from "./../../assets/clock-icon.svg";
import "./taskCard.scss";

const TaskCard = ({ task, list, due, handleEdit, handleComplete, isCompleted }) => {
  const isDuePassed = moment(due, "D/M HH:mm").isBefore(moment());

  return (
    <section className={`task-card ${isDuePassed ? "task-card-past-due" : ""} ${isCompleted ? "task-card-completed" : ""}`}>
      <section className="task-card__first-row">
        {task}
        <section className="task-card__first-row buttons">
          {!isCompleted && ( 
            <button className="btn-edit" onClick={handleEdit}>
              <img src={editIcon} alt="edit icon" />
            </button>
          )}
          {!isCompleted && (
            <button
              className="btn-done"
              onClick={() => handleComplete({ task, list, due })}
            >
              <img src={checkIcon} alt="check icon" />
            </button>
          )}
        </section>
      </section>
      <section className="task-card__second-row">
        <img src={listIcon} alt="list" />
        {list}
        <span>
          <img src={clockIcon} alt="clock icon" />
          {moment(due, "D/M HH:mm").format("D/M HH:mm")}
        </span>
      </section>
    </section>
  );
};

export default TaskCard;