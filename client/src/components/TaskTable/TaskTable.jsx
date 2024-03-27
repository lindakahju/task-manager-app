import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../TaskForm/TaskForm";
import TaskCard from "../TaskCard/TaskCard";
import createIcon from "./../../assets/newTask-icon.svg";
import moment from "moment";
import "./taskTable.scss";

axios.defaults.baseURL = "http://localhost:8000/tasks";

function TaskTable({ moveTaskToCompleted, search }) {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    list: "",
    due: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    task: "",
    list: "",
    due: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.task || !formData.list || !formData.due) {
      return setErrorMessage("Please fill in all fields.");
    }
    try {
      const data = await axios.post("/create", formData);
      if (data.data.success) {
        setAddSection(false);
        getFetchData();
        setFormData({
          task: "",
          list: "",
          due: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/tasks");
      if (data.data.success) {
        const sortedData = data.data.data.sort((a, b) =>
          moment.utc(a.due, "D/M HH:mm").diff(moment.utc(b.due, "D/M HH:mm"))
        );
        setDataList(sortedData);
      }
    } catch (error) {
      console.log("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete("/delete/" + id);
      if (data.data.success) {
        getFetchData();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, ...updatedData } = formDataEdit;
    const url = `/update/${_id}`;
    try {
      const data = await axios.put(url, updatedData);
      if (data.data.success) {
        getFetchData();
        setEditSection(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (taskData) => {
    setFormDataEdit({
      task: taskData.task,
      list: taskData.list,
      due: moment(taskData.due, "D/M HH:mm").format("YYYY-MM-DDTHH:mm"),
      _id: taskData._id,
    });
    setEditSection(true);
  };

  const handleComplete = async (task) => {
    try {
      const data = await axios.delete("/delete/" + task._id);
      if (data.data.success) {
        moveTaskToCompleted(task);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const filteredDataList = dataList.filter(
    (item) =>
      item.task.toLowerCase().includes(search.toLowerCase()) ||
      item.list.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <section className="task-card_container">
        {filteredDataList.length > 0 ? (
          filteredDataList.map((el) => (
            <TaskCard
              key={el._id}
              task={el.task}
              list={el.list}
              due={el.due}
              handleEdit={() => handleEdit(el)}
              handleComplete={() => handleComplete(el)}
            />
          ))
        ) : (
          <p className="no-tasks">No tasks found</p>
        )}
      </section>
      {addSection && (
        <>
          <section className="form-overlay" />
          <TaskForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
            errorMessage={errorMessage}
          />
        </>
      )}
      {editSection && (
        <>
          <section className="form-overlay" />
          <TaskForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={{ ...formDataEdit, handleDelete }}
            errorMessage={errorMessage}
            isEditing={editSection}
          />
        </>
      )}
      <button className="new-task_btn" onClick={() => setAddSection(true)}>
        <img src={createIcon} alt="create task" />
      </button>
    </section>
  );
}

export default TaskTable;
