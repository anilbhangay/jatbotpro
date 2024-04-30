/*import React,{ useContext, useState} from 'react';
import { LoginContext } from '../../../App';
import './Account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faCreditCard } from '@fortawesome/free-regular-svg-icons';

const Account = () => {
  const[toggle,setToggle]=useState(1);
  const { Email,Name} = useContext(LoginContext);
  const extractAlphabets = (email) => {
    return email.replace(/[^a-zA-Z]/g, '');
  };
  const toggles=(index)=>{
    setToggle(index)
  }
  return (
    <div className='container-acc'> 
    <div className='container-data-acc'>
      <h1 >
      <span>{extractAlphabets(Email).charAt(0).toUpperCase()}</span>
      </h1>
      <div className='profile-name-email-acc'> 
        <h2>{Name}</h2>
        <p>{Email}</p>
      </div>
   </div>
  <div className='profile-btn-acc'>
    
    <div className='btns-acc'>
      <button onClick={()=>toggles(1)} className={toggle===1 ?'tabs activetabs':'tabs'}><FontAwesomeIcon icon={faUser} /><span>profile</span></button>
      <button onClick={()=>toggles(2)}className={toggle===2 ?'tabs activetabs':'tabs'}><FontAwesomeIcon icon={faCreditCard} /><span>Your plan</span></button>
      <button onClick={()=>toggles(3)}className={toggle===3 ?'tabs activetabs':'tabs'}><FontAwesomeIcon icon={faUser} /><span>Preferences</span></button>
    
    </div>
    <div className='cointainer-name-prof-acc'> 
    <div className='cointainer-data-acc active-contact'>
      <div className='cointainer-name-acc'> <p>Name</p> <h4>{Name}</h4></div>
      <div className='cointainer-email-acc'> <p>Verified email</p>
      <h4>{Email}</h4><hr /></div>
      <div><p>Subscription</p>
      <h4>Free</h4></div> 
      </div>
    </div>
    </div>
  </div>
  )
}

export default Account*/

import React, { useContext, useState } from 'react';
import { LoginContext } from '../../../App';
import './Account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCreditCard } from '@fortawesome/free-regular-svg-icons';

const Account = () => {
  const [toggle, setToggle] = useState(1);
  const { Email, Name } = useContext(LoginContext);

  const extractAlphabets = (email) => {
    return email.replace(/[^a-zA-Z]/g, '');
  };

  const toggles = (index) => {
    setToggle(index);
  };
  
  return (
    <div className='container-acc'>
      <div className='container-data-acc'>
        <h1>
          <span>{extractAlphabets(Email).charAt(0).toUpperCase()}</span>
        </h1>
        <div className='profile-name-email-acc'>
          <h2>{Name}</h2>
          <p>{Email}</p>
        </div>
      </div>
      <div className='profile-btn-acc'>
        <div className='btns-acc'>
          <button onClick={() => toggles(1)} className={toggle === 1 ? 'active-tabs' : 'tabs'}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
          <button onClick={() => toggles(2)} className={toggle === 2 ? 'active-tabs' : 'tabs'}>
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Your Plan</span>
          </button>
          <button onClick={() => toggles(3)} className={toggle === 3 ? ' active-tabs' : 'tabs'}>
            <FontAwesomeIcon icon={faUser} />
            <span>Preferences</span>
          </button>
        </div>
        <div className='cointainer-name-prof-acc'>
          <div className={`cointainer-data-acc ${toggle === 1 ? 'active-contact' : ''}`}>
            <div className='cointainer-name-acc'>
              <p>Name</p>
              <h4>{Name}</h4>
            </div>
            <div className='cointainer-email-acc'>
              <p>Verified Email</p>
              <h4>{Email}</h4>
              <hr />
            </div>
            <div>
              <p>Subscription</p>
              <h4>Free</h4>
            </div>
          </div>
          <div className={`cointainer-data-acc ${toggle ===2 ? 'active-contact' : ''}`}>Jatbot</div>
          <div className={`cointainer-data-acc ${toggle === 3 ? 'active-contact' : ''}`}>Welcome</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
