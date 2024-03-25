import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Audiobly from '../Slider/audiobly.jsx';
import Calender from '../Slider/calender.jsx';
import Grammar from '../Slider/grammar.jsx';
import Legal from '../Slider/legal.jsx';
import Summarizer from '../Slider/summarizer.jsx';
import Templating from '../Slider/templating.jsx';
import Translator from '../Slider/translator.jsx';
import Voice from '../Slider/voice.jsx';
import Loginform from '../pages/loginform.jsx';
import Signupform from '../pages/Signupform.jsx';
import Forgotpass from '../pages/Forgotpass.jsx';



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
            <Route path="/" element={<Loginform />} />
            <Route path="/Loginform" element={<Loginform />} />
            <Route path="/Signupform" element={<Signupform />} />
            <Route path='/Forgotpass' element={<Forgotpass />} />
       </Routes>
    </React.Fragment>
  )
}

export default Mainside;