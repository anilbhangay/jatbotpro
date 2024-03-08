import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='head-section'>
        <div className="navbar">
            <h1 className='logo'><a href="/">JATBOT</a></h1>
            <div className="btn">
            <Link to='/loginform' className='butn'>SIGNUP/LOGIN</Link>
            <a href="/"><FontAwesomeIcon icon={faBell} className='icon-bell' /></a>
            </div>
        </div> 
    </div>
  );
};

   
export default Navbar;