import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "./../../assets/logout-icon.svg";
import calendar from "./../../assets/calendar.svg";
import searchIcon from "./../../assets/search.svg";
import cardIcon from "./../../assets/task-icon.svg";
import listIcon from "./../../assets/list-icon.svg";
import completedIcon from "./../../assets/completed-icon.svg";
import "./nav.scss";

function Nav({ search, setSearch, view, setView }) {
  const navigate = useNavigate(); 

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Delar upp datum och tid och behåller bara datumdelen
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClick = () => {
    navigate("/login");
  }

  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <section className={`nav-container ${isSearchOpen ? "search-open" : ""}`}>
      <section className="nav-top-bar">
      <section className="date-time">
      <img
          src={searchIcon}
          alt="search bar"
          onClick={toggleSearch}
          className="search-icon"
        />
        <span className="separator-line"></span>
        <img src={calendar} alt="calendar" className="calendar-icon" />{" "}
        {formattedDate}
      </section>
      
        <button className="logout-btn"  onClick={handleClick}><img src={logoutIcon} alt="log out button" /></button>
    
      </section>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
        style={{ display: isSearchOpen ? "block" : "none" }}
      />

      <h1 className="heading-greeting">Hello, </h1>

      
      <section className="view-btn-container">
        <section className="view-btn-title">
        <button
          className={`view-btn task-btn ${view === "tasks" ? "active" : ""}`}
          onClick={() => changeView("tasks")}
        >
          <img src={cardIcon} alt="tasks" />
          
        </button>
        <p className={view === "tasks" ? "active-text" : ""}>Tasks</p>
        </section>
        <section className="view-btn-title">
        <button
          className={`view-btn categories-btn ${view === "categories" ? "active" : ""}`}
          onClick={() => changeView("categories")}
        >
          <img src={listIcon} alt="categories" />
          
        </button>
        
        <p className={view === "categories" ? "active-text" : ""}>Lists</p>
        </section>
        <section className="view-btn-title">
        <button
          className={`view-btn completed-btn ${view === "completed" ? "active" : ""}`}
          onClick={() => changeView("completed")}
        >
          <img src={completedIcon} alt="completed" />
          
        </button>
        <p className={view === "completed" ? "active-text" : ""}>Completed</p>
        </section>
      </section>
    </section>
  );
}

export default Nav;
