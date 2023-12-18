import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Donorsignupcss.css';

const Donorsignup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    phoneNo: "",
    Address: "",
    email: "",
    password: "",
    cpassword: "", // corrected the name attribute
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneNo, Address, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createDonor", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phoneNo, Address, email, password })
    });

    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history("/donorlogin");
    } else {
      alert("Enter Details correctly");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="signup ds-signup">
      <div className="container ds-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="labelha" htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
          </div>
          <div className="form-group">
            <label className="labelha" htmlFor="phoneNo">Phone Number</label>
            <input type='text' className="form-control" id="phoneNo" name="phoneNo" onChange={onChange} /> 
          </div>
          <div className="form-group">
            <label className="labelha" htmlFor="Address">Address</label>
            <input type="text" className="form-control" id="Address" name="Address" onChange={onChange} />
          </div>
          <div className="form-group">
            <label className="labelha" htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
          </div>
          <div className="form-group">
            <label className="labelha" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} />
          </div>
          <div className="form-group">
            <label className="labelha" htmlFor="cpassword">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary my-3 mx-2">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Donorsignup;
