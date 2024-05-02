import React, { useState,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleList,
  faBars,
  faMicrophone,
  faEarListen,
  faSpellCheck,
  faBrain,
  faNoteSticky,
  faCalendarDays,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
    const toggle = (e) => {
        setIsOpen (!isOpen);
    menuref.current.classList.toggle('nav-contant');
    e.target.classList.toggle('open');
   }
    const menuref=useRef()

  const menuItem = [
    {
      path: "/",
      name: "SUMMARIZER",
      icon: <FontAwesomeIcon icon={faRectangleList} />,
    },
    {
      path: "/voice",
      name: "VOICE TYPING",
      icon: <FontAwesomeIcon icon={faMicrophone} />,
    },
    {
      path: "/audiobly",
      name: "AUDIBLY READING",
      icon: <FontAwesomeIcon icon={faEarListen} />,
    },
    {
      path: "/grammar",
      name: "GRAMMAR CHECK",
      icon: <FontAwesomeIcon icon={faSpellCheck} />,
    },
    {
      path: "/legal",
      name: "LEGAL AI",
      icon: <FontAwesomeIcon icon={faBrain} />,
    },
    {
      path: "/templating",
      name: "TEMPLATING",
      icon: <FontAwesomeIcon icon={faNoteSticky} />,
    },
    {
      path: "/calender",
      name: "CALENDAR",
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
    },
    {
      path: "/translator",
      name: "TRANSLATOR",
      icon: <FontAwesomeIcon icon={faLanguage} />,
    },
  ]

  return (
    <div className="side-bar-container">
      <div style={{ width: isOpen ? "15vw" : "5vw" }} className="sidebar">
        <div className="top_section">
          <div style={{ marginLeft: isOpen ? "5vw" : "0vw" }}  onClick={toggle} className="bars">
            <FontAwesomeIcon icon={faBars}  ref={menuref} />
          </div>
      </div>
      <div className="display-flex">
      {menuItem.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className="link"
          activeclassname="active"
        >
          <div className="icon-slider">{item.icon}</div>
          <div className={isOpen?'link_text':'link_text-none'}>{item.name}</div>
          {/* <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            {item.name}
          </div> */}
        </NavLink>
      ))}
    </div>
    </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
