import React from 'react';
import '../pages/login.css';
import GoogleLogin from '../socialicon/google';
import FacebookLogin from '../socialicon/facebook';
import { useState } from 'react';
import {faEyeSlash,faEye}from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';




export const Loginform = () => {
  const [type,setType]=useState("Password")

  const[ formData ,setFormData]=useState({
    Email:"",
    Password:""
  })
  const [errors,setErrors]=useState({})
   const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData, [name]:value
    })
   }

   const handleSubmit=(e)=>{
    e.preventDefault()
    const validationError={}
    if(!formData.Email.trim()){
      validationError.Email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(formData.Email)){
      validationError.Email="Email is not valid"
    }
    if(!formData.Password.trim()){
      validationError.Password="Password is required"
    }else if(!/^(?=.*[A-Z])/.test(formData.Password)){
      validationError.Password="At least enter one Capital letter "
    }else if(!/^(?=.*[a-z])/.test(formData.Password)){
      validationError.Password="At least enter one small letter "
    }else if(!/^(?=.*[!@#/$%^&/*])/.test(formData.Password)){
      validationError.Password="At least enter one spacial symbol"
    }
    else if(!/^(?=.*[0-9])/.test(formData.Password)){
      validationError.Password="At least enter one digit"
    }
    else if (!/^(?=.*[8,14])/.test(formData.Password)){
      validationError.Password="please enter 8 to 14 character "
    }
    
      setErrors(validationError)
      if(Object.keys(validationError).length===0){
    
      }
   }
  return (
    <div className='login-form'>
    <div>
    <h2>Log in to your JatBot account</h2>
    </div>
      <div className='form-coainter-login'>
           <div className='form-button-login'>
              <GoogleLogin />
              <FacebookLogin />
              
            </div>
            <div>
            <form onSubmit={handleSubmit}>
              <div className='form-input-login'>
                <div>
                    <input type="Email"  onChange={handleChange}  name='Email' placeholder='Email'/><br />
                    {errors.Email&&<p className='error-name'>{errors.Email}</p>}
                  </div>
                  <div>
                    <input type={type} onChange={handleChange} id="input-tag-login" name='Password' placeholder='Password'/>
                    {type==="Password"?(<span id='icon-eye' onClick={()=>setType("text")}><FontAwesomeIcon  icon={faEyeSlash} size={18}/></span>):
                      (<span id='icon-eye' onClick={()=>setType("Password")}><FontAwesomeIcon icon={faEye} size={18}/></span>)}
                    {errors.Password&&<p className='error-name' id='error-name-text'>{errors.Password}</p>}
                  </div>
              </div>
              <div className='form-links-login'>
                <h3><a href="/">Forgot password?</a></h3>
                <button  type="submit" id="button-login">Log in</button>
                <h4><a href="Signupform">Don't have an account?</a></h4>
              </div>
            </form> 
          </div>
      </div>
    </div>
  );
}

export default Loginform;