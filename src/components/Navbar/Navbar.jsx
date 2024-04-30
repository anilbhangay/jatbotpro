import React, { useContext,  useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faCircleQuestion, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../App';
import{useNavigate} from 'react-router-dom'


const Navbar = () => {
  const { loggedIn, setLoggedIn,Email} = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate=useNavigate()
 


  const routeTitles = {
    '/': 'Summarizer',
    '/voice':'Voice Typing',
    '/audiobly':'Audibly Reading',
    '/grammar':'Grammar Checker',
    '/legal':'Legal Ai',
    '/templating':'Templating',
    '/calender':'Calendar',
    '/translator':'Translator',
    '/Contactus': 'Contact us',
    '/Account': 'Account',
    '/Helpcenter': 'Helpcenter'
  };  

  
const handlelogin=()=>{
  navigate('/Loginform')
}
  const handleLogut = () => {
    setLoggedIn(false); 
    navigate('/');  
  }

  const extractAlphabets = (email) => {
    return email.replace(/[^a-zA-Z]/g, '');
  };
 
  return (
    <div className='head-section'>
        <div className="navbar">
            <h1 className='logo'><Link to="/">JATBOT</Link></h1>
            <div className='headers'><h4>{routeTitles[location.pathname]}</h4></div>
            <div className="navbar-login-bell">
            <div className="btn">
            <a href="/"><FontAwesomeIcon icon={faBell} className='icon-bell' /></a>
            </div>
            {loggedIn ? (
          <div className="dropdown">
            <div>
              <button  id='signin-login'  onMouseEnter={() => setOpen(!open)}>
              {extractAlphabets(Email).charAt(0).toUpperCase()}
              </button>
            </div>
            {open && (
              <div className="dropdown-content">
                <p>Email:<br/>{Email}</p><hr />
                <ul>
                  <li><Link to="/Account" ><FontAwesomeIcon icon={faUser} id='icon-dropdown-nav' />Account details</Link></li><hr />
                  <li><Link to="/Helpcenter" target='_blank'><FontAwesomeIcon icon={faCircleQuestion}  id='icon-dropdown-nav' />Help center</Link></li>
                  <li><Link to="/contactus" ><FontAwesomeIcon icon={faEnvelope}  id='icon-dropdown-nav' />Contact Us</Link></li><hr />
                  <li><button  className='icon-dropdown-nav-btn' onClick={handleLogut}><FontAwesomeIcon icon={faRightFromBracket}  id='icon-dropdown-nav' />LOGOUT</button></li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button id='signin-login'onClick={handlelogin} ><FontAwesomeIcon icon={faUser} /></button>
          </div>
        )}
        </div>
        </div> 
    </div>
  );
};

   
export default Navbar;