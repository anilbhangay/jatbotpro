import React from 'react'
import Navbar from '../Navbar/Navbar'
import './main.css';
import Sidebar from '../sidebar/sidebar';
import Mainside from '../sidebar/mainside';


const Main = () => {

  return (
    <React.Fragment>
        <section>
            <div className='nav-bar' >
                <Navbar />
            </div>
        </section>
        <section>
            <div className='sidbar-container' >
                <div className='side-container'>
                       <Sidebar />
                </div>
                <div className='sidebar-main'>
                   <Mainside />
                </div>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Main;