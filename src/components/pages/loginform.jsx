
import React, { useState } from 'react';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import GoogleLogin from '../socialicon/google';
// import FacebookLogin from '../socialicon/facebook';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Loginform = () => {
  const [email, setEmail] = useState('');
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

    if (!email.trim()) {
      validationError.email = "Email is required";
    }

    if (!password.trim()) {
      validationError.password = "Password is required";
    }

    setErrors(validationError);

    if (Object.keys(validationError).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          history('/dashboard');
        } else {
          const data = await response.json();
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
        {/* <div className='form-button-login'>
          <GoogleLogin />
          <FacebookLogin />
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className='form-input-login'>
            <input
              type='email'
              value={email}
              onChange={handleChange}
              name='email'
              placeholder='Email'
            /><br/>
            {errors.email && <span className='error-name-email'>{errors.email}</span>}<br/>
          </div>
          <div className='form-input-login'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              placeholder='Password'
            /><br/>
            {errors.password && <span className='error-name-pass'>{errors.password}</span>}<br/>
            <span
              id='icon-eye-login'
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}  /><br/>
            </span>
          </div>
          <div className='form-links-login'>
            <h3><a id='forgot-pass-log' href="/Forgotpass">Forgot password?</a></h3>
            <button type="submit" id="button-login">Login</button>
            <h4><a href="/signupform">Don't have an account?</a></h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
