import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Audiobly from '../Slider/Audiobly/audiobly.jsx'
import Calender from '../Slider/Calender/calender.jsx';
import Grammar from '../Slider/Grammar/grammar.jsx';
import Legal from '../Slider/Legal/legal.jsx';
import Summarizer from '../Slider/Summarizer/summarizer.jsx';
import Templating from '../Slider/Templating/templating.jsx';
import Translator from '../Slider/Translator/translator.jsx';
import Voice from '../Slider/voice/voice.jsx';
import Loginform from '../pages/loginform.jsx';
import Signupform from '../pages/Signupform.jsx';
import Forgotpass from '../pages/Forgotpass.jsx';
import Password from '../pages/Password.jsx';
import Otpfile from '../pages/Otpfile.jsx';
import Contactus from '../Userprofiles/Contactus/Contactus.jsx';
import Account from '../Userprofiles/Accountdeatails/Account.jsx';
import Helpcenter from '../Userprofiles/Helpcenter/Helpcenter.jsx';



const Mainside = () => {
  return (
   <React.Fragment>
       <Routes>
            <Route path='/' element={<Summarizer />} />
            <Route path='/summarizer' element={<Summarizer />} />
            <Route path='/voice' element={<Voice />} />
            <Route path='/audiobly' element={<Audiobly />} />
            <Route path='/grammar' element={<Grammar />} />
            <Route path='/legal' element={<Legal />} />
            <Route path='/templating' element={<Templating />} />
            <Route path='/calender' element={<Calender />} />
            <Route path='/translator' element={<Translator />} />
            <Route path="/Loginform" element={<Loginform />} />
            <Route path="/Signupform" element={<Signupform />} />
            <Route path='/Forgotpass' element={<Forgotpass />} />
            <Route path="/password" element={<Password />} />
            <Route path='/Otpfile' element={<Otpfile />}/>
            <Route path='/Contactus' element={<Contactus />}/>
            <Route path='/Account' element={<Account />}/>
            <Route path='/Helpcenter' element={<Helpcenter />}/>
       </Routes>
    </React.Fragment>
  )
}

export default Mainside;
