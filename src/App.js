import './App.css';
import Main from './components/main/main';
import { BrowserRouter} from 'react-router-dom';
import React, { createContext,useEffect,  useState } from 'react';



export const LoginContext = createContext();

const App = () => {
  const[Name,setName]=useState(()=>{
    const storedName=localStorage.getItem('Name');
    return storedName ? storedName :'';
  })
const [Email, setEmail] = useState(() => {
  const storedEmail = localStorage.getItem('email');
  return storedEmail ? storedEmail : '';
});
const [loggedIn, setLoggedIn] = useState(() => {
  const isLoggedIn = localStorage.getItem('loggedIn');
  return isLoggedIn ? JSON.parse(isLoggedIn) : false;
});

useEffect(() => {
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  if (Email) {
    localStorage.setItem('email',Email);
  } else {
    localStorage.removeItem('email',Email);
  }
  if(Name){
    localStorage.setItem('Name',Name);
  }else{
    localStorage.removeItem('Name');
  }
}, [loggedIn,Email,Name]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn,Email,setEmail,Name, setName}}>
    <BrowserRouter>
     <Main /> 
   </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;


 
