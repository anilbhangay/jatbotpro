import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";



function Navbar() {
  const location = useLocation();

  const routeTitles = {
    '/': 'Summarizer',
    '/voice':'Voice Typing',
    '/audiobly':'Audibly Reading',
    '/grammar':'Grammar Checker',
    '/legal':'Legal Ai',
    '/templating':'Templating',
    '/calender':'Calendar',
    '/translator':'Translator'
  };  
 
  return (
    <div className='head-section'>
        <div className="navbar">
            <h1 className='logo'><Link to="/">JATBOT</Link></h1>
            <div className='headers'><h4>{routeTitles[location.pathname]}</h4></div>
            <div className="btn">
            <Link to='/Contactus' className='butn'>Contact Us</Link>
            <a href="/"><FontAwesomeIcon icon={faBell} className='icon-bell' /></a>
            </div>
        </div> 
    </div>
  );
};

   
export default Navbar;