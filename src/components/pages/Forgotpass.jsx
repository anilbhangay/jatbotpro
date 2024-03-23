import React from 'react'
import { useState } from 'react';
import './Forgot.css';

const Forgotpass = () => {
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
    }  setErrors(validationError)
    if(Object.keys(validationError).length===0){
  
    }
 }
  return (
    <div className='Forget-form'>
      <div className='forget-form-text'>
        <h2>Reset your jackBot password</h2>
      </div>
      <div className='form-coainter-forget'>
           <p>Enter your email, and we'll send you instructions on<br /> <span>how to reset your password.</span></p>
        <form onSubmit={handleSubmit} >
          <div className='form-input-forget'>
              <input type="Email"  onChange={handleChange} id='input-for-Email' name='Email' placeholder='Email'/>
              {errors.Email&&<p className='error-name-for'>{errors.Email}</p>}
          </div>
          <div className='form-links-forget'>
              <button  type="submit" id="for-login">Send instructions</button>
              <h3><a href="/Loginform">Back to Loginpage</a></h3>
          </div>
        </form>
        </div>
    </div>
    
  )
}

export default Forgotpass