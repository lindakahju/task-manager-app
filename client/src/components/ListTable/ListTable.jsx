import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listTable.scss";

axios.defaults.baseURL = "http://localhost:8000/";

function ListTable({ search }) {
  const [listTable, setListTable] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [listTasks, setListTasks] = useState([]);

  const fetchLists = async () => {
    try {
      const response = await axios.get("/tasks");
      if (response.data.success) {
        const categories = response.data.data.map((item) => item.list);
        const categoryList = Array.from(new Set(categories.filter(Boolean)));
        setListTable(categoryList);
        setFilteredList(categoryList);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const fetchTasksByList = async (list) => {
    try {
      const response = await axios.get(`/list/${list}`);
      if (response.data.success) {
        setListTasks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks by list:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    const filteredLists = listTable.filter((list) =>
      list.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filteredLists);
  }, [search, listTable]);

  const handleListClick = async (list) => {
    if (selectedList === list) {
      setSelectedList(null);
    } else {
      setSelectedList(list);
      await fetchTasksByList(list);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <section>
      {filteredList.length > 0 ? (
        <section
          className={`list-container ${selectedList ? "opened" : ""}`}
        >
          {filteredList.map((list, index) => (
            <section
              key={index}
              className={`list-card ${
                selectedList === list ? "selected" : ""
              }`}
              onClick={() => handleListClick(list)}
            >
              <section className="list-title">{list}</section>
              {selectedList === list && (
                <ul className="list-tasks">
                  {listTasks.map((task, index) => (
                    <li key={index}>
                      {task.task} - {formatDate(task.due)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </section>
      ) : (
        <p style={{ textAlign: "center" }}>No lists yet</p>
      )}
    </section>
  );
}

export default ListTable;
