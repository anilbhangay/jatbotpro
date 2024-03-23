import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash,faEye}from '@fortawesome/free-solid-svg-icons';
import'./Signin.css';
import GoogleLogin from '../socialicon/google';
import FacebookLogin from '../socialicon/facebook';
import { useState } from 'react';



export const Signupform = () => {
  const [type,setType]=useState("Password")

  
  const[ formData ,setFormData]=useState({
    Email:"",
    Password:"",
    Name:"",
   
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
    }else if(!/^(?=.*[!@#/$%^&*])/.test(formData.Password)){
      validationError.Password="At least enter one spacial symbol"
    }
    else if(!/^(?=.*[0-9])/.test(formData.Password)){
      validationError.Password="At least enter one digit"
    }
    else if (!/^(?=.*[8,14])/.test(formData.Password)){
      validationError.Password="please enter 8 to 14 character "
    }
    if(!formData.Name.trim()){
      validationError.Name="Name is required"

      } 
      setErrors(validationError)
      if(Object.keys(validationError).length===0){
        alert("click on login page ")
      }
   }
   
  return (
    <div className='signup-form'>
    <div>
    <h2>Sign up to your JatBot account</h2>
    </div>
      <div className='form-coainter-signup'>
           <div className='form-button-signup'>
              <GoogleLogin />
              <FacebookLogin />
             
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='form-input-signup'>
                  <div>
                    <input type="Email"   onChange={handleChange}  name="Email" placeholder='Email *'/><br />
                    {errors.Email&&<span className='error-name'>{errors.Email}</span>}
                  </div>
                  <div>
                    <input type={type} onChange={handleChange} id="input-tag-signup" name='Password' placeholder='Password *' />{type==="Password"?(<span id='icon-eye' onClick={()=>setType("text")}><FontAwesomeIcon  icon={faEyeSlash} size={18}/></span>):
                    (<span id='icon-eye' onClick={()=>setType("Password")}><FontAwesomeIcon icon={faEye} size={18}/></span>)}<br />
                    {errors.Password&&<span className='error-name'>{errors.Password}</span>}
                  </div>
                  <div>
                    <input type="text" onChange={handleChange}  name='Name' placeholder='Name *' /><br />
                    {errors.Name&&<span className='error-name'>{errors.Name}</span>}
                  </div>
                </div>
                <div className='form-links-signup'>
                  <input type="checkbox" name="checkbox" id="cheack-box-signup" /><span>Please don't send me marketing emails</span> <br />
                  <button type="submit" id="button-sigup">Continue</button>
                  <h4><a href="/Loginform ">Already have an account?</a></h4>
                </div>
              </form>
          </div>
      </div>
  </div>    
  );
};
  

export default Signupform;