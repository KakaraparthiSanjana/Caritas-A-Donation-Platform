import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Organizationsignup.css'

export default function Organizationsignup() {
  const [credentials, setCredentials] = useState({name: "", type:"",registrationnumber:"",Address:"",phoneNo:"",requirements:"",email: "", password:"",ManagerName:"",About:""})
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name,type, registrationnumber,phoneNo, Address,requirements, email, password,ManagerName,About} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createOrganization", {

      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,type,registrationnumber,phoneNo, Address,requirements,email, password,ManagerName,About})
    });
    console.log(response);
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history(`/OrganizationUpdate/${credentials.registrationnumber}`);

    }
    else {
      alert("Enter Details correctly");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const containerStyle = {
    
    height: '100%',  // Set the desired fixed height
    overflowY: 'auto',  // Enable vertical scrolling when content exceeds the height
  };

  return (
    <div className="signup-Org">
      <div className="container" style={containerStyle}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Organization Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="nameHelp" placeholder="Enter name" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Type of Organization</label>
            <input type="text" className="form-control" id="type" name="type" aria-describedby="typeHelp" placeholder="Type of Organization" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Organization Registration Number</label>
            <input type="text" className="form-control" id="registrationnumber" name="registrationnumber" aria-describedby="registrationnumberHelp" placeholder="Registration Number" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo">Contact Number </label>
            <input type="number" className="form-control" id="phoneNo" name="phoneNo" aria-describedby="phonenumberlHelp" placeholder="Enter phone Number" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address</label>
            <input type="text" className="form-control" id="Address" name="Address" aria-describedby="addressHelp" placeholder="Enter Address" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">requirements</label>
            <input type="text" className="form-control" id="requirements" name="requirements" aria-describedby="requirementsHelp" placeholder="Requirements" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Manager Name</label>
            <input type="text" className="form-control" id="ManagerName" name="ManagerName"  placeholder="ManagerName" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">About Organization</label>
            <input type="text" className="form-control" id="About" name="About"  placeholder="About" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input type="password" className="form-control" id="Password" name="password" placeholder="Password" minLength={5} required onChange={onChange} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="cPassword">Confirm Password</label>
            <input type="password" className="form-control" id="cPassword" name="cpassword" placeholder="Confirm Password" minLength={5} required onChange={onChange} />
          </div> */}

          <button type="submit" className="btn btn-primary my-3 mx-2">Submit</button>
        </form>
      </div>
    </div>
  )
}

