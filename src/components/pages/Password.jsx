import React, { useState } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Password.css";
import { useNavigate, useParams } from "react-router-dom";

const Password = () => {
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenteredPassword, setShowReenteredPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const { token } = useParams();

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setErrors({ ...errors, Password: "" }); // Clear error when typing
  };

  const handleChangeRepass = (e) => {
    const { value } = e.target;
    setReenteredPassword(value);
    setErrors({ ...errors, Reenterpassword: "" }); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};

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

    if (!reenteredPassword.trim()) {
      validationError.Reenterpassword = "Re-enter Password is required";
    } else if (reenteredPassword !== password) {
      validationError.Reenterpassword = "Passwords do not match";
    }

    setErrors(validationError);

    // If there are no errors, you can proceed with form submission
    if (Object.keys(validationError).length === 0) {
      try {
        const response = await fetch(
          `http://localhost:5000/reset_password/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ new_password: password }),
          }
        );

        if (response.ok) {
          history("/Loginform");
          // Password reset successful, handle success
          console.log("Password reset successful");
        } else {
          // Password reset failed, handle error
          const data = await response.json();
          // Assuming backend returns error message in format { message: 'Error message' }
          setErrors({ ...errors, resetPassword: data.error });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleReenteredPasswordVisibility = () => {
    setShowReenteredPassword(!showReenteredPassword);
  };

  return (
    <div className="header-pass">
      <div className="header-text">
        <h2>Reset your jackBot password</h2>
      </div>
      <div className="container">
        <h3>Reset password </h3>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            <span id="icon-eye-pass" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                size="sm"
              />
              <br />
            </span>
            {errors.Password && (
              <span className="error-name-pass" id="error-name">
                {errors.Password}
              </span>
            )}
            <br />
          </div>
          <div className="container-input">
            <input
              type={showReenteredPassword ? "text" : "password"}
              value={reenteredPassword}
              onChange={handleChangeRepass}
              placeholder="Re-enter Password"
            />
            <span
              id="icon-eye-pass"
              onClick={toggleReenteredPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showReenteredPassword ? faEye : faEyeSlash}
                size="sm"
              />
              <br />
            </span>
            {errors.Reenterpassword && (
              <span className="error-name-pass" id="error-name">
                {errors.Reenterpassword}
              </span>
            )}
            <br />
          </div>
          <div>
            <button type="submit" id="button-pass">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
