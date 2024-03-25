import React from "react";
import "./taskForm.scss";
import closeIcon from "./../../assets/close.svg";

const TaskForm = ({
  handleSubmit,
  handleOnChange,
  handleclose,
  rest,
  errorMessage,
  isEditing
}) => {

  return (
    
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit task" : "Create task"}</h2>{" "}
        <section>
          <label htmlFor="task">Task : </label>
          <br></br>
          <input
            className="task-input"
            type="text"
            id="task"
            name="task"
            onChange={handleOnChange}
            value={rest.task}
          />
        </section>
        <section>
          <label htmlFor="list">List : </label>
          <br></br>
          <input
            type="text"
            id="list"
            name="list"
            onChange={handleOnChange}
            value={rest.list}
          />
        </section>
        <section>
          <label htmlFor="due">Due : </label>
          <br></br>
          <input
            className="datetime-input"
            type="datetime-local"
            id="due"
            name="due"
            onChange={handleOnChange}
            value={rest.due}
          />
        </section>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <section className="btn-section">
          <button className="btn-create">
            {isEditing ? "Update" : "Create"}
          </button>{" "}
          <button type="button" className="close-btn" onClick={handleclose}>
            <img src={closeIcon} alt="close icon" />
          </button>
          {rest._id && (
            <button
              className="btn-delete"
              onClick={() => {
                rest.handleDelete(rest._id);
                handleclose();
              }}
            >
              Delete
            </button>
          )}
        </section>
      </form>
    
  );
};

export default TaskForm;
