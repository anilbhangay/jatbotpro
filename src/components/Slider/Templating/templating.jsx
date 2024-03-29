import React from 'react';
import './templating.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
const Templating = () => {

  const handleDeleteData = () => {
    
  };
  return (
    <div className='container-tem'>
    <div className='container-main-tem'>
      <div className="head-top-tem">
      <div onClick={handleDeleteData} className='icon-trash-tem'><FontAwesomeIcon icon={faTrash} /></div>
      </div>
      <div className='container-boxs-tem'>
        <div className='box-tem'>
        <div className='choose-tem'>CHOOSE STANDARD TEMPLATE FROM A LIST</div>
        <div className='own-tem'>OWN TEMPLATE</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Templating;