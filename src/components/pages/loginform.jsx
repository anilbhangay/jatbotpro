import React, { useState } from 'react';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';
import GoogleLogin from '../socialicon/google';
import FacebookLogin from '../socialicon/facebook';
import { useNavigate } from 'react-router-dom';
 
 
const Loginform= () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};

    if (!Email.trim()) {
      validationError.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      validationError.Email = "Invalid email format";
    }

    if (!password.trim()) {
      validationError.Password = "Password is required";
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      validationError.Password = "At least enter one Capital letter";
    } else if (!/^(?=.*[a-z])/.test(password)) {
      validationError.Password = "At least enter one small letter";
    } else if (!/^(?=.*[!@#/$%^&/*])/.test(password)) {
      validationError.Password = "At least enter one special symbol";
    } else if (!/^(?=.*[0-9])/.test(password)) {
      validationError.Password = "At least enter one digit";
    } else if (!/^(?=.{8,14})/.test(password)) {
      validationError.Password = "Password must be between 8 and 14 characters";
    }


    setErrors(validationError);


    // If there are no errors, you can proceed with form submission
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ email: Email, password: password }),
        });
    
        if (response.ok) {
          history('/Password')
          console.log("open dashboard")
          // Login successful, you can proceed with further actions
        } else {
          // Login failed, handle error
          const data = await response.json();
          console.error('Login failed:', data.message);
          // Assuming backend returns error message in format { message: 'Error message' }
          setErrors({ ...errors, login: data.message });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <div className='header-pass'>
      <div className='header-text'>
        <h2>Log in to your JatBot account</h2>
      </div>
      <div className='form-coainter-login'>
        <div className='form-button-login'>
            <GoogleLogin />
            <FacebookLogin />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-input-login'>
            <input
              type='email'
              value={Email}
              onChange={handleChange}
              name='Email'
              placeholder='Email'
            /><br/>
            {errors.Email && <span className='error-name-log' >{errors.Email}</span>}<br/>
          </div>
          <div className='form-input-login'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              placeholder='Password'
            /><br/>
            {errors.Password && <span className='error-name-log'>{errors.Password}</span>}<br/>
            <span
              id='icon-eye-login'
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size='sm' /><br/>
            </span>
          </div>
          <div className='form-links-login'>
              <h3><a id='forgot-pass-log' href="/Forgotpass">Forgot password?</a></h3>
              <button  type="submit" id="button-login">Login</button>
              <h4><a  href="/Signupform">Don't have an account?</a></h4>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;