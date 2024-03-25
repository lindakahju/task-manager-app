import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";
import Nav from "../../components/Nav/Nav";
import TaskTable from "../../components/TaskTable/TaskTable";
import ListTable from "../../components/ListTable/ListTable";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./dashboard.scss";

function Dashboard() {
  const [view, setView] = useState("tasks");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [search, setSearch] = useState("");
  // const username = "John Doe"; // Antag att detta är användarnamnet
  // const {user} = useContext(UserContext);

  const moveTaskToCompleted = (task) => {
    // Add task to completed tasks in state
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
  
    // Save completed tasks to local storage
    const updatedCompletedTasks = [...completedTasks, task];
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
  };
  
  useEffect(() => {
    // Fetch completed tasks from local storage when component mounts
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  return (
    <section className="startpage">
      <Nav search={search} setSearch={setSearch} view={view} setView={setView} />
      <section className="content-container">
        {view === "tasks" && (
          <TaskTable
            moveTaskToCompleted={moveTaskToCompleted}
            search={search}
          />
        )}
        {view === "categories" && <ListTable search={search} />}
        {view === "completed" && (
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                <TaskCard
                  task={task.task}
                  list={task.list}
                  due={task.due}
                  isCompleted={true}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default Dashboard;