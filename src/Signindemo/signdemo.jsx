import React, { useState } from "react";
import "./signdemo.css";


const Signdemo = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="container">
      <div className="sign-form">
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="input-form">
          <input
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttn">
            <button type="submit">Signin</button>
          </div>
        </form>
      </div>
      <a href="/Loginform">
        <p className="link">Click here for Client</p>
      </a>
    </div>
  );
};

export default Signdemo;
