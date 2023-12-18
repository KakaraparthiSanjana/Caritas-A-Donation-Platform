import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Donorlogincss.css';

export default function Donorlogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/Donorlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      console.log(response);
      const json = await response.json();

      if (json.success) {
        // Save the auth token and redirect
        // console.log(json.data.user.name);
        const { name, phoneNo } = json.data.user;
        console.log(name)
        console.log(phoneNo);
        localStorage.setItem('token', json.authtoken);
        // console.log(json.name);
        localStorage.setItem('donorName', name); // Store donor's name
        localStorage.setItem('donorMobileNumber', phoneNo); // Store donor's mobile number

        console.log(localStorage.getItem('donorName'));

        console.log(json);


        history('/FirstPageDonor');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="dl alignment mb-3">
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <b>
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </b>
            <input
              type="email"
              placeholder="Example@gmail.com"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <b>
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </b>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                name="password"
                id="password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="show-password-btn"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <br />
          <br />
          <a href="/Donorsignup">New Donor?</a>
        </form>
      </div>
    </div>
  );
}
