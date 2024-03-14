import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faMicrophone, faEarListen, faSpellCheck, faBrain, faNoteSticky, faCalendarDays, faLanguage } from "@fortawesome/free-solid-svg-icons";
 import '../pages/summarizer.jsx';
import {
    FaBars,
    

}from "react-icons/fa";
 
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
     
    const menuItem = [
         {
            path: "/",
            name: "SUMMARIZER",
            icon:  <FontAwesomeIcon icon={faRectangleList} /> 
         },
         {
            path: "/voice",
            name: "VOICE TYPING",
            icon: <FontAwesomeIcon icon={faMicrophone} />
        },
        {
            path: "/audiobly",
            name: "AUDIBLY READING",
            icon: <FontAwesomeIcon icon={faEarListen} />
        },
        {
            path: "/grammar",
            name: "GRAMMAR CHECK",
            icon: <FontAwesomeIcon icon={faSpellCheck} />
        },
        {
            path: "/legal",
            name: "LEGAL AI",
            icon:  <FontAwesomeIcon icon={faBrain} />
        },
        {
            path: "/templating",
            name: "TEMPLATING",
            icon:  <FontAwesomeIcon icon={faNoteSticky} />
        },
        {
            path: "/calender",
            name: "CALENDAR",
            icon: <FontAwesomeIcon icon={faCalendarDays} />
        },
        {
            path: "/translator",
            name: "TRANSLATOR",
            icon: <FontAwesomeIcon icon={faLanguage} />
        }
    ]
    

  return (
    <div className='container'>
     <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
        

        <div className="top_section">
              
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                <FaBars onClick={toggle} />
            </div>
        </div>
        {
            menuItem.map((item, index) =>(
                <NavLink to={item.path} key={index} className="link"  activeclassname="active">
                  <div className="icon">{item.icon}</div>
                 <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                </NavLink>
            )
            )
        }
     </div>
       <main>{children}</main>
    </div>
  );
};

export default Sidebar;