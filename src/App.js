import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Audiobly from './pages/audiobly.jsx';
import Calender from './pages/calender.jsx';
import Grammar from './pages/grammar.jsx';
import Legal from './pages/legal.jsx';
import Summarizer from './pages/summarizer.jsx';
import Templating from './pages/templating.jsx';
import Translator from './pages/translator.jsx';
import Voice from './pages/voice.jsx';
import Signupform from './signin/Signupform.jsx';
import Loginform from './signin/loginform.jsx';
import TextLengthChanger from './components/TextLengthChanger.jsx';


const App = () => {
  
  return (
   
       <BrowserRouter>
       <Navbar />
       <Sidebar>
       <Routes>
            <Route path='/TextLengthChanger' element={<TextLengthChanger />} />
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
       </Routes>
         </Sidebar>
       </BrowserRouter>
        
  );
};

  export default App; 














